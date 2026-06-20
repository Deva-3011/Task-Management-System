const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = {
      id: payload.id,
      email: payload.email
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = authenticate;
