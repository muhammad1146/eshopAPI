const {Product} = require('../Models/Product');
const express = require('express');
const { Category } = require('../Models/Category');
const router = express.Router();
router.get('/', async (req,res)=>{
   try {
       let productList = await Product.find();
       if(!productList) res.status(404).send("Products not found!")
       res.status(201).send(productList);
   } catch (error) {
    res.status(400).send(error);       
   }
});
   
router.get('/:pid', async (req,res)=>{
    try {
        let productList = await Product.findById(req.params.pid);
        if(!productList) res.status(404).send("Products not found!")
        res.status(201).send(productList);
    } catch (error) {
     res.status(400).send(error);       
    }
 });
router.post('/', async (req,res)=>
{
    let category = await Category.findById(req.params.category);
    if(!category) res.status(404).json({success:true,message:"Catogory assigned to Product is not Found!"});
    
    let dateCreated = Date.now();
    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        images:req.body.images,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        isFeatured:req.body.isFeatured,
       dateCreated
    });
    product.save().then((createdProduct)=>{
        res.status(201).json({success:true, content:createdProduct});
    }).catch((err)=>{
        res.status(501).json(
        {   error:err,
            success:false
        });
});
});


router.delete('/:pid',(req,res) =>{    
    Product.findByIdAndRemove(req.params.pid)
    .then(deleteProduct =>{
        if(deleteProduct){
            return res.status(201).json({success:true,message:'The Product is deleted!'})
        }
        else {
            return res.status(404).json({success:false,message:'The Product is not found and not deleted!'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    });

});

router.put('/:pid', async (req,res) =>{  
    try {
        let category = await Category.findById(req.params.category);
        if(!category) res.status(404).json({success:false, message:"Category Assigned to Product is not found!"});
    } catch (error) {
        res.status(400).json({success:false, message:error})
    }
    Product.findByIdAndUpdate(req.params.pid,{
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        images:req.body.images,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        isFeatured:req.body.isFeatured,
    },{new:true})
    .then(newProduct =>{
        if(newProduct){
            return res.status(201).json({success:true,message:newProduct})
        }
        else {
            return res.status(404).json({success:false,message:'The requested Product is not found!'})
        }
    }).catch(err => {
        return res.status(400).json({success:false, error:err})
    });

});


module.exports = router;
    