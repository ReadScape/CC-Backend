const db = require("./db");
const helper = require("../helper");
const config = require("../config");


// READ 

async function getDetails(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM details LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data
    }
}

async function createDetails(a, b, c, d, e, f){
    const data = [];
    for (let i = 0; i < c.length; i++) {
        data.push({
            ori_fic_id: a[i],
            ori_chap_id: b[i],
            ori_line: c[i],
            opp_fic_id: d[i],
            opp_chap_id: e[i],
            sim_line: f[i]
        });
    }
    const result = await db.query(
        `INSERT INTO your_table_name (
            ori_fic_id, ori_chap_id, ori_line, opp_fic_id, opp_chap_id, sim_line
          ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          data.ori_fic_id,
          data.ori_chap_id,
          data.ori_line,
          data.opp_fic_id,
          data.opp_chap_id,
          data.sim_line
        ]
      );
    let message = 'Error in inserting Story Dataset';
  
    if (result.affectedRows) {
      message = 'Dataset inserted successfully';
    }
  
    return {message};
}

async function getFinal(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM final LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data
    }
}

async function createFinal(fin, opp_final){
    const result = await db.query(
      `INSERT INTO final 
      (final_plag_score, yes_or_no, verdict, ori_fic_id, opp_fic_id) 
      VALUES 
      ('${fin.final_plag_score}','${fin.yes_or_no}', '${fin.verdict}', '${fin.ori_fic_id}', '${opp_final}')`
    );
    let message = 'Error in creating the final verdict';
  
    if (result.affectedRows) {
      message = 'final verdict created ok';
    }
  
    return {message};
}

module.exports = {
    getDetails,
    getFinal,
    createDetails,
    createFinal
}