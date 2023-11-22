const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ FUNCTION blablablablalblalbaba

async function getCalculatedRating(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM calculate_fiction_rating LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function getRating(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM fiction_rating LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function createCFR(CFR){
    const result = await db.query(
      `INSERT INTO calculate_fiction_rating 
      (fiction_id, rating_count, rating_mean, weighted_mean, num_click, num_love, popularity) 
      VALUES 
      ('${CFR.fiction_id}', '${CFR.rating_count}', '${CFR.rating_mean}', '${CFR.weighted_mean}', '${CFR.num_click}', '${CFR.num_love}', '${CFR.popularity}')`
    );
  
    let message = 'Error in creating the Calculated Fiction Rating';
  
    if (result.affectedRows) {
      message = 'Calculated Fiction Rating created successfully';
    }
  
    return {message};
}

async function createFicRate(FicRate){
    const result = await db.query(
      `INSERT INTO fiction_rating 
      (user_id, fiction_id, click, love, rating) 
      VALUES 
      ('${FicRate.user_id}', '${FicRate.fiction_id}', '${FicRate.click}', '${FicRate.love}', '${FicRate.rating}')`
    );
  
    let message = 'Error in creating Fiction Rating';
  
    if (result.affectedRows) {
      message = 'Fiction Rating created successfully';
    }
  
    return {message};
}


module.exports = {
    getCalculatedRating,
    createFicRate,
    createCFR,
    getRating,
}