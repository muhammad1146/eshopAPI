const {User} = require('../Models/User');
const express = require('express');
const router = express.Router();
router.get('/', async (req,res)=>{
    try {
        let userList = await User.find();
        if(!userList) return res.status(404).send("No Users Found in database!");
        res.status(201).send(userList);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get('/:uid', async (req,res)=>{
    try {
        let userList = await User.findById(req.params.uid);
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

    
router.post('/',(req,res)=>
{
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash:req.body.passwordHash,
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

module.exports = router;
    