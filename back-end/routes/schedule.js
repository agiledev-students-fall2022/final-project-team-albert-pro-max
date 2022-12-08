const express = require('express');
const router = express.Router();
const passport = require('passport');
const { course, recitation, user } = require('../utils/db.js');
require("dotenv").config({ silent: true });

router.get('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const list = [];
    await Promise.all(req.user.cart.map(async (item, index) => {
      if (item.show === true) {
        const c = await course.findOne({_id: item.course});
        if (item.recitation !== null) {
          const r = await recitation.findOne({_id: item.recitation});
          list.push({
            lec: c,
            rec: r
          });
        } else {
          list.push({
            lec: c
          });
        }
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