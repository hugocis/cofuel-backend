const jwt = require('jsonwebtoken');
const config = require('../config');
const { isTokenBlacklisted } = require('../tokenBlacklist');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('No token provided');
  }

  if (isTokenBlacklisted(token)) {
    return res.status(403).send('Token is invalidated');
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
