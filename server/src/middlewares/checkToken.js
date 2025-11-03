// const jwt = require('jsonwebtoken');
// const CONSTANTS = require('../constants');
// const TokenError = require('../errors/TokenError');
// const userQueries = require('../controllers/queries/userQueries');

// module.exports.checkAuth = async (req, res, next) => {
//   const accessToken = req.headers.authorization;
//   if (!accessToken) {
//     return next(new TokenError('need token'));
//   }
//   try {
//     const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
//     const foundUser = await userQueries.findUser({ id: tokenData.userId });
//     res.send({
//       firstName: foundUser.firstName,
//       lastName: foundUser.lastName,
//       role: foundUser.role,
//       id: foundUser.id,
//       avatar: foundUser.avatar,
//       displayName: foundUser.displayName,
//       balance: foundUser.balance,
//       email: foundUser.email,
//     });
//   } catch (err) {
//     next(new TokenError());
//   }
// };

// module.exports.checkToken = async (req, res, next) => {
//   const accessToken = req.headers.authorization;
//   if (!accessToken) {
//     return next(new TokenError('need token'));
//   }
//   try {
//     req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
//     next();
//   } catch (err) {
//     next(new TokenError());
//   }
// };


const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries = require('../controllers/queries/userQueries');

module.exports.checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new TokenError('need token'));
  }

  // 👇 Витягуємо сам токен без "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    const tokenData = jwt.verify(token, CONSTANTS.JWT_SECRET);
    const foundUser = await userQueries.findUser({ id: tokenData.userId });

    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (err) {
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new TokenError('need token'));
  }

  // 👇 Витягуємо токен з Bearer
  const token = authHeader.split(' ')[1];

  try {
    req.tokenData = jwt.verify(token, CONSTANTS.JWT_SECRET);
    next();
  } catch (err) {
    next(new TokenError());
  }
};

