require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const bcrypt=require("bcryptjs");
const Register=require('./models/register');
const contactModel=require("./models/contact");
const bookingModel=require("./models/booking");
const path = require("path");
const hbs=require("hbs");
const cookieParser=require("cookie-parser");
const auth=require("./middleware/auth");
const port = process.env.PORT ||3100



const staticPath = path.join(__dirname, '../public');
templates_path = path.join(__dirname, '../templates/views');
const partial_path = path.join(__dirname, '../templates/partials');
console.log(partial_path)

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set('views', templates_path);
hbs.registerPartials(partial_path);


app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/register", (req, res) => {
    res.render("register")
});

app.post("/register",async (req, res) => {
    try{
        const password=req.body.password;
        const cpassword=req.body.cpassword;
        if(password === cpassword){
            const registerEmployee = new Register({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                password: password,
                cpassword: cpassword,
            })
            const token=await registerEmployee.generateAuthToken();

            res.cookie("jwt",token,{
                expires:new Date(Date.now()+60000),
                httpOnly:true
            });

            const registered= await registerEmployee.save();
            res.status(201).render("login");
        }else{
            res.send("Invalid Email");
        }
    }catch(error){
        res.send("Invalid Email");
    }
    });



app.get("/login", (req, res) => {
    res.render("login")
});

app.post("/login",async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        // if(useremail.password === password){
            const isMatch =await bcrypt.compare(password,useremail.password);
            const token=await useremail.generateAuthToken();

            res.cookie("jwt",token,{
                expires:new Date(Date.now()+60000),
                httpOnly:true
            });


            
            if(isMatch){

                res.status(201).render("index");
            

        }else{
            res.send("Invalid Email");
        }
    }catch(error){
        res.status(400).send("Invalid Email")
    }
})


app.get("/thankyou",(req,res)=>{
    res.render("thankyou");
});

app.get("/booking",auth,(req,res)=>{
    res.render("booking1");
});


app.post("/booking",async(req,res)=>{
    const book=new bookingModel({      
        name:req.body.name, 
        email:req.body.email,
        car_name:req.body.car_name,
        jorney_date:req.body.jorney_date,
        jorney_time:req.body.jorney_time,
        destination_start:req.body.destination_start,
        destination_end:req.body.destination_end,
        address:req.body.address,
        mobile_number:req.body.mobile_number
    });
    const ok=await book.save();
    res.render('thankyou');
    console.log(ok);
});

app.get("/contact",auth,(req,res)=>{
    res.render("contact");
});

app.post("/contact",async (req,res)=>{
    const contact=new contactModel({
        name:req.body.name,
        mobile_number:req.body.mobile_number,
        email:req.body.email,
        message:req.body.message
    });
    const newContact=await contact.save();
    res.render("index");
});

app.get("/carsrate",(req,res)=>{
    res.render("carsrate");
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})
