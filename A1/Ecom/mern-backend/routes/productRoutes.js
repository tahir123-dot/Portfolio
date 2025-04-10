const express = require("express");
const { fetchAndStoreProducts, getProducts, getProductById } = require("../controllers/productController");

const router = express.Router();

router.post("/fetch", fetchAndStoreProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);  // 🆕 Route for getting a product by ID

module.exports = router;
