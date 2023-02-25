const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    car_name: {
        type: String,
        required: true
    },
    jorney_date:{
        type:Date,
        
        required:true
    },
        
    
    // jorney_time:{
    //     type:Number,
    //     required:true
    // },

    destination_start: {
        type: String,
        required: true,
    },
    destination_end: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: Number,
        required: true,
    }

});
const bookingModel=new mongoose.model("booking",bookingSchema);
module.exports=bookingModel;