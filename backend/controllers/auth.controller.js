import User from '../models/User.js';
import Driver from '../models/Driver.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user/admin & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password, type } = req.body; // type can be 'user' or 'driver'

  if (type === 'driver') {
    const driver = await Driver.findOne({ email });
    if (driver && (await driver.matchPassword(password))) {
      res.json({
        _id: driver._id,
        name: driver.name,
        email: driver.email,
        type: 'driver',
        token: generateToken(driver._id, 'driver'),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        type: 'user',
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register-user
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      type: 'user',
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Register a new driver
// @route   POST /api/auth/register-driver
// @access  Public
export const registerDriver = async (req, res) => {
  const { name, email, password, plateNumber, cabType } = req.body;

  const driverExists = await Driver.findOne({ email });
  if (driverExists) {
    return res.status(400).json({ message: 'Driver already exists' });
  }

  const driver = await Driver.create({
    name, email, password,
    cabDetails: { plateNumber, type: cabType }
  });

  if (driver) {
    res.status(201).json({
      _id: driver._id,
      name: driver.name,
      email: driver.email,
      type: 'driver',
      token: generateToken(driver._id, 'driver'),
    });
  } else {
    res.status(400).json({ message: 'Invalid driver data' });
  }
};
