const express = require("express");
const router = express.Router();
const { createCFR, getCalculatedRating } = require("../services/fiction_rating");

router.get('/', async function(req, res, next) {
    try {
        res.json(await getCalculatedRating(req.query.page));
    } catch (err) {
        console.error(`Error while getting the calculated rating `, err.message);
        next(err);
    }
});

// post

router.post('/', async function (req, res, next) {
    try {
        //console.log(req.body);
        res.json(await createCFR(req.body));
    } catch (err) {
        console.error(`Error while inserting to calculate fiction`, err.message);
        next(err);
    }
});

//delete
router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await calculate_fiction_rating.removeCFR(req.params.id));
    } catch (err) {
        console.error(`Error while deleting calculated post popularity`, err.message);
        next(err);
    }
});


module.exports = router;