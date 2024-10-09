const Product = require("../models/product.model");

// Helper function for standardized response
const sendResponse = (res, statusCode, data = null, message = null) => {
    const response = {
        status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
        message: message || null,
        data: data || null,
    };
    res.status(statusCode).json(response);
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        sendResponse(res, 200, products, "Products retrieved successfully.");
    } catch (error) {
        sendResponse(res, 500, null, error.message);
    }
};

// Get a single product
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return sendResponse(res, 404, null, "Product not found.");
        }

        sendResponse(res, 200, product, "Product retrieved successfully.");
    } catch (error) {
        sendResponse(res, 500, null, error.message);
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        sendResponse(res, 201, product, "Product created successfully.");
    } catch (error) {
        sendResponse(res, 500, null, error.message);
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!product) {
            return sendResponse(res, 404, null, "Product not found.");
        }

        sendResponse(res, 200, product, "Product updated successfully.");
    } catch (error) {
        sendResponse(res, 500, null, error.message);
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return sendResponse(res, 404, null, "Product not found.");
        }

        sendResponse(res, 200, null, "Product deleted successfully.");
    } catch (error) {
        sendResponse(res, 500, null, error.message);
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
