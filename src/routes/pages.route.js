import express from 'express';
import { homePage, contactPage } from '../controllers/pages.controller.js';

const router = express.Router();

router.get('/', homePage);
// router.get('/about', aboutPage);
// router.get('/services', servicesPage);
// router.get('/products', productsPage);
// router.get('/product/:category/:id', productPage);
router.get('/contact', contactPage);

export default router;
