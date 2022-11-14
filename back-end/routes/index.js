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

    // const userObj = {
    //     name: req.body.username,
    //     password: req.body.password,
    //     shopping_cart: req.body.shopping_cart
    // };

    // save userObj to our mongoose database
    res.json({ success: true });
});

router.post('/login', (req, res) => {
    // THIS IS /login ROUTE
    // DO YOUR MAGIC

    // const userObj = {
    //     name: req.body.username,
    //     password: req.body.password,
    //     shopping_cart: req.body.shopping_cart
    // };

    // compare userObj to the existed userObj in our database
    res.json({ success: true });
});

router.get('/logout', (req, res) => {
    // THIS IS /logout ROUTE
    // DO YOUR MAGIC
    res.json({ sucess: true });
});

module.exports = router;
