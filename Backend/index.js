const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const BzzModel = require('./models/PostSchema');

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API! 🥳🎉' });
});

app.get('/getall/bzz', (req, res) => {
  BzzModel.find().then(data => res.send(data));
});

app.post(
  '/create/bzz',
  [
    body('beeName').isLength({ min: 4 }),
    body('bzzBody').isLength({ min: 2 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    BzzModel.create(
      {
        beeName: req.body.beeName,
        bzzBody: req.body.bzzBody,
        timestamp: (new Date()).toLocaleString()
      },
      err => {
        if (err) console.log(err);
      }
    );
    res.status(200);
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`The server was started! http://localhost:${PORT}`)
);
