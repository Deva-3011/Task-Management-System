const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { jwtSecret } = require('../config/env');
const { createUser, findUserByEmail, findUserById } = require('../models/userModel');

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
}

const register = asyncHandler(async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: 'Valid email and password are required.' });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ email, passwordHash });
  const token = createToken(user);

  return res.status(201).json({
    token,
    user
  });
});

const login = asyncHandler(async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  return res.json({
    token: createToken(user),
    user: {
      id: user.id,
      email: user.email
    }
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json({ user });
});

module.exports = {
  register,
  login,
  me
};
