const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
//const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
//const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');

const contestsRouter = express.Router();

//POST http://localhost:5000/contests
contestsRouter.post(
  '/',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

// contestsRouter.post(
//   '/dataForContest',
//   checkToken.checkToken,
//   contestController.dataForContest,
// );

//GET http://localhost:5000/contests/byCustomer
contestsRouter.get(
  '/byCustomer',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

//GET http://localhost:5000/contests/contestId
contestsRouter.get(
  '/contestId',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

module.exports = contestsRouter;
