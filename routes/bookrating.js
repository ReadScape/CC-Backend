const express = require('express');
const router = express.Router();
const rating = require('../services/bookrating');

//not being use

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await rating.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

module.exports = router;