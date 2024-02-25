const express = require ("express");
const app= express();
const path = require("path");
const ejsmate=require("ejs-mate");
const mysql =require ("mysql2");
const { title } = require("process");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'productstore',
    password:'@Sumit01'
  });

// let q = "insert into data (id,usernmae,name) values(?,?,?,?)";
// let user=["123","123_newuser","datad"]

//   try{
//     connection.query(q , data,(err,result)=>{
//         if (err) throw err;
//         console.log(result);
//   })
// }catch(err){
//     console.log(err);
// }


//   try{
//     connection.query("select * from  productCategory",(err,result)=>{
//         if (err) throw err;
//         console.log(result);
//   })
// }catch(err){
//     console.log(err);
//}
// connection.end();

app.use(express.urlencoded({extended:true}));
app.use (express.static(path.join(__dirname,"public")));
app.set ("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.engine('ejs',ejsmate);
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use((req,res,next)=>{
    req.time = new Date(Date.now());
    console.log(req.method, req.hostname ,req.path, req.time);
    next()
})

//Category
app.get("/",(req,res)=>{
let q =`select * from  productCategory`;
  try{
    connection.query(q ,(err,result)=>{
        if (err) throw err;
        let data =result;
        console.log(result);
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
        // console.log(result);
        res.render("product.ejs",{data})
  });
}catch(err){
    console.log(err);
    res.send("Some error occured");
}
    // res.render("product.ejs",{data})

 
});
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
app.post("/add-to-Cart",(req,res)=>{
    let {title , Amount, productID}=req.body;
    console.log(title , Amount, productID);
        let q = "insert into addcart (product,Amount,Total,productID) values (?,?,?,?)";
    let val = [title , Amount, Amount, productID];
    try {
        connection.query(q, val, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.redirect("/");
        })
    } catch (err) {
        {
            res.send("error");
            res.send(err);
        }
    }

    res.render("cart")
 
});
app.get("/OrderPlacement",(req,res)=>{
    res.render("OrderPlacement")
});
app.get("/OrderHistory",(req,res)=>{
    res.render("OrderHistory.ejs")
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





// app.post("/user/post", (req, res) => {
//     let { username, password, email, userid } = req.body;
//     let q = "insert into user (userid,username,email,password) values (?,?,?,?)";
//     let val = [userid, username, email, password];
//     try {
//         connection.query(q, val, (err, result) => {
//             if (err) throw err;
//             res.redirect("/user");
//         })
//     } catch (err) {
//         {
//             res.send("error");
//             res.send(err);
//         }
//     }
// });
// app.get("/user/:id/delete", (req, res) => {
//     let { id } = req.params;
//     res.render("delete", { id });
// });

// app.delete("/user/:id", (req, res) => {
//     let { id } = req.params;
//     let pass = req.body.password;
//     let eml = req.body.email;
//     let q1 = `select * from user where userid='${id}'`;
//     try {
//         connection.query(q1, (err, result) => {
//             if (err) throw err;
//             if ((pass !== result[0].password) && (eml !== result[0].email)) {
//                 res.send("wrong password & email");
//             } else {
//                 let q = `DELETE from user where userid='${id}'`;
//                 connection.query(q, (err, result) => {
//                     res.redirect("/user");
//                 });
//             }
//         });
//     } catch (err) {
//         {
//             res.send("error");
//             res.send(err);
//         }
//     }
// });











// app.get("/rolldice",(req,res)=>{
//     let num = [1,2,3,4,,6,7,7];
//     res.render("rollDice",{num})
// })
// app.get("/home/:id",(req,res)=>{
//     console.log(req.params)
//     let str=(req.params)
// res.send(`wellcome ${str.id}`)
// })

app.listen(8080,()=>{
    console.log(`start server...;`)
})