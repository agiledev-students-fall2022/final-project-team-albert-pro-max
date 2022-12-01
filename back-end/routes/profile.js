const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get('/', (req, res, next) => {
    // THIS IS /profile ROUTE
    // DO YOUR MAGIC HERE
    
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
