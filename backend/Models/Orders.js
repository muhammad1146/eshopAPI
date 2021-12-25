const mongoose = require('mongoose');
const { User } = require('./User');
const ordersSchema = mongoose.Schema({
    orderItem:{
        type:String
    },
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
        type:String
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    dateOrdered:{
        type:Date
    }
});

exports.Orders = mongoose.model('Orders',ordersSchema);