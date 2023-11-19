const { Storage } = require('@google-cloud/storage');
const credFilename = 'bucket.json'
const bucketName = 'bucket-capstone-timkiki' 


const storage = new Storage({
 keyFilename: credFilename
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
   console.log(publicUrl);
   resolve(publicUrl)
 })
   .on('error', (err) => {
    console.error('Error during upload:', err);
     reject(`Unable to upload image, something went wrong`)
   })
   .end(buffer)
});


module.exports = {
  upload
}