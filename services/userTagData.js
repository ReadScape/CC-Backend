const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ FUNCTION blablablablalblalbaba

async function getUTagData(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM user_tags_data LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function createUTagData(UTD){
    const result = await db.query(
      `INSERT INTO user_tags_data 
      (user_id, tags) 
      VALUES 
      ('${UTD.user_id}', '${UTD.tags}')`
    );
  
    let message = 'Error in creating the user tag data';
  
    if (result.affectedRows) {
      message = 'User tag data created ok';
    }
  
    return {message};
}

module.exports = {
    getUTagData,
    createUTagData,
}