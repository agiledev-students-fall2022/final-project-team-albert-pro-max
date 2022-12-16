const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken"),
    passportJWT = require("passport-jwt"),
    ExtractJWT = passportJWT.ExtractJwt;

require("dotenv").config();

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const mongoose = require('mongoose');
require('../utils/db');
const User = mongoose.model("User");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.SENDER_ADDRESS,
        pass: process.env.SENDER_PASSWORD,
    },
});
transporter.verify().then(console.log).catch(console.error);

router.get('/', (req, res) => {
    // THIS IS / ROUTE
    // DO YOUR MAGIC

    res.json({
        success: true,
        data: [],
        msg: "This is /"
    });
});

router.get('/register', (req, res) => {
    res.json({ success: true, user: req.body });
});

router.post('/register', (req, res) => {
    // THIS IS /register ROUTE
    // DO YOUR MAGIC
    const { username, password, email } = req.body;
    // console.log(req.body);
    User.register(new User({ username, email }), password, (err, user) => {
        if (err) {
            console.log(err);
            res.json({ error: 1, message: 'Your registration information is not valid' });
        } else {
            passport.authenticate('local')(req, res, function () {
                const payload = { id: user.id }; // some data we'll encode into the token
                const token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ success: true, username: user.username, token: token });

                transporter.sendMail({
                    from: `"AlbertProMax" ${process.env.SENDER_ADDRESS}`, // sender address
                    to: email,
                    subject: "Welcome! - Albert Pro Max", // Subject line
                    text: `Hi ${username}!\n\nThank you for using AlbertProMax.\n\nYou will receive email notifications when the course status in your watchlist changes.\n\nTo edit your watchlist, go to https://albertpromax.com/shoppingcart.\n\nAlbertProMax`, // plain text body
                    html: `<b>Hi ${username}!</b><p>Thank you for using AlbertProMax.</p><p>You will receive email notifications when the course status in your watchlist changes.</p><p>To edit your watchlist, go to <a href="https://albertpromax.com/shoppingcart">your shopping cart</a>.</p><b>AlbertProMax</b>`, // html body
                }).then(info => {
                    console.log({ info });
                }).catch(console.error);
            });
        }
    });
});

router.post('/login', (req, res, next) => {
    // THIS IS /login ROUTE
    // DO YOUR MAGIC
    passport.authenticate('local', (err, user) => {
        if (user) {
            req.logIn(user, (err) => {
                const payload = { id: user.id }; // some data we'll encode into the token
                const token = jwt.sign(payload, jwtOptions.secretOrKey); // create a signed token
                res.json({ success: true, username: user.username, token: token }); // send the token to the client to store
            });
        } else {
            res
                .status(401)
                .json({ success: false, message: `login failed` });
        }
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    // THIS IS /logout ROUTE
    // DO YOUR MAGIC
    res.json({ sucess: 'Logout Successfully' });
});

module.exports = router;
