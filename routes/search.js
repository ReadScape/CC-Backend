const express = require("express");
const router = express.Router();
const { exec } = require('child_process');
/// get

router.get('/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id);

        exec('python3 services/process/searchRec.py ' + id, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing the searchRec.py script: ${error}`);
                res.status(500).json({ error: error.message });
                return;
            }

            try {
                // Parse the JSON response from the Python script
                const parsedResult = JSON.parse(stdout);

                console.log('Parsed JSON:', parsedResult);

                // Send the parsed JSON as the response
                res.json(parsedResult);
            } catch (jsonError) {
                console.error(`Error parsing JSON: ${jsonError}`);
                res.status(500).json({ error: 'Error parsing JSON response' });
            }
        });
    } catch (err) {
        console.error(`Error in router.get: ${err}`);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;