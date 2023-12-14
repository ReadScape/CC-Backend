const express = require("express");
const router = express.Router();
const postdata = require("../services/post_data");

/// get

router.get('/', async function(req, res, next) {
    try {
        res.json(await postdata.getPostData(req.query.page));
    } catch (err) {
        console.error(`Error while getting post data `, err.message);
        next(err);
    }
});

/// post

router.post('/', async function (req, res, next) {
    try {
        res.json(await postdata.createPostData(req.body));
    } catch (err) {
        console.error(`Error while creating post data`, err.message);
        next(err);
    }
});

/// update

/// delete
router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await postdata.removePostData(req.params.id));
    } catch (err) {
        console.error(`Error while deleting post data`, err.message);
        next(err);
    }
});

module.exports = router;