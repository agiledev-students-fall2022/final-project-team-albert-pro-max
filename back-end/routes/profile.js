const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });
const passport = require('passport');

router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    // THIS IS /profile ROUTE
    // DO YOUR MAGIC HERE
    res.json({
        success: true,
        user: {
            id: req.user.username,
            username: req.user.username,
        },
        message:
            "Congratulations: you have accessed this route because you have a valid JWT token!",
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
