const express = require("express");
const router = express.Router();
const userTagData = require("../services/userTagData");

/// get

router.get('/', async function(req, res, next) {
    try {
        res.json(await userTagData.getUTagData(req.query.page));
    } catch (err) {
        console.error(`Error while getting user tag data`, err.message);
        next(err);
    }
});

/// post

router.post('/', async function (req, res, next) {
    try {
        res.json(await userTagData.createUTagData(req.body));
    } catch (err) {
        console.error(`Error while creating user tag data`, err.message);
        next(err);
    }
});

/// update

/// delete

router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await userTagData.removeUTagData(req.params.id));
    } catch (err) {
        console.error(`Error while deleting user tag data`, err.message);
        next(err);
    }
});

module.exports = router;