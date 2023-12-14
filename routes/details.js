const express = require("express");
const router = express.Router();
const { getDetails, createDetails } = require("../services/simcek");

/// get

router.get('/', async function(req, res, next) {
    try {
        res.json(await getDetails(req.query.page));
    } catch (err) {
        console.error(`Error while getting similarity checker details`, err.message);
        next(err);
    }
});

/// post

router.post('/', async function (req, res, next) {
    const { ori_fic_id, ori_chap_id, ori_line, opp_fic_id, opp_chap_id, sim_line } = req.body;
    const oriFicIdArray = Object.values(ori_fic_id);
    const oriChapIdArray = Object.values(ori_chap_id);
    const oriLineArray = Object.values(ori_line);
    const oppFicIdArray = Object.values(opp_fic_id);
    const oppChapIdArray = Object.values(opp_chap_id);
    const simLineArray = Object.values(sim_line);
    try {
        res.json(await createDetails(oriFicIdArray, oriChapIdArray, oriLineArray, oppFicIdArray, oppChapIdArray, simLineArray));
    } catch (err) {
        console.error(`Error while creating similarity checker details`, err.message);
        next(err);
    }
});

module.exports = router;