import User from '../models/User.js';
import Driver from '../models/Driver.js';
import Ride from '../models/Ride.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

// @desc    Get all drivers
// @route   GET /api/admin/drivers
// @access  Private/Admin
export const getDrivers = async (req, res) => {
  const drivers = await Driver.find({}).select('-password');
  res.json(drivers);
};

// @desc    Get all rides
// @route   GET /api/admin/rides
// @access  Private/Admin
export const getRides = async (req, res) => {
  const rides = await Ride.find({}).populate('user', 'name email').populate('driver', 'name email');
  res.json(rides);
};
