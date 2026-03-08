import express from 'express';
import { getPendingRides, acceptRide, updateRideStatus, getEarnings } from '../controllers/driver.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/pending-rides').get(protect, getPendingRides);
router.route('/ride/:id/accept').put(protect, acceptRide);
router.route('/ride/:id/status').put(protect, updateRideStatus);
router.route('/earnings').get(protect, getEarnings);

export default router;
