const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const port = process.env.PORT||5000;
const cors=require("cors");
const path=require("path");


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/",(req,res)=>{
    res.send("home page");
});

const database=mongoose.connect("mongodb://127.0.0.1:27017/ABCDEF");


const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});
const User=new mongoose.model("User",schema);


app.get("/",(req,res)=>{
    res.status(200).send("home page");

});
app.post("/submit",async(req,res)=>{
 const Username=req.body.username;
 const Email=req.body.email;
const user=await new User({
    username:Username,email:Email
});
await user.save();
res.sendFile(path.join(__dirname,"./public/harsh.html"));


})




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});