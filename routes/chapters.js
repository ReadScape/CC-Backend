const express = require("express");
const router = express.Router();
const chapters = require("../services/chapters");
const multer = require("multer")




router.get('/', async function(req, res, next) {
    try {
        res.json(await chapters.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting fanfictions `, err.message);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const storage = multer.memoryStorage();
    var upload = multer({
        storage: storage}).single('userFile');
    upload(req, res, function(err) {
        console.log("File uploaded");
        res.end('File is uploaded')
    })
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    try {
        const chapterData = {
            fiction_id: req.body.fiction_id,
            text: req.file,
            chapter: req.body.chapter,
            title_chapter: req.body.title_chapter,
            user_id: req.body.user_id,
        };
        console.log(chapterData);
        const result = await chapters.create(req, res, chapterData);
        res.json(result);
    } catch (err) {
        console.error(`Error while creating chapter`, err.message);
        next(err);
    }
});
module.exports = router;