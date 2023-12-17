const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// oke oce

async function getPostComment(id){
    const rows = await db.query(
        `SELECT * FROM post_comment WHERE post_id='${id}'`
    );

    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function createPostComment(PCM){
    const result = await db.query(
      `INSERT INTO post_comment 
      (comment_id, post_id, user_id, comment_text) 
      VALUES 
      (UUID(), '${PCM.post_id}', '${PCM.user_id}', '${PCM.comment_text}')`
    );
  
    let message = 'Error in creating the post of a comment';
  
    if (result.affectedRows) {
      message = 'post of a comment created ok';
    }
  
    return {message};
}

async function removePostComment(id){
    const result = await db.query(
      `DELETE FROM post_comment WHERE comment_id='${id}'`
    );
  
    let message = 'Error in a comment of a post bookmark';
  
    if (result.affectedRows) {
      message = 'A comment of a post deleted successfully';
    }
  
    return {message};
}

module.exports = {
    getPostComment, 
    createPostComment, 
    removePostComment
}