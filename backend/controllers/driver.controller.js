import Ride from '../models/Ride.js';
import Driver from '../models/Driver.js';

// @desc    Get all pending rides matching driver's cab type
// @route   GET /api/drivers/pending-rides
// @access  Private/Driver
export const getPendingRides = async (req, res) => {
  const rides = await Ride.find({ 
    status: 'pending', 
    cabTypeRequested: req.driver.cabDetails.type 
  }).populate('user', 'name');
  
  res.json(rides);
};

// @desc    Accept a ride
// @route   PUT /api/drivers/ride/:id/accept
// @access  Private/Driver
export const acceptRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  if (ride.status !== 'pending') {
    return res.status(400).json({ message: 'Ride is no longer available' });
  }

  ride.status = 'accepted';
  ride.driver = req.driver._id;
  const updatedRide = await ride.save();

  // Update driver availability
  const driver = await Driver.findById(req.driver._id);
  driver.isAvailable = false;
  await driver.save();

  res.json(updatedRide);
};

// @desc    Update ride status (e.g. to 'completed')
// @route   PUT /api/drivers/ride/:id/status
// @access  Private/Driver
export const updateRideStatus = async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  const { status } = req.body;

  if (ride && ride.driver.toString() === req.driver._id.toString()) {
    ride.status = status;
    const updatedRide = await ride.save();

    if (status === 'completed') {
        const driver = await Driver.findById(req.driver._id);
        driver.earnings += ride.fare;
        driver.isAvailable = true;
        await driver.save();
    }

    res.json(updatedRide);
  } else {
    res.status(404).json({ message: 'Ride not found or unauthorized' });
  }
};

// @desc    View earnings
// @route   GET /api/drivers/earnings
// @access  Private/Driver
export const getEarnings = async (req, res) => {
  const driver = await Driver.findById(req.driver._id);
  if (driver) {
    res.json({ earnings: driver.earnings, name: driver.name });
  } else {
    res.status(404).json({ message: 'Driver not found' });
  }
};
