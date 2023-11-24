const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ FUNCTION blablablablalblalbaba

async function getCalcPostPop(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM calculate_post_popularity LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function createCalcPostPop(UTD){
    const result = await db.query(
      `INSERT INTO calculate_post_popularity
      (post_id, popularity) 
      VALUES 
      ('${UTD.post_id}', '${UTD.popularity}')`
    );
  
    let message = 'Error in creating the Calculated post popularity';
  
    if (result.affectedRows) {
      message = 'Calculated post popularity created ok';
    }
  
    return {message};
}

module.exports = {
    getCalcPostPop,
    createCalcPostPop,
}