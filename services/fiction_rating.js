const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ FUNCTION blablablablalblalbaba

async function getCalculatedRating(page = 1){
    const rows = await db.query(
        `SELECT * FROM calculate_fiction_rating`
    );

    const data = helper.emptyOrRows(rows);
    
    return {
        data,
    }
}

async function getRating(page = 1){
    const rows = await db.query(
        `SELECT * FROM fiction_rating`
    );

    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}
//=============================================CONTAIMENT ZONE==================================================//

async function createCFR(calcFiction){
  try{
    for (const fictionData of calcFiction) {
      //console.log('Processing fictionData:', fictionData);
      const checkQuery = `SELECT * FROM calculate_fiction_rating WHERE fiction_id = '${fictionData.fiction_id}'`;
      const existingRecord = await db.query(checkQuery);

      if (existingRecord.length > 0) {

        // If the record exists, update it :D
        const updateQuery = `
        UPDATE calculate_fiction_rating
          SET
            count = '${fictionData.count}',
            mean = '${fictionData.mean}',
            click = '${fictionData.click}',
            love = '${fictionData.love}',
            popularity = '${fictionData.popularity}',
            weighted_mean = '${fictionData.weighted_mean}'
          WHERE fiction_id = '${fictionData.fiction_id}'`;

        //console.log('Executing Database Query:', updateQuery);
        const updateResult = await db.query(updateQuery);

        //console.log('Update Result:', updateResult);
      } else { 

        const insertQuery = `
          INSERT INTO calculate_fiction_rating 
          (fiction_id, count, mean, click, love, popularity, weighted_mean) 
          VALUES 
          ('${fictionData.fiction_id}', '${fictionData.count}', '${fictionData.mean}', '${fictionData.click}', '${fictionData.love}', '${fictionData.popularity}', '${fictionData.weighted_mean}')`;

        //console.log('Executing Database Query:', insertQuery);
        const insertResult = await db.query(insertQuery);

        //console.log('Insert Result:', insertResult);
      }
    }
    return { message: 'Calculated Fiction Ratings processed successfully' };
  } catch (err){
    console.error('Error while creating or updating fiction_rating', err.message);
    throw err;
  }
}

//=============================================CONTAIMENT ZONE==================================================//

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