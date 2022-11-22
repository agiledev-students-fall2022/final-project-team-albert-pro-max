const mongoose = require('mongoose'),
    passport = require('passport'),
    passportJWT = require("passport-jwt"),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt,
    LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model("User");
require("dotenv").config();

    
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    },
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        User.findOne({_id: jwtPayload.id})
            .exec((err, usr) => {
                if(err) {
                    cb(null, false);
                } else {
                    if(usr) {
                        cb(null, usr);
                    } else {
                        cb(null, false);
                    }
                    
                }
            })
            
    }
));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());