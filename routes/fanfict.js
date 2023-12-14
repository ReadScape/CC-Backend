const express = require("express");
const router = express.Router();
const fanfict = require("../services/fanfict");
const multer = require("multer")
const bucket = require("../services/process/bucket");

const storage = multer.memoryStorage();
const processFile = multer({ storage: storage }).single("img_path");

/* Get Fanfic list */

router.get('/', async function(req, res, next) {
    try {
        res.json(await fanfict.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting fanfictions `, err.message);
        next(err);
    }
});
router.get('/get/:id', async function(req, res, next) {
    try {
        res.json(await fanfict.getFiction(req.params.id));
    } catch (err) {
        console.error(`Error while getting fanfiction `, err.message);
        next(err);
    }
});

/*router.post('/', async function (req, res, next) {
    try {
        res.json(await fanfict.create(req.body));
    } catch (err) {
        console.error(`Error while creating fiction`, err.message);
        next(err);
    }
}); */ // This is the old POST function

router.post('/post', async (req, res, next) => {
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
            const fictionData = {
                user_id: req.body.user_id,
                author: req.body.author,
                title: req.body.title,
                synopsis: req.body.synopsis,
                tags: req.body.tags,
                chapters: req.body.chapters,
                img_path: fileUrl
            };

            console.log('Chapter Data:', fictionData); // Add this line for debugging

            const result = await fanfict.create(req, res, fictionData);
            console.log('Result:', result); // Add this line for debugging
            res.json(result);
        } catch (err) {
            console.error(`Error while creating fiction`, err.message);
            next(err);
        }
    });
});

router.patch('/:id', async function (req, res, next) {
    try {
        res.json(await fanfict.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting fiction`, err.message);
        next(err);
    }
});

router.put('/update/:id', async (req, res, next) => {
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
            const fictionData = {
                author: req.body.author,
                title: req.body.title,
                synopsis: req.body.synopsis,
                tags: req.body.tags,
                chapters: req.body.chapters,
                img_path: fileUrl,
            };

            console.log('Fiction Data:', fictionData); // Add this line for debugging

            const result = await fanfict.updateFiction(id, req, res, fictionData);
            console.log('Result:', result); // Add this line for debugging
            res.json(result);
        } catch (err) {
            console.error(`Error while updating chapter`, err.message);
            next(err);
        }
    });
});

module.exports = router;