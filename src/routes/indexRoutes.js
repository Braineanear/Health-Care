const express = require('express');

const {
  homePage,
  contactPage,
  errorPage,
  productsPage,
  productPage
} = require('../controllers/indexController.js');

const {
  authPage,
  login,
  register,
  logout
} = require('../controllers/authController.js');

const router = express.Router();

router.route('/').get(homePage);
router.route('/404').get(errorPage);
router.route('/auth').get(authPage);
router.route('/contact').get(contactPage);
router.route('/products/:name').get(productsPage);
router.route('/products/:company/:name').get(productPage);

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);

module.exports = router;
