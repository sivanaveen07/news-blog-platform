const mongoose = require('mongoose')
const dotenv = require( "dotenv");
dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("connected to database successfully")
        }
        catch(err){
            console.log("Error connecting to database:", err.message)
            process.exit(1)  // Exit the process with failure
        }
    }
module.exports = connectDB;