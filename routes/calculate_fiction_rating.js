const express = require("express");
const router = express.Router();
const calculate_fiction_rating = require("../services/fiction_rating");

router.get('/', async function(req, res, next) {
    try {
        res.json(await calculate_fiction_rating.getCalculatedRating(req.query.page));
    } catch (err) {
        console.error(`Error while getting the calculated rating `, err.message);
        next(err);
    }
});

module.exports = router;