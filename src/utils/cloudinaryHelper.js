const cloudinary = require('cloudinary');
const dotEnv = require('dotenv');

dotEnv.config({ path: 'config.env' });

// Setting The Cloudinary Configurations
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

exports.destroy = (PublicID) =>
  cloudinary.v2.uploader.destroy(PublicID, (err, des) => des);

exports.uploadFiles = (file, folder) =>
  cloudinary.v2.uploader.upload(file, { folder });
