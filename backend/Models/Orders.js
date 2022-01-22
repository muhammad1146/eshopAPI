const mongoose = require('mongoose');
const { User } = require('./User');
const ordersSchema = mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    shippingAddress1:{
        type:String
    },
    shippingAddress2:{
        type:String
    },
    city:{
        type:String
    },
    zip:{
        type:Number
    },
    country:{
        type:String
    },
    phone:{
        type:String
    },
    status:{
        type:String,
        default:'Pending'
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    dateOrdered:{
        type:Date,
        default:Date.now
    }
});

exports.Orders = mongoose.model('Orders',ordersSchema);