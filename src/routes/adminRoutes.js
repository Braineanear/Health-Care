const express = require('express');

const {
  dashboard,
  company,
  product
} = require('../controllers/adminController');

const {
  getAllCompanies,
  createNewCompanyLink,
  createNewCompanyPage,
  deleteCompany
} = require('../controllers/companyController');

const {
  getAllProducts,
  createNewProduct,
  uploadSecondImage,
  deleteProduct
} = require('../controllers/productController');

const admin = require('../middlewares/admin');
const { multerUploads, multerUpload } = require('../utils/multerHelper');

const router = express.Router();

router.use(admin);

router.get('/', dashboard);
router.get('/company', company);
router.get('/product', product);

router.route('/company/data').get(getAllCompanies);

router
  .route('/company/data/link')
  .post(multerUpload('companyLinkImage'), createNewCompanyLink);
router
  .route('/company/data/page')
  .post(multerUpload('companyPageImage'), createNewCompanyPage);

router.route('/company/data/:id').delete(deleteCompany);

router
  .route('/product/data')
  .get(getAllProducts)
  .post(multerUploads, createNewProduct);

router.route('/product/data/second').post(multerUploads, uploadSecondImage);
router.route('/product/data/:id').delete(deleteProduct);

module.exports = router;
