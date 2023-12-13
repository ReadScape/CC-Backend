const express = require("express");
const router = express.Router();
const chapters = require("../services/chapters");
const multer = require("multer")
const bucket = require("../services/process/bucket");

const storage = multer.memoryStorage();
const processFile = multer({ storage: storage }).single("text");


router.get('/', async function(req, res, next) {
    try {
        res.json(await chapters.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting fanfictions `, err.message);
        next(err);
    }
});

router.get('/get/:id', async function(req, res, next) {
    try {
        res.json(await chapters.getChapter(req.params.id));
    } catch (err) {
        console.error(`Error while getting chapter `, err.message);
        next(err);
    }
});

router.post('/testChapter', async (req, res, next) => {
    processFile(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // Multer error (e.g., file size exceeded)
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Other unexpected errors
            console.error(`Error during file upload`, err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // If no file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        try {
            
            const fileUrl = await bucket.upload(req.file);
            const chapterData = {
                fiction_id: req.body.fiction_id,
                text: fileUrl,
                chapter: req.body.chapter,
                title_chapter: req.body.title_chapter,
                user_id: req.body.user_id,
            };

            console.log('Chapter Data:', chapterData); // Add this line for debugging

            const result = await chapters.create(req, res, chapterData);
            console.log('Result:', result); // Add this line for debugging
            res.json(result);
        } catch (err) {
            console.error(`Error while creating chapter`, err.message);
            next(err);
        }
    });
});


router.post('/', async (req, res, next) => {
    processFile(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // Multer error (e.g., file size exceeded)
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Other unexpected errors
            console.error(`Error during file upload`, err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // If no file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        try {
            const fileUrl = await bucket.upload(req.file);
            const chapterData = {
                fiction_id: req.body.fiction_id,
                text: fileUrl,
                chapter: req.body.chapter,
                title_chapter: req.body.title_chapter,
                user_id: req.body.user_id,
            };

            console.log('Chapter Data:', chapterData); // Add this line for debugging

            const result = await chapters.create(req, res, chapterData);
            console.log('Result:', result); // Add this line for debugging
            res.json(result);
        } catch (err) {
            console.error(`Error while creating chapter`, err.message);
            next(err);
        }
    });
});

router.put('/:id', async (req, res, next) => {
    processFile(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // Multer error (e.g., file size exceeded)
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Other unexpected errors
            console.error(`Error during file upload`, err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // If no file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        try {
            const fileUrl = await bucket.upload(req.file);
            const id = req.params.id
            const chapterData = {
                text: fileUrl,
                chapter: req.body.chapter,
                title_chapter: req.body.title_chapter,
            };

            console.log('Chapter Data:', chapterData); // Add this line for debugging

            const result = await chapters.updateChapter(id, req, res, chapterData);
            console.log('Result:', result); // Add this line for debugging
            res.json(result);
        } catch (err) {
            console.error(`Error while updating chapter`, err.message);
            next(err);
        }
    });
});
router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await chapters.removeChapters(req.params.id));
    } catch (err) {
        console.error(`Error while deleting chapters`, err.message);
        next(err);
    }
});

module.exports = router;