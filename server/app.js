const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const product = require('./api/product');
const amd = require('./auth/middlewares');

require('dotenv').config();
const google = require('./auth/google');


// const middlewares = require('./middlewares');
// const auth = require('./auth');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
//app.use(amd.verifyJWT);


app.get('/', (req, res) => {
  res.json({
    message: 'Digital Product License Key API',
    user: req.user,
  });
});

// to incorporate authentication.
// app.use('/auth', auth);
//app.use('/auth/google', google);
// app.use('/auth/facebook', facebook);


//app.use('/api/v1/product', amd.isLoggedIn, product);
app.use('/api/v1/product', product);


// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

module.exports = app;
