const sharp = require('sharp');

exports.resizeImage = async (buffer) =>
  await sharp(buffer)
    .resize({
      fit: sharp.fit.contain
    })
    .webp({ lossless: true })
    .toBuffer();

exports.editImage = async (buffer) =>
  await sharp(buffer).webp({ lossless: true }).toBuffer();
