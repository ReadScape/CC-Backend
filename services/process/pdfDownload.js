const { response } = require('express');
const https = require('https');

async function downloadPdf(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !==200) {
                reject(new Error(`Failed to fetch PDF. Status Code: ${response.statusCode}`));
                return;
            }

            const chunks = [];
            response.on('data', (chunk) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', (error) => reject(error));
    });
}

module.exports = {
    downloadPdf
};