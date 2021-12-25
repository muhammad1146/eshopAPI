const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true

    },
    street:{
        type:String
    },
    city:{
        type:String,
        required:true

    },
    zip:{
        type:Number,
        required:true

    },
    country:{
        type:String,
        required:true

    },
    phone:{
        type:String,
        required:true

    },
    IsAdmin:{
        type:Boolean,
        default:false
    },
});

exports.User = mongoose.model('User',userSchema);