const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ FUNCTION blablablablalblalbaba

async function getinterData(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM interaction_data LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function createinterData(indat){
    const result = await db.query(
      `INSERT INTO interaction_data 
      (post_id, user_id, love, comment, share) 
      VALUES 
      ('${indat.post_id}','${indat.user_id}', '${indat.love}', '${indat.comment}', '${indat.share}')`
    );
  
    let message = 'Error in creating the interaction data';
  
    if (result.affectedRows) {
      message = 'interaction data created ok';
    }
  
    return {message};
}

module.exports = {
    getinterData,
    createinterData,
}