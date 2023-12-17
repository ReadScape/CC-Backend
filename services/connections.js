const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// oke oce

async function getFollowing(id){
    const rows = await db.query(
        `SELECT * FROM connections WHERE user_id='${id}'`
    );

    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function getFollowers(id){
    const rows = await db.query(
        `SELECT * FROM connections WHERE following='${id}'`
    );

    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function createConnections(FLW){
    try{
          const checkQuery = `SELECT * FROM connections WHERE user_id = '${FLW.user_id}' AND following = '${FLW.following}'`;
          const existingRecord = await db.query(checkQuery);
    
          if (existingRecord.length > 0) {
            return { message: 'User already followed the other user' };
          } else {
            const result = await db.query(
              `INSERT INTO connections 
              (connection_id, user_id, following) 
              VALUES 
              (UUID(), '${FLW.user_id}', '${FLW.following}')`
            );
          }
        return { message: 'Following created ok' };
      } catch (err){
        console.error('Error while creating or updating following', err.message);
        throw err;
      }





}

async function removeFollow(id){
    const result = await db.query(
      `DELETE FROM connections WHERE connection_id='${id}'`
    );
  
    let message = 'Error in deleting connections';
  
    if (result.affectedRows) {
      message = 'connections deleted successfully';
    }
  
    return {message};
}

module.exports = {
    getFollowing,
    getFollowers,
    createConnections, 
    removeFollow
}
