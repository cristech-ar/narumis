const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/products/all', async (req, res) => {
    try {
        const collection = db.getCollection('products');
        const items = await collection.find().toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/product', async (req, res) => {
    try {
        const collection = db.getCollection('products');
        await collection.insertOne(req.body);
        res.status(200).send('true');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;