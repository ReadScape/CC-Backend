const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// udah dibikin 

async function getBookmark(id){
    const rows = await db.query(
        `SELECT * FROM bookmark WHERE user_id='${id}'`
    );

    const data = helper.emptyOrRows(rows);
    
    return {
        data,
    }
}

async function createBookmark(BMK){
    const result = await db.query(
      `INSERT INTO bookmark 
      (bookmark_id, user_id, fiction_id) 
      VALUES 
      (UUID(), '${BMK.user_id}', '${BMK.fiction_id}')`
    );
    const newtrack_id = await db.query(
        `SELECT bookmark_id FROM bookmark 
        WHERE user_id = '${BMK.user_id}' AND fiction_id = '${BMK.chapter_id}'`
    )
  
    let message = 'Error in creating bookmark';
  
    if (result.affectedRows) {
      message = 'ok in creating bookmark';
    }
    return {message};
}

async function removeBookmark(id){
    const result = await db.query(
      `DELETE FROM bookmark WHERE bookmark_id='${id}'`
    );
  
    let message = 'Error in deleting bookmark';
  
    if (result.affectedRows) {
      message = 'bookmark deleted successfully';
    }
  
    return {message};
}

module.exports = {
    getBookmark, 
    createBookmark,
    removeBookmark
}
