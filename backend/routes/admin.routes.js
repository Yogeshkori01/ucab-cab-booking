import express from 'express';
import { getUsers, getDrivers, getRides } from '../controllers/admin.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/users').get(protect, admin, getUsers);
router.route('/drivers').get(protect, admin, getDrivers);
router.route('/rides').get(protect, admin, getRides);

export default router;
