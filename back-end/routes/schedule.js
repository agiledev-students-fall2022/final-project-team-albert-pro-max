const express = require('express');
const router = express.Router();
const axios = require('axios');
require("dotenv").config({ silent: true });

router.get('/show', (req, res) => {
    // THIS IS /schedule/show ROUTE
    // DO YOUR MAGIC
});

module.exports = router;
