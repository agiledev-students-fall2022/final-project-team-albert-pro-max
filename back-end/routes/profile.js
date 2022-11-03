const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // THIS IS /profile ROUTE
    // DO YOUR MAGIC HERE

    res.json({
        success: true,
        data: [],
        msg: "This is /profile"
    });
});

router.post('/update', (req, res) => {
    // THIS IS /profile/update ROUTE
    // DO YOUR MAGIC
});

module.exports = router;
