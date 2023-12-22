const express = require('express');
const router = express.Router();
const connections = require('../services/connections');

router.get('/following/:id', async function(req, res, next) {
    try {
        res.json(await connections.getFollowing(req.params.id));
    } catch (err) {
        console.error(`Error while getting followings data`, err.message);
        next(err);
    }
});

router.get('/followers/:id', async function(req, res, next) {
    try {
        res.json(await connections.getFollowers(req.params.id));
    } catch (err) {
        console.error(`Error while getting followers data`, err.message);
        next(err);
    }
});

router.post('/follow', async function (req, res, next) {
    try {
        res.json(await connections.createConnections(req.body));
    } catch (err) {
        console.error(`Error while creating connections`, err.message);
        next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await connections.removeFollow(req.params.id));
    } catch (err) {
      console.error(`Error while deleting bookmark`, err.message);
      next(err);
    }
});

module.exports = router; 