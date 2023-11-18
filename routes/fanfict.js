const express = require("express");
const router = express.Router();
const fanfict = require("../services/fanfict");

/* Get Fanfic list */

router.get('/', async function(req, res, next) {
    try {
        res.json(await fanfict.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting fanfictions `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await fanfict.create(req.body));
    } catch (err) {
        console.errror(`Error while creating fiction`, err.message);
        next(err);
    }
});

module.exports = router;