const { exec } = require('child_process');

async function fypScript(id) {
    return  new Promise((resolve, reject) => {
        exec('python3 services/process/Fanfiction_RecSys/main.py',[id], (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing the main.py script: ${error}`);
                reject(error);
                return;
            }

            try {
                const parsedResult = JSON.parse(stdout);
                resolve(parsedResult);
            } catch (jsonError) {
                console.error(`Error parsing JSON: ${jsonError}`);
                reject(jsonError);
            }
        });
    });
}

module.exports = { fypScript };