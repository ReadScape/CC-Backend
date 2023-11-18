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

async function create(req, res, chapters){
  if (!chapters) {
    throw new Error('Chapters data is undefined');
}
    chapters.pdf = chapters.pdf || {};
    const url = await upload(chapters.pdf);

    const result = await db.query(
      `INSERT INTO chapters 
      (chapter_id, fiction_id, path_to_text, chapter, title_chapter, user_id) 
      VALUES 
      (UUID(), '${chapters.fiction_id}', '${url}', ${chapters.chapter}, '${chapters.title_chapter}', '${chapters.user_id}')`
    );
  
    let message = 'Error in creating chapter';
  
    if (result.affectedRows) {
      message = 'chapter created successfully';
    }
  
    return {message};
  }

module.exports = {
    getMultiple,
    create
}