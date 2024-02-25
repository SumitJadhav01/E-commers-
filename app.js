const express = require ("express");
const app= express();
const path = require("path");
const ejsmate=require("ejs-mate");
const mysql =require ("mysql2");
const { title } = require("process");
const methodOverride= require(`method-override`)

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

//Category
app.get("/Category",(req,res)=>{
let q =`select * from  productCategory`;
  try{
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        res.render("Category.ejs",{data})
  });
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
});
 
//product
app.get("/Product/:id",(req,res)=>{
    let {id}=req.params;
let q =`select * from  products where pcat_id= '${id}'`;
try{
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        res.render("product.ejs",{data})
  });
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
});

//ProductDetails
app.get("/ProductDetails/:id",(req,res)=>{
    let {id}=req.params;
    let q =`select * from  products where id= '${id}'`;
    try{
        connection.query(q ,(err,result)=>{
            if (err) throw err;
            let data = result;
            console.log(data);
            res.render("ProductDetails.ejs",{data})
      });
    }catch(err){
        console.log(err);
        res.send("Some error occured");
    }
});

//delete cart item
app.delete ("/cart/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
      let q = `DELETE from addcart where productID ='${id}'`;
  try{
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.redirect("/cart");
  });
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
});

//cart list
app.get ("/cart",(req,res)=>{
    let q =`select * from  addcart`;
  try{
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        // console.log(data);
        res.render("cart.ejs",{data})
  });
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
});

//add itme to cart
app.post("/add-to-Cart",(req,res)=>{
    let {title , Amount, productID}=req.body;
    console.log(title , Amount, productID);
        let q = "insert into addcart (product,Amount,Total,productID) values (?,?,?,?)";
    let val = [title , Amount, Amount, productID];
    try {
        connection.query(q, val, (err, result) => {
            if (err) throw err;
            // console.log(result)
            res.redirect("/Category");
        })
    } catch (err) {
        {
            res.send("error");
            res.send(err);
        }
    }
});

//buynow
app.post("/product/:id/buynow",(req,res)=>{
    let {title , Amount, productID}=req.body;
    console.log(title , Amount, productID);
        let q = "insert into buynow (product,Total,productID) values (?,?,?)";
    let val = [title , Amount, productID];
    try {
        connection.query(q, val, (err, result) => {
            if (err) throw err;
             console.log(result);
            res.redirect("/cart");
        })
    } catch (err) {
        {
            res.send("error");
            res.send(err);
        }
    }
});

//buynow product details
app.get ("/orderhistory",(req,res)=>{
    let q =`select * from  buynow`;
  try{
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        // console.log(data);
        res.render("OrderDetails.ejs",{data})
  });
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
});

 //cancel odr
app.delete ("/order/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
      let q = `DELETE from buynow where productID ='${id}'`;
  try{
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.redirect("/orderhistory");
  });
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
});

app.get("/OrderDetails",(req,res)=>{
    res.render("OrderDetails.ejs")
});
app.get("/register",(req,res)=>{
    res.render("register.ejs")
});
app.get("/login",(req,res)=>{
    res.render("login.ejs")
});

app.listen(8080,()=>{
    console.log(`start server...;`)
})