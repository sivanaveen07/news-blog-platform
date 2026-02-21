const {createArticle,getArticles,getArticleById}= require('../controllers/articleController')
const express = require('express')
const router = express.Router() 

router.post('/articles',createArticle)
router.get('/articles',getArticles)
router.get('/articles/:id',getArticleById)

module.exports = router