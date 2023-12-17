const express = require("express");
const router = express.Router();
const postcomment = require("../services/post_comment");

router.get('/:id', async function(req, res, next) {
    try {
        res.json(await postcomment.getPostComment(req.params.id));
    } catch (err) {
        console.error(`Error while getting comments of a post data`, err.message);
        next(err);
    } 
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await postcomment.createPostComment(req.body));
    } catch (err) {
        console.error(`Error while creating comment of a post`, err.message);
        next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await postcomment.removePostComment(req.params.id));
    } catch (err) {
      console.error(`Error while deleting comment of a post`, err.message);
      next(err);
    }
});

module.exports = router;