function errorHandler (err,req,res,next){ 
    if(err.name ==='Unauthorized Error'){
       return res.status(500).json({message:"The User is not authorized!"})
    }
    else if(err.name==='ValidationError'){
       return res.status(500).json({message:err})
    }
    else if(err.name){
     return   res.status(500).json({message:err})

    }

}
module.exports=errorHandler