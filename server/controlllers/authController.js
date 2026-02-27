const User = require("../models/User")
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs')

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
const loginUser = async (req,res)=>{
    try{
        const{ email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
             return res.status(401).json({mesaage:"invalid credentials"})
        }
        const token = generateToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:60*60*1000
        })
        res.status(200).json({
            id:user._id,
            username:user.username,
            email : user.email
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}

const logoutUser = (req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        expires : new Date(0),//expires imediately
    })
    res.status(200).json({message:"logged out successfully"})
}

module.exports = {registerUser,loginUser,logoutUser}