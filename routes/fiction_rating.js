const express = require("express");
const router = express.Router();
const calculate_fiction_rating = require("../services/fiction_rating");

/* Get Fanfic list */

router.get('/', async function(req, res, next) {
    try {
        res.json(await calculate_fiction_rating.getRating(req.query.page));
    } catch (err) {
        console.error(`Error while getting fanfictions rating `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await calculate_fiction_rating.createFicRate(req.body));
    } catch (err) {
        console.error(`Error while inserting to calculate fiction`, err.message);
        next(err);
    }
});

module.exports = router;