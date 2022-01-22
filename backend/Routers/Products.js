const {Product} = require('../Models/Product');
const express = require('express');
const { Category } = require('../Models/Category');
const router = express.Router();
const multer = require('multer');
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage });

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
router.post('/', uploadOptions.single('image'),async (req,res)=>
{
    let category = await Category.findById(req.params.category);
    if(!category) res.status(404).json({success:true,message:"Catogory assigned to Product is not Found!"});
    const file = req.file;
    if(!file) return res.status(400).send('No image in the request');
    const fileName = file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let dateCreated = Date.now();
    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:`${basePath}${fileName}`,
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

router.put('/:pid',  async (req,res) =>{  
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
     }
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

router.put(
    '/gallery-images/:id', 
    uploadOptions.array('images', 10), 
    async (req, res)=> {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
         }
         const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }

         const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true}
        )

        if(!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    }
)

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
});

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
});
router.put('/gallery-images/:id', 
    uploadOptions.array('images', 10), 
    async (req, res)=> {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
         }
         const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }

         const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true}
        )

        if(!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    }
)
module.exports = router;
    