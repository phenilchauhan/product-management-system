const Product = require('../models/product.model');
const Category = require('../models/category.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const { Op } = require('sequelize');

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
exports.upload = upload.single('image');

// Create product
exports.create = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(400).json({ error: 'Invalid categoryId' });

        const product = await Product.create({ 
            ...req.body, 
            image: req.file ? req.file.filename : null 
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all products with pagination, search, sort, filter by category
exports.getAll = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'ASC', category, search } = req.query;
        const offset = (page - 1) * limit;
        const where = {};
        if (category) where.categoryId = category;
        if (search) where.name = { [Op.iLike]: `%${search}%` };

        const products = await Product.findAndCountAll({
            where,
            include: Category,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['price', sort]],
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get product by ID
exports.getById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, { include: Category });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update product
exports.update = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        if (req.file) {
            // delete old image
            if (product.image) fs.unlinkSync(`uploads/${product.image}`);
            req.body.image = req.file.filename;
        }

        await product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete product
exports.delete = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        if (product.image) fs.unlinkSync(`uploads/${product.image}`);
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Bulk upload products from Excel
exports.bulkUpload = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        await Product.bulkCreate(data);
        fs.unlinkSync(filePath);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Generate Excel report of products
exports.generateReport = async (req, res) => {
    try {
        const products = await Product.findAll({ include: Category });
        const ws = xlsx.utils.json_to_sheet(products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.Category ? p.Category.name : null,
            image: p.image
        })));

        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Products');
        const filePath = 'uploads/products_report.xlsx';
        xlsx.writeFile(wb, filePath);
        res.download(filePath, () => fs.unlinkSync(filePath));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
