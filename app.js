const express = require('express');
const mongoose = require('mongoose');
const verify = require('./verifyToken');
const cors = require('cors');

// config envrionment variables
require('dotenv/config');

const app = express();

// cors config
app.use(cors());

// json body parser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// connect to mongodb
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true} );

// Import routes
const authUsers = require('./routes/authUser');
const formsRoute = require('./routes/form');
const psychologistsRoute = require('./routes/psy');
const registerPsy = require('./routes/registerPsy');


// define base endpoints
app.use('/api/', authUsers);
app.use('/api/psy/form', verify, formsRoute);
app.use('/api/psy', verify, psychologistsRoute);
app.use('/api/registerPsy', verify, registerPsy);

app.get('/test', (req,res) => {
  res.status(200).send("Test");
});

// start server on port 3000
app.listen(process.env.PORT || 3000);