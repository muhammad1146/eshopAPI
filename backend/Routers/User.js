const {User} = require('../Models/User');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        let userList = await User.find().select('name email phone');
        if(!userList) return res.status(404).send("No Users Found in database!");
        res.status(201).send(userList);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get('/:uid', async (req,res)=>{
    try {
        let userList = await User.findById(req.params.uid).select('-passwordHash');
        if(!userList) res.status(404).send("The User Not Found!")
        res.status(201).send(userList);
    } catch (error) {
    res.status(400).send(error);        
    }
});


router.put('/:uid',(req,res) =>{   
    User.findByIdAndUpdate(req.params.uid,{
        name:req.body.name,
        email:req.body.email,
        passwordHash:req.body.passwordHash,
        street:req.body.street,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
    },{new:true})
    .then(newUser =>{
        if(newUser){
            return res.status(201).json({success:true,message:newUser})
        }
        else {
            return res.status(404).json({success:false,message:'The requested User is not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    });

});

    
router.post('/register',(req,res)=>
{
    let password = bcrypt.hashSync(req.body.password,'my-secret');
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash:password,
        street:req.body.street,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
    });
    user.save().then((createdUser)=>{
        if(!createdUser) res.status(400).json({success:false,message:"User Could not be Created!"});
        res.status(201).json({success:true,content:createdUser});
    }).catch((err)=>{
        res.status(501).json(
        {   error:err,
            success:false
        });
});
});

router.post('/login',async (req,res)=>
{
    
    let email = req.body.email;
    try {
    let user = await User.findOne({email}).select('email passwordHash');
    if(!user)
    {
        res.status(404).json({success:false, message:"User Not found!"});
    }
    if(bcrypt.compareSync(req.body.password,user.passwordHash))
    {
        const token =  jwt.sign({userId:user.id},'secret');
        res.status(200).json({token});
    }
    } catch (error) {
        res.status(400).json({success:false,error})
    }
});

router.delete('/:uid',(req,res) =>{    
    User.findByIdAndRemove(req.params.uid)
    .then(deletedUser =>{
        if(deletedUser){
            return res.status(201).json({success:true,message:'The User is deleted!'})
        }
        else {
            return res.status(404).json({success:false,message:'The User is not found and not deleted!'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    });

});

router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

module.exports = router;
    