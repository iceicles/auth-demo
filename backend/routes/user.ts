import express from 'express';

import { authenticateUser } from '../middleware/authentication';
import { showCurrentUser } from '../controllers/user';

const router = express.Router();

// authMiddleware is executed first before dashboard is called
router.route('/showMe').get(authenticateUser, showCurrentUser)


export default router;
