const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const upload = require("./process/bucket");
const Multer = require("multer");
const util = require("util");



async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM chapters LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function create(req, res, chapters) {
  try {
    const result = await db.query(
      `INSERT INTO chapters 
      (chapter_id, fiction_id, path_to_text, chapter, title_chapter, user_id) 
      VALUES 
      (UUID(), '${chapters.fiction_id}', '${chapters.text}', ${chapters.chapter}, '${chapters.title_chapter}', '${chapters.user_id}')`
  );

  console.log('Database Query Result:', result); // Add this line for debugging

  let message = 'Error in creating chapter';

  if (result && result.affectedRows > 0) {
      message = 'Chapter created successfully';
  }

  return { message };
} catch (err) {
  console.error('Error while creating chapter', err.message);
  throw err; // Rethrow the error for further handling in the route or middleware
}
}

/*  const result = await db.query(
    `INSERT INTO chapters 
    (chapter_id, fiction_id, path_to_text, chapter, title_chapter, user_id) 
    VALUES 
    (UUID(), '${chapters.fiction_id}', '${chapters.text}', ${chapters.chapter}, '${chapters.title_chapter}', '${chapters.user_id}')`
  ); */

module.exports = {
    getMultiple,
    create
}