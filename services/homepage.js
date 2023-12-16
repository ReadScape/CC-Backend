const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const fyp = require("./fyp");


async function getHome(){
    const rows = await db.query(
        `SELECT f.*, fr.rating
        FROM fiction f
        JOIN fiction_rating fr ON f.fiction_id = fr.fiction_id
        ORDER BY fr.rating DESC LIMIT 10`
    );

    const best_seller = helper.emptyOrRows(rows);
    const { fiction_id } = await fyp.fypScript();
    const query = `
    SELECT f.*, fr.rating
    FROM fiction f
    JOIN fiction_rating fr ON f.fiction_id = fr.fiction_id
    WHERE f.fiction_id IN (${Object.values(fiction_id).map(value => `'${value}'`).join(',')})
    ORDER BY fr.rating DESC;
    `
    console.log(query)
    const recommendation = await db.query(
        query
    )
    console.log(recommendation);
    return {
        best_seller,
        recommendation
    }
}


module.exports = {
    getHome
}