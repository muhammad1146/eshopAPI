const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    color:{
        type:Number
    },
    icon:{
        type:Number
    },
    image:{
        type:String
    }
});

exports.Category = mongoose.model('Category',categorySchema);