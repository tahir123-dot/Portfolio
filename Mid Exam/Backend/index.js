const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");
const authRoutes = require("./routes/userRoutes");
const {Joblisting } = require("./controller/job");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true
}));


connectDB();

app.use("/api/auth", authRoutes);
Joblisting();
const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`Server running on this Port: ${PORT}`);
})