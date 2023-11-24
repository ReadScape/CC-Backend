const express = require("express");
const router = express.Router();
const interData = require("../services/interData");

/// get

router.get('/', async function(req, res, next) {
    try {
        res.json(await interData.getinterData(req.query.page));
    } catch (err) {
        console.error(`Error while getting interaction data`, err.message);
        next(err);
    }
});

/// post

router.post('/', async function (req, res, next) {
    try {
        res.json(await interData.createinterData(req.body));
    } catch (err) {
        console.error(`Error while creating interaction data`, err.message);
        next(err);
    }
});

/// update

/// delete

module.exports = router;