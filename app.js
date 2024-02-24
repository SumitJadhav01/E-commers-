const express = require ("express");
const app= express();
const path = require("path");
const ejsmate=require("ejs-mate");

app.use(express.urlencoded({extended:true}));
app.use (express.static(path.join(__dirname,"public")));
app.set ("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.engine('ejs',ejsmate);

//Category
app.get("/",(req,res)=>{
    const productCategory=require("./data.json");
    const data=(productCategory);
    // console.log(data.Id);
    res.render("Category.ejs",{data})
});
 
//product
app.get("/Product/:id",(req,res)=>{
    const product=require("./data.json");
    const data=(product);
    console.log("data");
    res.render("product.ejs",{data})

 
});
app.get("/ProductDetails",(req,res)=>{

    res.render('ProductDetails.ejs')
});
app.get("/Cart",(req,res)=>{
    res.render("cart.ejs")
  
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