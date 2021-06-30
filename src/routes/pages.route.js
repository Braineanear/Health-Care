import express from 'express';
import {
  homePage,
  contactPage,
  productsPage,
  productPage
} from '../controllers/pages.controller';

const router = express.Router();

router.get('/', homePage);
// router.get('/about', aboutPage);
// router.get('/services', servicesPage);
router.get('/products', productsPage);
router.get('/product-details', productPage);
router.get('/contact', contactPage);

export default router;
