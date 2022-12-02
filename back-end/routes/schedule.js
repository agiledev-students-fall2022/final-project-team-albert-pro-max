const express = require('express');
const router = express.Router();
const passport = require('passport');
const { course, recitation, user } = require('../utils/db.js');
require("dotenv").config({ silent: true });

router.get('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const me = await user.findOne({username: 'rxu64'});
    const list = [];
    await Promise.all(me.cart.map(async (item, index) => {
      if (item.show === true) {
        const c = await course.findOne({_id: item.course});
        list.push(c);
      }
    }));
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({
        error: err,
    });
  }
});

module.exports = router;