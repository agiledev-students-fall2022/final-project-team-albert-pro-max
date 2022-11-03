const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // THIS IS /schedule ROUTE
    // DO YOUR MAGIC

    res.json({
        success: true,
        data: [],
        msg: "This is /schedule"
    });
});

router.get('/show', (req, res) => {
    // THIS IS /schedule/show ROUTE
    // DO YOUR MAGIC
});

module.exports = router;
