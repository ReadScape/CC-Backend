// hewwo
const express = require("express");
const router = express.Router();
const tracking = require('../services/tracking');

router.get('/get/:id', async function(req, res, next) {
    try {
        res.json(await tracking.getTrack(req.params.id));
    } catch (err) {
        console.error(`Error while getting tracking data`, err.message);
        next(err);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        res.json(await tracking.createTrack(req.body));
    } catch (err) {
        console.error(`Error while creating tracking`, err.message);
        next(err);
    }
});

router.patch('/finished/:id', async function (req, res, next) {
    try {
        res.json(await tracking.updateTrack(req.params.id));
    } catch (err) {
        console.error(`Error while updating tracking`, err.message);
        next(err);
    }
});


module.exports = router;