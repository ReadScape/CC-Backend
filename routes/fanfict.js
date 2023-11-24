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
        console.error(`Error while creating fiction`, err.message);
        next(err);
    }
});


router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await fanfict.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting fiction`, err.message);
        next(err);
    }
});

module.exports = router;