const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const userRouter = require('./routers/user');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const unknownEndpoint = require('./middlewares/unknownEndpoint');

const port = process.env.PORT || 3000;

const mongo = process.env.DATABASE;

mongoose //connect
  .connect(mongo)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/', express.static(`./front/dist/`)); //heroku
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/front/dist/index.html');
});

app.get('/', (req, res) => {
  res.send('working');
});
app.use('/user', userRouter);

// unknownEndpoint handling middleware
app.use(unknownEndpoint);

// error handling middleware
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`litsening in port ${port}...`);
});
