const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        trim:true
    },
    tags:{
        type:[String]
    },
    likes:{
        type:Number,
        default:0
    },
    views:{
        type:Number,
        default:0
    }   
},
    {
        timestamps:true
    }
)

const Article = mongoose.model('Article',articleSchema)
module.exports = Article