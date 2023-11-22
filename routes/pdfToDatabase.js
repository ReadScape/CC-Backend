const express = require('express');
const pdfParse = require('pdf-parse');
const { downloadPdf } = require('../services/process/pdfDownload');
const { getPdf, create, getChapterInfo, getMultiple } = require('../services/pdfToDatabase');
const db = require('../services/db');
const router = express.Router();

router.post("/", async (req, res) => {
      try {
        const { data } = await getPdf();
        const remotePdfUrl = data[0].path_to_text;

        const pdfBuffer = await downloadPdf(remotePdfUrl);
        const pdfData = await pdfParse(pdfBuffer);


        const pdfContent = pdfData.text;
        const chapterInfo = await getChapterInfo();
        
        const chapterData = chapterInfo.data[0];
        
        const insertQuery = {
          user_id: chapterData.user_id,
          fiction_id: chapterData.fiction_id,
          chapter_id: chapterData.chapter_id,
          chapters: chapterData.chapter,
          title_chapters: chapterData.title_chapter,
          story: pdfContent,
        };

        console.log(insertQuery);
        const insertedResult = await create(insertQuery);

        res.json({ message: insertedResult.message });

      } catch (error) {
        console.error('Error Processing PDF:', error.message);
        res.status(500).json({ error: 'Internal Server error' });
      }
});

router.get('/', async function(req, res, next) {
  try {
      res.json(await getMultiple(req.query.page));
  } catch (err) {
      console.error(`Error while getting Story Database `, err.message);
      next(err);
  }
});
 

module.exports = router;