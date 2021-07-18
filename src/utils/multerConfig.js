const multer = require('multer');

const storage = multer.memoryStorage();

const multerUploads = (req, res, next) => {
  const uploads = multer({ storage }).fields([{ name: 'images', maxCount: 6 }]);
  uploads(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.json({
          type: 'error',
          message: 'Cannot Upload more than 6 images.'
        });
      }
      console.log(err);

      return res.redirect('/dashboard/sliderContent');
    }
    if (err) {
      console.log(`ERR: ${err}`);
      return res.json({
        type: 'error',
        message: 'Something Went Wrong, Pleaase Try Again Later.'
      });
    }
    // Everything went fine.
    next();
  });
};

module.exports = multerUploads;
