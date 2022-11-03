const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // THIS IS / ROUTE
    // DO YOUR MAGIC

    res.json({
        success: true,
        data: [],
        msg: "This is /"
    });
});

router.post('/register', (req, res) => {
    // THIS IS /register ROUTE
    // DO YOUR MAGIC
});

router.post('/login', (req, res) => {
    // THIS IS /login ROUTE
    // DO YOUR MAGIC
});

router.get('/logout', (req, res) => {
    // THIS IS /logout ROUTE
    // DO YOUR MAGIC
});

module.exports = router;
