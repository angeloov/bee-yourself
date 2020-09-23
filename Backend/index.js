const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const BzzModel = require('./models/PostSchema');
const User = require('./models/UserSchema');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: false,
  })
);
app.use(cookieParser('secretkey'));
app.use(passport.initialize());
app.use(passport.session());
require('./passport.config.js')(passport);

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

app.post('/create/bzz', [body('bzzBody').isLength({ min: 2 })], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  BzzModel.create(
    {
      beeName: req.user.username,
      bzzBody: req.body.bzzBody,
      timestamp: new Date().toLocaleString(),
    },
    err => {
      if (err) {
        console.log(err);
        next(error);
      }
    }
  );
  res.send();
  res.status(200);
});

app.post('/register', async (req, res, next) => {
  let salt = await bcrypt.genSalt(12);
  let hash = await bcrypt.hash(req.body.password, salt);

  let query = await User.findOne({ username: req.body.username }).exec();
  if (!query) {
    User.create({ username: req.body.username, password: hash }, err => {
      if (err) next(err);
    });
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'This user already exists' });
  }
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw err;
    if (!user) res.json({ success: false, flashMessage: "This user doesn't exist" });
    else {
      req.logIn(user, err => {
        if (err) throw err;
        res.json({ success: true });
      });
    }
  })(req, res, next);
});

app.get('/user', (req, res) => {
  res.json(req.user);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  process.env.NODE_ENV === 'production'
    ? res.status(500).send('Sever error! Something went wrong')
    : res.status(500).json({ errorStack: err.stack });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server was started! http://localhost:${PORT}`));
