const express = require("express");
const router = express.Router();
const fyp = require("../services/fyp");

router.get('/:id', async function(req, res, next) {
    try {
        const result = await fyp.fypScript(req.params.id);
        console.log('Parsed JSON:', result);
        res.json(result);
    } catch (err) {
        console.error('Error while getting the result from the fyp script:', err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;