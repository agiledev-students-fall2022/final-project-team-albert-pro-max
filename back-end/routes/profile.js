const express = require('express');
const router = express.Router();
const axios = require('axios');
const { user } = require('../utils/db.js');
require("dotenv").config({ silent: true });

router.get('/:username', (req, res, next) => {
    const username=req.params.username;

  /*   user.findOne({username: 'elaine'})
    .then(data => {
        console.log(data)
        res.json(data);
    })
    .catch(err => {
        console.log("[ERROR:]", err);
        res.status(500).json(err);
    }); */

    if (!username) {
        res.status(400).send("Missing param: username");
    } else {
        user.findOne({username:username})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("[ERROR:]", err);
            res.status(500).json(err);
        });
    }
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
