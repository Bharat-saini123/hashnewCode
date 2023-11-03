const cors=require("cors");
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const port =process.env.PORT||5000;
const corsOptions = {
    origin: true, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,get,head,put,patch,post,delete',
  credentials: true,
    

}
const app=express();



app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1:27017/Harsh");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    }
});
const User=new mongoose.model("user",userSchema);

app.get("/",(req,res)=>{
    console.log("hii");
});
app.post("/submit",async(req,res)=>{
    const {username,email}=req.body;
    res.status(200).json("data send");
    const user=await User({
        username:username,
        email:email
    });
    await user.save();
    console.log(user);
    
});









app.get("/",(req,res)=>{
    res.send("home page");
});


app.listen(port,()=>{
    console.log(`server start at the port of ${port}`)
})