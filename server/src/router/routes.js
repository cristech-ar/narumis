const express = require('express');
const router = express.Router();

router.get('/products/all', async (req, res) => {
    const products = [{
        name: 'Naruto',
        image: 'test'
    }, {
        name: "Narumi2",
        image:'test',
    }];
    res.status(200).json(products);
});

module.exports = router;