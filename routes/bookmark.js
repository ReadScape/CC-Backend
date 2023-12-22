const express = require('express');
const router = express.Router();
const bookmark = require('../services/bookmark');

router.get('/get/:id', async function(req, res, next) {
    try {
        res.json(await bookmark.getBookmark(req.params.id));
    } catch (err) {
        console.error(`Error while getting tracking data`, err.message);
        next(err);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        res.json(await bookmark.createBookmark(req.body));
    } catch (err) {
        console.error(`Error while creating tracking`, err.message);
        next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await bookmark.removeBookmark(req.params.id));
    } catch (err) {
      console.error(`Error while deleting bookmark`, err.message);
      next(err);
    }
});

module.exports = router; 