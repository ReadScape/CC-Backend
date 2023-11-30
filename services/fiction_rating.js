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
///

async function createCFR(calcFiction){
  try{
    const values = calcFiction.map(fictionData => `('${fictionData.fiction_id}', '${fictionData.count}', '${fictionData.mean}', '${fictionData.click}', '${fictionData.love}', '${fictionData.popularity}', '${fictionData.weighted_mean}')`).join(',');

    const query = `INSERT INTO calculate_fiction_rating (fiction_id,  count, mean, click, love, popularity, weighted_mean) VALUES ${values}`;
    console.log('Executing Database Query:', query);

    const result = await db.query(query);

    console.log('Database query result:', result);
    
    let message = 'ANjay error';
    if(result.affectedRows){
      message = 'yes bisa'
    }
    return { message };
  } catch (err){
    console.error('kms', err.message);
    throw err;
  }
}

//
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

async function removeCFR(id){
    const currentDateTime = new Date().toISOString();
    const delquery = `UPDATE calculate_fiction_rating SET deleted_at = NOW() WHERE fiction_id='${id}'`;
    const result = await db.query( delquery );
    let message = 'Error in deleting the calculate fiction rating';
  
    if (result.affectedRows) {
      message = 'calculate fiction rating deleted successfully';
    }
  
    return {message};
}

async function removeFicRate(id){
    const currentDateTime = new Date().toISOString();
    const delquery = `UPDATE fiction_rating SET deleted_at = NOW() WHERE fiction_id='${id}'`;
    const result = await db.query( delquery );
    let message = 'Error in deleting the fiction rating';
  
    if (result.affectedRows) {
      message = 'Fiction rating deleted successfully';
    }
  
    return {message};
}

module.exports = {
    getCalculatedRating,
    createFicRate,
    createCFR,
    getRating,
    removeCFR,
    removeFicRate
}