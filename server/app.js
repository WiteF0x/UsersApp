const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const userTypesRoute = require('./routes/types');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

app.use('/users', usersRoute);
app.use('/auth', authRoute)
app.use('/types', userTypesRoute);

app.get('/', (req, res) => {
  res.send('Home');
})

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => console.log('DB Connected')
);

app.listen(8000)