const express = require("express");
const router = express.Router();
const homepage = require("../services/homepage");



router.get('/', async function(req, res, next) {
    try {
        res.json(await homepage.getHome());
    } catch (err) {
        console.error(`Error while getting interaction data`, err.message);
        next(err);
    }
});


module.exports = router;