import express from 'express';
import { bookRide, getMyRides, cancelRide, getRideById } from '../controllers/ride.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/').post(protect, bookRide);
router.route('/my-rides').get(protect, getMyRides);
router.route('/:id').get(protect, getRideById);
router.route('/:id/cancel').put(protect, cancelRide);

export default router;
