const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getPdf() {
    const rows = await db.query(
        `SELECT path_to_text FROM chapters ORDER BY created_at DESC LIMIT 1`
    );
    const data = rows;
    return {
        data
    }
}
async function getChapterInfo() {
    const rows = await db.query(
        `SELECT user_id, fiction_id, chapter_id, chapter, title_chapter FROM chapters ORDER BY created_at DESC LIMIT 1`
    );

    const data = rows;
    
    return {
        data
    }
}
async function getMultiple() {
    const rows = await db.query(
        `SELECT * FROM story_dataset`
    );

    const data = rows;
    return {
        data
    }
}

async function create(pdfText){
  const result = await db.query(
    `INSERT INTO story_dataset 
      (user_id, fiction_id, chapter_id, chapters, title_chapters, story) 
      VALUES (?, ?, ?, ?, ?, ?)`,
    [
      pdfText.user_id,
      pdfText.fiction_id,
      pdfText.chapter_id,
      pdfText.chapters,
      pdfText.title_chapters,
      pdfText.story,
    ]
  );
  
    let message = 'Error in inserting Story Dataset';
  
    if (result.affectedRows) {
      message = 'Dataset inserted successfully';
    }
  
    return {message};
}

module.exports = {
    getPdf,
    getChapterInfo,
    getMultiple,
    create
  }