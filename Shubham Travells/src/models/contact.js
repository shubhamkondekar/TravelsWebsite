const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const contactModel=new mongoose.model("contact",contactSchema);
module.exports=contactModel;

