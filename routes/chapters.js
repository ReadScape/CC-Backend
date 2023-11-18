const express = require("express");
const router = express.Router();
const chapters = require("../services/chapters");

/* Get Fanfic list */

router.get('/', async function(req, res, next) {
    try {
        res.json(await chapters.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting fanfictions `, err.message);
        next(err);
    }
});
router.post('/', async function (req, res, next) {
    try {
        res.json(await chapters.create(req.body));
    } catch (err) {
        console.error(`Error while creating chapter`, err.message);
        next(err);
    }
});
module.exports = router;