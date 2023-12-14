const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ FUNCTION blablablablalblalbaba

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM fiction WHERE deleted_at IS NULL LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}
async function getFiction(id){
  const fiction = await db.query(
    `SELECT user_id, author, title, synopsis, tags, chapters, img_path FROM fiction WHERE fiction_id='${id}'`);
  const chapters = await db.query(
    `SELECT chapter_id, path_to_text, chapter, title_chapter FROM chapters WHERE fiction_id='${id}'`);
  const rating = await db.query(
    `SELECT click, love, mean AS rating FROM calculate_fiction_rating WHERE fiction_id='${id}'`);

    return {
      fiction,
      chapters,
      rating
    }
}

// END OF READ FUNCTION
// POST FUNCTION

async function create(req, res, fiction){
  try {
    const result = await db.query(
      `INSERT INTO fiction 
      (fiction_id, user_id, author, title, synopsis, tags, chapters, img_path) 
      VALUES 
      (UUID(), '${fiction.user_id}', '${fiction.author}', '${fiction.title}', '${fiction.synopsis}', '${fiction.tags}', ${fiction.chapters}, '${fiction.img_path}')`
    );
  
    let message = 'Error in creating fiction';
  
    if (result.affectedRows) {
      message = 'fiction created successfully';
    }
  
    return {message};
  } catch (err) {
    console.error('Error while creating chapter', err.message);
  throw err; // Rethrow the error for further handling in the route or middleware
  }
}

// DELETE Function

async function remove(id){
    const currentDateTime = new Date().toISOString();
    const delquery = `UPDATE fiction SET deleted_at = NOW() WHERE fiction_id='${id}'`;
    const result = await db.query( delquery );
    let message = 'Error in deleting Fiction';
  
    if (result.affectedRows) {
      message = 'Fiction deleted successfully';
    }
  
    return {message};
}
async function updateFiction(id, req, res, fiction){
  const result = await db.query(
    `UPDATE fiction 
    SET 
      author='${fiction.author}',
      title='${fiction.title}',
      synopsis='${fiction.synopsis}',
      tags='${fiction.tags}',
      chapters=${fiction.chapters},
      img_path='${fiction.img_path}', 
    updated_at=CURRENT_TIMESTAMP 
    WHERE fiction_id='${id}'` 
  );
  
  let message = 'Error in updating Fiction';

  if (result.affectedRows) {
    message = 'fiction updated successfully';
  }

  return {message};
}
module.exports = {
    getMultiple,
    getFiction,
    create,
    remove,
    updateFiction,
}
