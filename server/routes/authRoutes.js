const express = require('express')
const {registerUser,loginUser,logoutUser} = require('../controllers/authController');
const { route } = require('./articleRoutes');
const protect = require("../middleware/authMiddleware")

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/me",protect,(req,res)=>{
    res.json(req.user);
})
router.post("/logout",logoutUser)
module.exports = router