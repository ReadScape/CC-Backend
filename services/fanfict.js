const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ FUNCTION

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM fiction LIMIT ${offset}, ${config.listPerPage}`
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

// END OF READ FUNCTION
// POST FUNCTION

async function create(fiction){
    const result = await db.query(
      `INSERT INTO fiction 
      (fiction_id, user_id, author, title, synopsis, tags, chapters) 
      VALUES 
      (UUID(), '${fiction.user_id}', '${fiction.author}', '${fiction.title}', '${fiction.synopsis}', '${fiction.tags}', ${fiction.chapters})`
    );
  
    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    return {message};
  }
  

module.exports = {
    getMultiple,
    getRating,
    create
}