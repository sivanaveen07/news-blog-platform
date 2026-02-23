const User = require("../models/User")
const generateToken = require('../utils/generateToken')

const registerUser = async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"all fields are required"})
        }
        const userExist = await User.findOne({email})
         if(userExist){
            return res.status(400).json({message:'user already exists'})
         }
         const user = await User.create({
            username,
            email,
            password
         })
         const token = generateToken(user._id)
         //set httpOnly
         res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: 60 *60*1000,//1hr
         })
         res.status(200).json({
            meaasge:"user registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
         })
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"})
    }
}

module.exports = {registerUser}