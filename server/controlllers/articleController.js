const { default: mongoose } = require('mongoose');
const Article = require('../models/Article');

const createArticle = async (req, res) => {
  try {
    let { title, content, category, tags } = req.body;

    // Trim strings to avoid empty spaces issue
    title = title?.trim();
    content = content?.trim();
    category = category?.trim();

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const newArticle = await Article.create({// Use Mongoose's create method to save to DB
      title,
      content,
      category,
      tags
    });
    // Send clean response
    res.status(201).json({
      message: "Article created successfully",
      article: {
        id: newArticle._id,// Return MongoDB generated ID
        title: newArticle.title,
        content: newArticle.content,
        category: newArticle.category,
        tags: newArticle.tags,
        likes: newArticle.likes,
        views: newArticle.views,
        createdAt: newArticle.createdAt
      }
    });

  } catch (error) {
    console.error("Error creating article:", error.message);
    res.status(500).json({
      message: "Server error while creating article"
    });
  }
};
const getArticles = async(req,res)=>{
 try{
  let{page = 1, limit = 10 ,sort = "latest"} = req.query;// Get query params with defaults
  page = parseInt(page);
  limit = parseInt(limit);

  if(isNaN(page) || isNaN(limit)){
    return res.status(400).json({
      message: "Page and limit must be numbers"
    });
  }
  page = Math.max(page, 1);
  const maxLimit = 50;
  limit = Math.max(limit, 1);
  limit = Math.min(limit, maxLimit);
  const skip = (page-1)*limit;
  let sortOption = { createdAt: -1 };// Default to latest
  if(sort === "oldest"){
    sortOption = { createdAt: 1 };
  } else if(sort === "popular"){
    sortOption = { likes: -1 };
  } else if(sort === "mostViewed"){
    sortOption = { views: -1 };
   }
   const articles = await Article.find()
    .sort(sortOption)
    .skip(skip)// Pagination
    .limit(limit);
    const totalArticles = await Article.countDocuments();// Get total count for pagination info
    const totalPages = Math.ceil(totalArticles/limit);
    res.status(200).json({
      total:totalArticles,
      currentPage:page,
      totalPages,
      limit,
      articles
    });
  }
  catch(err){
    console.error("Error fetching article:", err.message);
    res.status(500).json({
      message: "Server error while fetching article"
    });
  }
};
const getArticleById = async (req,res)=>{
  try{
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id)){
       console.log("invalid id");
      return res.status(400).json({message:"bad request"})
    }
     const article = await Article.findById(id);
    if(!article){
     return res.status(404).json({message:"Article not found"})
    }
     res.json(article);
  }
  catch(err){
    res.status(500).json({message:"server issue"})
  }

}

module.exports = { createArticle, getArticles ,getArticleById};