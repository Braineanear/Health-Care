import express from 'express';

import pages from './pages.route';

const router = express.Router();

router.use('/', pages);

export default router;
