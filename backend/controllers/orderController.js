
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

//global variables
const currency = 'inr'
const deliveryCharge = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing orders using COD method
const placeOrder = async(req,res)=>{
    try{
        const {userId,items,amount,address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment:false,
            date:Date.now(),
        }
         const newOrder = new orderModel(orderData)
         await newOrder.save()
         await userModel.findByIdAndUpdate(userId,{cartData:{}})
         res.json({success:true,message:'Order placed'})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//placing orders using stripe method
const placeOrderStripe = async(req,res)=>{
    try{
        const {userId,items,amount,address} = req.body;
        const {origin} = req.headers;
        const orderData = {
          userId,
          items,
          amount,
          address,
          paymentMethod: "COD",
          payment:false,
          date:Date.now(),
      } 
      const newOrder = new orderModel(orderData)
      await newOrder.save();

      const customer = await stripe.customers.create({
        name: req.body.address.name, // Assuming req.body.address contains name
        address: {
          line1: req.body.address.line1,
          postal_code: req.body.address.postal_code,
          city: req.body.address.city,
          state: req.body.address.state,
          country: req.body.address.country
        },
      });

      const line_items = items.map((item)=>({//show the items data in payment page
        price_data : {
          currency:currency,
          product_data:{
            name:item.name
          },
          unit_amount: item.price * 100
        },
        quantity: item.quantity
      }))
      line_items.push({
        price_data : {
          currency:currency,
          product_data:{
            name:'Delivery charges'
          },
          unit_amount: deliveryCharge * 100
        },
        quantity: 1
      })
      const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,//payment success, redirect to success_url
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,//payment fail, redirect to cancel_url
        line_items,
        mode:'payment',
        customer: customer.id, // Link the customer to the checkout session
        shipping_address_collection: {
        allowed_countries: ['IN'], // Specify allowed countries (e.g., only India)
        },
      })
      res.json({success:true,session_url:session.url})
    }catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
    }
}

//verify Stripe payment. if success,make the database payment status true and clear the cart data with that userId.
const verifyStripe = async(req,res) => {
  const {orderId,success,userId} = req.body;
  try{
     if(success === 'true'){
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true})
     }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
     }
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

//placing orders using razorpay method
const placeOrderRazorpay = async(req,res)=>{
    
}

//All orders data for admin panel
const allOrders = async(req,res) => {
     try{
      const orders = await orderModel.find({})
      res.json({success:true,orders})
     }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
     }
}

//user order data for frontend
const userOrders = async(req,res) => {
      try{
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
      }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
      }
}

//update order status from Admin panel
const updateStatus = async(req,res) => {
    try{
       const {orderId,status} = req.body;
       await orderModel.findByIdAndUpdate(orderId,{status})
       res.json({success:true,message:'Status Updated'})
    }catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe}