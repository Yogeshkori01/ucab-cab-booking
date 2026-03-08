import jwt from 'jsonwebtoken';

const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'supersecretjwtkeyforcabbookingapp', {
    expiresIn: '30d',
  });
};

export default generateToken;
