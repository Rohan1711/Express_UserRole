const mongoose =require("mongoose");

mongoose.connect('mongodb://localhost:27017/UMS');

const express =require("express");
const app=express();
const bodyParser = require("body-parser"); 
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const userRoute=require("./routes/userRoute");
app.use('/',userRoute);

const adminRoute=require("./routes/adminRoute");
app.use('/admin',adminRoute);

app.listen(8000,function(){
    console.log("Server is running...");
})