const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// BELUM DI EDIT

async function getTrack(id){
    const rows = await db.query(
        `SELECT * FROM tracking WHERE track_id='${id}'`
    );

    const data = helper.emptyOrRows(rows);
    
    return {
        data,
    }
}

async function createTrack(TRK){
    const result = await db.query(
      `INSERT INTO tracking 
      (track_id, user_id, chapter_id, started, finished) 
      VALUES 
      (UUID(), '${TRK.user_id}', '${TRK.chapter_id}', 1, 0)`
    );
    const newtrack_id = await db.query(
        `SELECT track_id FROM tracking 
        WHERE user_id = '${TRK.user_id}' AND chapter_id = '${TRK.chapter_id}'`
    )
    console.log(newtrack_id);
  
    let message = 'Error in creating tracking';
  
    if (result.affectedRows) {
      message = newtrack_id;
    }
  
    return {message};
}

async function updateTrack(id){
    const result = await db.query(
      `UPDATE tracking 
      SET 
      finished = 1
      WHERE track_id='${id}'` 
    );
    
    let message = 'Error in updating tracking';
  
    if (result.affectedRows) {
      message = 'Tracking updated successfully';
    }
  
    return {message};
  }



// async function removeTrack(id){
//     const currentDateTime = new Date().toISOString();
//     const delquery = `UPDATE post_data SET deleted_at = NOW() WHERE post_id='${id}'`;
//     const result = await db.query( delquery );
//     let message = 'Error in deleting the post data';
  
//     if (result.affectedRows) {
//       message = 'Post data deleted successfully';
//     }
  
//     return {message};
// }



module.exports = {
    getTrack,
    createTrack,
    updateTrack
}