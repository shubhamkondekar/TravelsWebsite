const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shubham_travells',{
    useNewUrlParser:true
}).then(()=>{
    console.log("Database Connection ok ");
}).catch((err)=>{
    console.log(err)
});