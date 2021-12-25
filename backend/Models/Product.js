const mongoose = require('mongoose');
const {Category} = require('./Category');
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        maxLength:200,
        required:true
    },
    richDescription:{
        type:String,
        maxLength:200,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    images:{
        type:[{type:String}]

    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        default:0 
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated: {
        type:Date,
        default:Date.now
    }
});

exports.Product = mongoose.model('Product',productSchema);