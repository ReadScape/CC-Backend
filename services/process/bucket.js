const { Storage } = require('@google-cloud/storage');
const credFileName = 'bucket.json'
const bucketName = 'bucket-capstone-timkiki'


const storage = new Storage({
    keyFilename: credFileName
});
const bucket = storage.bucket(bucketName);

const upload = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file
    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false,
    });
    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        resolve(publicUrl)
    })
        .on('error', () => {
            reject(`Unable to upload PDF, something went wrong`)
        })
        .end(buffer)
});


module.exports = {
    upload
}