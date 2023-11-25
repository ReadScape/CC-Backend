const express = require("express");
const router = express.Router();
const cPP = require("../services/calcPostPopularity");
/// get

router.get('/', async function(req, res, next) {
    try {
        res.json(await cPP.getCalcPostPop(req.query.page));
    } catch (err) {
        console.error(`Error while getting user tag data`, err.message);
        next(err);
    }
});

/// post

router.post('/', async function (req, res, next) {
    try {
        res.json(await cPP.createCalcPostPop(req.body));
    } catch (err) {
        console.error(`Error while creating user tag data`, err.message);
        next(err);
    }
});

/// update

/// delete

router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await cPP.removeCalcPostPop(req.params.id));
    } catch (err) {
        console.error(`Error while deleting calculated post popularity`, err.message);
        next(err);
    }
});

module.exports = router;