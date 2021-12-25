const {Orders} = require('../Models/Orders');
const express = require('express');
const { User } = require('../Models/User');
const router = express.Router();
router.get('/', async (req,res)=>{
    try {
        let ordersList = await Orders.find();
        if(!ordersList) res.status(404).send("Orders not found!")
        res.status(201).send(ordersList);
    } catch (error) {
        res.status(400).send(error);
    }
})
    
router.get('/:oid', async (req,res)=>{
    try {
        let ordersList = await Orders.find();
        if(!ordersList) res.status(404).send("Orders not found!")
        res.status(201).send(ordersList);
    } catch (error) {
    res.status(400).send(error)        
    }
})
router.post('/',(req,res)=>
{
    try {
        let user = User.findById(req.params.user);
        if(!user) res.status(404).json({success:false, message:"User assigned is not Found!"})
    } catch (error) {
        res.status(400).json({success:false,message:error})
    }
    let order = new Orders({
        orderItem:req.body.orderItem,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        user:req.body.user,
        dateOrdered:req.body.dateOrdered,
    });
    order.save().then((createdOrder)=>{
        res.status(201).json({content:createdOrder});
    }).catch((err)=>{
        res.status(501).json(
        {   error:err,
            success:false
        });
});
});

router.delete('/:oid',(req,res) =>{    
    Orders.findByIdAndRemove(req.params.oid)
    .then(deleteOrder =>{
        if(deleteOrder){
            return res.status(201).json({success:true,message:'The Order is deleted!'})
        }
        else {
            return res.status(404).json({success:false,message:'The Order is not found and not deleted!'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    });

});

router.put('/:oid',(req,res) =>{ 
    try {
        let user = User.findById(req.params.user);
        if(!user) res.status(404).json({success:false, message:"User assigned is not Found!"})
    } catch (error) {
        res.status(400).json({success:false,message:error})
    }   
    Orders.findByIdAndUpdate(req.params.oid,{
        orderItem:req.body.orderItem,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        user:req.body.user,
        dateOrdered:req.body.dateOrdered,
    },{new:true})
    .then(newOrder =>{
        if(newOrder){
            return res.status(201).json({success:true,message:newOrder})
        }
        else {
            return res.status(404).json({success:false,message:'The requested Order is not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    });

});


module.exports = router;
    