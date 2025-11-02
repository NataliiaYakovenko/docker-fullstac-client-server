const express = require('express');
const cors = require('cors');
const router = require('./router');
const handlerError = require('./handlerError/handler');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(1111111, req.method, req.url);
  next();
});

app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);


module.exports = app;
