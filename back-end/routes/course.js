const express = require('express');
const router = express.Router();
const { course } = require('../utils/db.js');
require("dotenv").config({ silent: true });

router.get('/search', async (req, res, next) => {
    // THIS IS /course/search ROUTE
    // DO YOUR MAGIC
    try {
        const schools = await course.distinct('school_name');
        const list = [];
        await Promise.all(schools.map(async (item, index) => {
            const majors = await course.distinct('department_name', { school_name: item });
            const school = {
                school_id: index,
                school_name: item,
                majors: majors
            };
            list.push(school);
        }));
        res.json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({
          error: err,
        });
    }
});

router.get('/catalog', async (req, res, next) => {
    course.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("[ERROR:]", err);
            res.status(500).json(err);
        });
});

router.get('/details/:id', async (req, res, next) => {
    // THIS IS /course/details ROUTE
    // DO YOUR MAGIC

    const courseId = req.params.id;

    if (!courseId) {
        res.status(400).send("Missing param: id");
    } else {
        // axios
        //     .get(`${process.env.API_COURSE_DETAILS}&id=${courseId}`)
        //     .then(apiResponse => res.json(apiResponse.data))
        //     .catch(err => res.send(err));
        console.log("back",courseId)
        course.find({_id:courseId})
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            console.log("[ERROR:]", err);
            res.status(500).json(err);
        });
    }
});

router.post('/details/rating', (req, res) => {
    // THIS IS /course/details/rating ROUTE
    // DO YOUR MAGIC

    // const courseObj = {
    //     id: req.body.course_id,
    //     rating: req.body.rating
    // };

    res.json({
        success: true
    });
});

module.exports = router;
