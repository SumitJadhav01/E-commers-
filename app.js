const express = require ("express");
const app= express();
const path = require("path");
const ejsmate=require("ejs-mate");
const mysql =require ("mysql2");
const { title } = require("process");
const methodOverride= require(`method-override`)
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressErorr = require("./utils/ExpressError.js");
const passport = require("passport");
const localStratergy = require("passport-local");
const {userSchema}=require ("./schema.js");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'productstore',
    password:'@Sumit01'
  });


app.use(express.urlencoded({extended:true}));
app.use (express.static(path.join(__dirname,"public")));
app.set ("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.engine('ejs',ejsmate);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))

app.use((req,res,next)=>{
    req.time = new Date(Date.now());
    console.log(req.method, req.hostname ,req.path, req.time);
    next()
})

const validuser =(req,res,next)=>{
    // console.log(req.body)
    let{error}=userSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
         throw new ExpressErorr(400, errMsg);
    }else{
        next();
    }
};

//Category
app.get("/Category",wrapAsync(async(req,res )=>{
let q =`select * from  productCategory`;
     connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        res.render("Category.ejs",{data})
  });
 
}));
 
//product
app.get("/Product/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
let q =`select * from  products where pcat_id= '${id}'`;
 
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        res.render("product.ejs",{data})
  });
 
}));

//ProductDetails
app.get("/ProductDetails/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let q =`select * from  products where id= '${id}'`;
  
        connection.query(q ,(err,result)=>{
            if (err) throw err;
            let data = result;
            console.log(data);
            res.render("ProductDetails.ejs",{data})
      });
   
}));

//delete cart item
app.delete ("/cart/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(id);
      let q = `DELETE from addcart where productID ='${id}' limit 1`;
 
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.redirect("/cart");
  });
 
}));

//cart list
app.get ("/cart",wrapAsync(async(req,res)=>{
    let q =`select * from  addcart`;
 
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        // console.log(data);
        res.render("cart.ejs",{data})
  })
 
}));

//add itme to cart
app.post("/add-to-Cart",wrapAsync(async(req,res)=>{
    let {title , Amount, productID}=req.body;
    console.log(title , Amount, productID);
        let q = "insert into addcart (product,Amount,Total,productID) values (?,?,?,?)";
    let val = [title , Amount, Amount, productID];
 
        connection.query(q, val, (err, result) => {
            if (err) throw err;
            // console.log(result)
            res.redirect("/Cart");
        })
   
}));

//buynow
app.post("/product/:id/buynow",wrapAsync(async(req,res)=>{
    let {title , Amount, productID}=req.body;
    console.log(title , Amount, productID);
        let q = "insert into buynow (product,Total,productID) values (?,?,?)";
    let val = [title , Amount, productID];
 
        connection.query(q, val, (err, result) => {
            if (err) throw err;
             console.log(result);
            res.redirect("/cart");
        })
     
})
);

//buynow product details
app.get ("/orderhistory",wrapAsync(async(req,res)=>{
    let q =`select * from  buynow`;
 
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        // console.log(data);
        res.render("OrderDetails.ejs",{data})
  });
 
})
);
 //cancel odr
app.delete ("/order/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(id);
      let q = `DELETE from buynow where productID ='${id}'limit 1`;
  
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.redirect("/orderhistory");
  });
 
})

);
// app.get("/OrderDetails",(req,res)=>{
//     res.render("OrderDetails.ejs")
// });
 
app.get("/render/register",(req,res)=>{
    res.render("register.ejs")
});


app.post("/register",
validuser,
wrapAsync(async(req,res,next)=>{
    let {username,email,password}=req.body;
                let q = "insert into user (name,email,password) values (?,?,?)";
                let val = [username,email,password];
                    connection.query(q, val, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        res.redirect("/Category");
                    });
            }           
      )
    
    );


app.get("/render/login",(req,res)=>{
    res.render("login.ejs")
});

app.post("/login",(req,res)=>{
    let {username,password}=req.body;
        let q =`select * from  user where name= '${username}'`;
        connection.query(q ,(err,result)=>{
            if (err) throw err;
            res.redirect("/Category");
 })});


app.all("*",(req,res,next)=>{
    next(new ExpressErorr(404,"page not found"));
})

app.use((err ,req, res , next)=>{
    let{statusCode=500,message="Somthing want Wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
//   res.status(statusCode).send(message) 
})

app.listen(8080,()=>{
    console.log(`start server...;`)
})


 
// {
//     let q =`select * from  user where name= '${username}'`;

//     connection.query(q ,(err,result)=>{
//         if (err) throw err;
//         let val = result[0];
//         if(username == (val.name) || email==val.email){
//             next(new ExpressErorr(500,"Email and username alredy exist! "));
//         }else{
