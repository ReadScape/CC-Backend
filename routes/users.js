const express = require("express");
const router = express.Router();
const users = require("../services/users");

/// get

router.get('/', async function(req, res, next) {
    try {
        res.json(await users.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/// post

router.post('/', async function (req, res, next) {
    try {
        res.json(await users.create(req.body));
    } catch (err) {
        console.error(`Error while creating user`, err.message);
        next(err);
    }
});

/// update

/// delete

module.exports = router;