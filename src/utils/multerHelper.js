const multer = require('multer');

const storage = multer.memoryStorage();

exports.multerUploads = (req, res, next) => {
  const uploads = multer({ storage }).fields([
    { name: 'productFrontImage' },
    { name: 'productBackImage' }
  ]);
  uploads(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.json({
          type: 'error',
          message: 'Cannot Upload more than 6 images.'
        });
      }
      console.log(err);

      return res.redirect('/dashboard');
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

exports.multerUpload = (name) => (req, res, next) => {
  const uploads = multer({ storage }).single(name);
  uploads(req, res, (err) => {
    if (err) console.log(err);
    next();
  });
};
