import express from 'express';

import { auth as authMiddleware } from '../middleware/authentication';
import { dashboard } from '../controllers/dashboard';

const router = express.Router();

// authMiddleware is executed first before dashboard is called
router.route('/dashboard').get(authMiddleware, dashboard)


export default router;
