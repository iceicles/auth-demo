import express from 'express';

import { authenticateUser } from '../middleware/authentication';
import { showCurrentUser } from '../controllers/user';
import { sameOriginMiddleware } from '../middleware/same-origin';

const router = express.Router();

// authMiddleware is executed first before dashboard is called
router.route('/showMe').get(sameOriginMiddleware, authenticateUser, showCurrentUser)


export default router;
