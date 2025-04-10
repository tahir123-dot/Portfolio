const axios = require("axios");
const Product = require("../models/Product");

const fetchAndStoreProducts = async (req, res) => {
  try {
    console.log("📢 Fetching products from FakeStore API...");

    
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    if (!products || products.length === 0) {
      console.log("❌ No products found in API response!");
      return res.status(400).json({ message: "No products found from API" });
    }

    console.log("✅ Fetched Products Count:", products.length);

    
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log("❌ Products already exist in the database.");
      return res.status(400).json({ message: "Products already exist in DB" });
    }

    // 3️⃣ API ke `id` field ko remove karo, taki MongoDB ka khud ka `_id` generate ho
    const modifiedProducts = products.map(({ id, ...rest }) => ({ ...rest }));

    console.log("✅ Modified Products Count:", modifiedProducts.length);

    // 4️⃣ Check karo ke modified data empty to nahi hai
    if (!modifiedProducts.length) {
      return res.status(400).json({ message: "No valid products to insert" });
    }

    // 5️⃣ Data MongoDB me insert karo
    console.log("📢 Inserting products into MongoDB...");
    await Product.insertMany(modifiedProducts);
    console.log("✅ Products inserted successfully!");

    res.status(201).json({ message: "Products saved successfully!" });
  } catch (err) {
    console.error("❌ Error during insertion:", err);
    res.status(500).json({ error: err.message, fullError: err });
  }
};

const getProducts = async (req, res) => {
  try {
    console.log("📢 Fetching products from MongoDB...");
    const products = await Product.find(); // Database se data le lo
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Database se product lo
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { fetchAndStoreProducts, getProducts, getProductById };
