const express = require('express');
const { PDFDocument } = require('pdf-lib');
const { downloadPdf } = require('../services/process/pdfDownload');
const { getPdf, create } = require('../services/pdfToDatabase');
const db = require('../services/db');
const router = express.Router();

router.post("/", async (req, res) => {
    const databaseConfig = {
        host: "localhost",
        user: "readscape",
        password: "gustira1708",
        database: "readscape",
      };

      try {
        const { data } = await getPdf();
        const remotePdfUrl = data[0].path_to_text;

        const pdfBuffer = await downloadPdf(remotePdfUrl);
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        const pagesText = [];
        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
            const page = pdfDoc.getPage(i);
            const text = await page.getText();
            pagesText.push(text);
        }

        const pdfContent = pagesText.join('\n');
        const chapterInfo = await getChapterInfo();

        const insertQuery = {
            user_id: chapterInfo.user_id,
            fiction_id: chapterInfo.fiction_id,
            chapter_id: chapterInfo.chapter_id,
            chapters: chapterInfo.chapter,
            title_chapters: chapterInfo.title_chapter,
            story: pdfContent,
        }
        const insertedResult = await create(insertQuery);

        res.json({ message: insertedResult.message });




      } catch (error) {
        console.error('Error Processing PDF:', error.message);
        res.status(500).json({ error: 'Internal Server error' });
      }
});


 





async function getChapterInfo() {
    const connection = await mysql.createConnection(databaseConfig);
  
    try {
      const [result] = await connection.query(
        `SELECT user_id, fiction_id, chapter_id, title_chapter, chapter FROM chapters ORDER BY created_at DESC LIMIT 1`
      );
  
      return result[0];
    } finally {
      await connection.end();
    }
  }


module.exports = router;