const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: "*", // Frontend Access Allowed
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// ✅ Import Routes
const productRoutes = require("./routes/productRoutes");

// ✅ Use Routes
app.use("/api/products", productRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("MERN Stack Backend is Running!");
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on http://192.168.10.9:${PORT}`));
