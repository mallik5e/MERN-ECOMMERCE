import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

//function for add product
const addProduct = async(req,res) => {
    try{
     const {name,description,price,category,subCategory,sizes,bestseller} = req.body;
     const image1 = req.files.image1 && req.files.image1[0];//these checks that if image1 is available then stores it in database. otherwise it'll empty
     const image2 = req.files.image2 && req.files.image2[0];//these checks that if image2 is available then stores it in database. otherwise it'll empty
     const image3 = req.files.image3 && req.files.image3[0];//these checks that if image3 is available then stores it in database. otherwise it'll empty
     const image4 = req.files.image4 && req.files.image4[0];//these checks that if image4 is available then stores it in database. otherwise it'll empty

     const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)//if we have 1 image, we upload only 1 to cloudinary or 2 image, we upload only 2.

     let imagesUrl = await Promise.all(//take the images url from cloudinary, store this url in database.
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url
        })
     )

     const productData = {
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === 'true' ? true : false,
        sizes: JSON.parse(sizes),
        image: imagesUrl,
        date : Date.now()
    }

    const product = new productModel(productData);//it'll create one project
    await product.save();

    res.json({success:true,message:'Product Added'})

    } catch(error){
        console.log(error)
       res.json({success:false,message:error.message})
    }
}

//function for list product
const listProduct = async(req,res)=>{
    try{
       const products = await productModel.find({});
       res.json({success:true,products})
    }catch(error){
       console.log(error)
       res.json({success:false,message:error.message})
    }
}

//function for remove product
const removeProduct = async(req,res)=>{
    try{
       await productModel.findByIdAndDelete(req.body.id);
       res.json({success:true,message:'Product Removed'})
    }catch(error){
       console.log(error)
       res.json({success:false,message:error.message})
    }
}

//function for single product
const singleProduct = async(req,res)=>{
   try{
      const {productId } = req.body;
      const product = await productModel.findById(productId);
      res.json({success:true,product});
   }catch(error){
       console.log(error)
       res.json({success:false,message:error.message})
   }
}

export  {addProduct,listProduct,removeProduct,singleProduct}