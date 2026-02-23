const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const articleRoutes = require('./routes/articleRoutes');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
dotenv.config(); // Load env variables FIRST

const app = express();

// Middleware
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});
// Routes
app.use('/api',articleRoutes);
app.use("/api/auth",authRoutes)

// Start server only after DB connects
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();