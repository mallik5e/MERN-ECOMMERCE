import userModel from '../models/userModel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async(req,res) => {
     try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email})//checking any user avaliable with this user email
        if(!user){
            return res.json({success:false,message:"User doesn't exists"})
        }
        //match user entered password with stored database password
        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = createToken(user._id) //generate an token for login
            res.json({success:true,token})
        }else{
            res.json({success:false,message:'Invalid credentials'})
        }

     }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
     }
}

//Route for user register
const registerUser = async(req,res) => {
  try{
   const {name,email,password} = req.body;//trying to get name,email,password from url request.
   //checking user already exists or not
   const exists = await userModel.findOne({email})//checking any user avaliable with this user email
   if(exists){
      return res.json({success:false,message:'User already exists'})
   }
   //validating email format and strong password
   if(!validator.isEmail(email)){
     return res.json({success:false,message:'Please enter a valid email'})
   }
   if(password.length<8){
    return res.json({success:false,message:'Please enter a valid password'})
  }

  //bcrypt user password to store in database
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  const newUser = new userModel({
    name,
    email,
    password:hashedPassword
  })

  const user = await newUser.save();//newUser stored in database
  const token = createToken(user._id)//id will be auto generated in database. once you store data.

  res.json({success:true,token})

  }catch(error){
     console.log(error)
     res.json({success:false,message:error.message})
  }
}

//Route for admin login
const adminLogin = async(req,res)=>{
    try{
       const {email,password} = req.body;
       if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET);
        res.json({success:true,token})
       }else{
        res.json({success:false,message:'Invalid Credentials'})
       }
    }catch(error){
       console.log(error)
       res.json({success:false,message:error.message})
    }
}

export {loginUser,registerUser,adminLogin}