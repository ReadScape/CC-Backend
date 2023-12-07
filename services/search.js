// not used 

const helpler = require("../helper")
const { exec } = require('child_process');

async function search(title){
    const rows = exec('python3 process/searchRec.py', [title], (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing the calculateRating: ${error}`);
            return;
        }
        console.log(stdout);
    });

    // add a func to return the jumlah in which fiction id the same (jumlah chapter)
    const data = helper.emptyOrRows(rows);
    
    return rows.stdout
}