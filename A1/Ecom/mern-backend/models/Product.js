const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number
  }
});

module.exports = mongoose.model("Product", ProductSchema, "Product");
