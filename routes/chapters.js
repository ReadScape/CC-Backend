const express = require("express");
const router = express.Router();
const chapters = require("../services/chapters");

/* Get Fanfic list */

router.get('/', async function(req, res, next) {
    try {
        res.json(await chapters.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting fanfictions `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        // Access the regular request body using req.body
        const requestBody = req.body;

        // Access the uploaded file using req.file
        const uploadedFile = req.file;

        // Combine the regular request body and file data as needed
        const combinedData = {
            ...requestBody,
            file: uploadedFile,
        };
        res.json(await chapters.create(combinedData));
    } catch (err) {
        console.error(`Error while creating chapter`, err.message);
        next(err);
    }
});
module.exports = router;