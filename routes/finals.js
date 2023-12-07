const express = require("express");
const router = express.Router();
const { getFinal, createFinal } = require("../services/simcek");

/// get

router.get('/', async function(req, res, next) {
    try {
        res.json(await getFinal(req.query.page));
    } catch (err) {
        console.error(`Error while getting final similarity checker verdict`, err.message);
        next(err);
    }
});

/// post

router.post('/', async function (req, res, next) {
    const { final_plag_score, yes_or_no, verdict, ori_fic_id, opp_fic_id } = req.body;
    const oppFicIdArray = JSON.stringify(opp_fic_id);
    try {
        res.json(await createFinal(req.body, oppFicIdArray));
    } catch (err) {
        console.error(`Error while creating final similarity checker verdict`, err.message);
        next(err);
    }
});

module.exports = router;