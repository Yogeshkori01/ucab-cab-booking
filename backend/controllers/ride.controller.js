import Ride from '../models/Ride.js';
import Driver from '../models/Driver.js';

// @desc    Book a new cab ride
// @route   POST /api/rides
// @access  Private/User
export const bookRide = async (req, res) => {
  const { pickupLocation, dropLocation, cabTypeRequested } = req.body;

  // Simple fare calculation based on cab type
  let fare = 100; // Base fare
  if (cabTypeRequested === 'Sedan') fare = 150;
  if (cabTypeRequested === 'SUV') fare = 200;

  const ride = await Ride.create({
    user: req.user._id,
    pickupLocation,
    dropLocation,
    cabTypeRequested,
    fare,
    status: 'pending'
  });

  if (ride) {
    res.status(201).json(ride);
  } else {
    res.status(400).json({ message: 'Invalid ride data' });
  }
};

// @desc    Get user's ride history
// @route   GET /api/rides/my-rides
// @access  Private/User
export const getMyRides = async (req, res) => {
  const rides = await Ride.find({ user: req.user._id }).populate('driver', 'name cabDetails.plateNumber');
  res.json(rides);
};

// @desc    Cancel a ride
// @route   PUT /api/rides/:id/cancel
// @access  Private/User
export const cancelRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (ride && ride.user.toString() === req.user._id.toString()) {
    if (ride.status === 'completed') {
       return res.status(400).json({ message: 'Cannot cancel a completed ride' });
    }
    ride.status = 'cancelled';
    const updatedRide = await ride.save();
    res.json(updatedRide);
  } else {
    res.status(404).json({ message: 'Ride not found or unauthorized' });
  }
};

// @desc    Track ride status
// @route   GET /api/rides/:id
// @access  Private/User
export const getRideById = async (req, res) => {
  const ride = await Ride.findById(req.params.id).populate('driver', 'name cabDetails.plateNumber location');

  if (ride) {
    res.json(ride);
  } else {
    res.status(404).json({ message: 'Ride not found' });
  }
};
