const express = require('express');
const { Category } = require('../Models/Category');
const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        let categoryList = await Category.find();
        if(!categoryList)  return res.status(500).json({success:false})
        return res.status(201).send(categoryList);
        
    } catch (error) {
        res.status(400).send({success:false,message:error});
    }
});

router.get('/:cid', async (req,res)=>{
    try {
        let categoryList = await Category.findById(req.params.cid);
        if(!categoryList)  return res.status(500).json({success:false,message:"Category Not Found!"})
        return res.status(201).send(categoryList);
        
    } catch (error) {
        res.status(400).send({success:false,message:error});

    }
});
    
router.post('/',async (req,res)=>
{
    let category = new Category({
        name:req.body.name,
        color:req.body.color,
        icon:req.body.icon,
        image:req.body.image
    });
    try {
        let newCategory = await category.save();
        if(!newCategory) return res.status(501).json({success:false, message:"Category is not Created!"});
        return res.status(201).send(newCategory);
    } catch (error) {
        res.status(400).send({success:false,message:error});
    }
});

router.delete('/:cid',(req,res) =>{    
    Category.findByIdAndRemove(req.params.cid)
    .then(deleteCategory =>{
        if(deleteCategory){
            return res.status(201).json({success:true,message:'The Category is deleted!'})
        }
        else {
            return res.status(404).json({success:false,message:'The Category is not found and not deleted!'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    });

});

router.put('/:cid',(req,res) =>{    
    Category.findByIdAndUpdate(req.params.cid,{
        name:req.body.name,
        color:req.body.color,
        icon:req.body.icon,
        image:req.body.image
    },{new:true})
    .then(newCategory =>{
        if(newCategory){
            return res.status(201).json({success:true,message:newCategory})
        }
        else {
            return res.status(404).json({success:false,message:'The requested Category is not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    });

});
module.exports = router;
    