const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // THIS IS /cart ROUTE
    // DO YOUR MAGIC

    res.json({
        success: true,
        data: [],
        msg: "This is /cart"
    });
});

router.get('/watch', (req, res) => {
    // THIS IS /cart/watch ROUTE
    // DO YOUR MAGIC
});

module.exports = router;
