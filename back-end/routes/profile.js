const express = require('express');
const router = express.Router();
const axios = require('axios');
const { user } = require('../utils/db.js');
require("dotenv").config({ silent: true });

router.get('/', (req, res, next) => {
    user.find()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log("[ERROR:]", err);
        res.status(500).json(err);
    });
});

router.post('/update', (req, res) => {
    // THIS IS /profile/update ROUTE
    // DO YOUR MAGIC

    // const updateInfo = {
    //     field: req.body.field,
    //     newValue: req.body.newValue
    // };

    res.json({
        success: true,
        msg: `${req.body.field} successfully updated`
    });
});

module.exports = router;
