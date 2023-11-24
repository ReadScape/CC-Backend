const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ FUNCTION blablablablalblalbaba

async function getPostData(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM post_data LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function createPostData(CPD){
    const result = await db.query(
      `INSERT INTO post_data 
      (post_id, user_id, post, post_tags) 
      VALUES 
      (UUID(), '${CPD.user_id}', '${CPD.post}', '${CPD.post_tags}')`
    );
  
    let message = 'Error in creating the post data';
  
    if (result.affectedRows) {
      message = 'Post data created successfully';
    }
  
    return {message};
}

module.exports = {
    getPostData,
    createPostData,
}