const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
var cors = require('cors');


const app = express();

app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/datadatabasebase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully!');
});


const User = require('./db/userSchema');
const Item = require('./db/itemSchema');


require('./db/usersBootstrapper')();
require('./db/itemsBootstrapper')();


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


passport.use('local', new localStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
      if (err) return done('Hiba lekeres soran', null);
      if (!user) return done('Nincs ilyen felhasználónév', null);
      user.comparePasswords(password, function (error, isMatch) {
          if (error) return done(error, false);
          if (!isMatch) return done('Hibas jelszo', false);
          return done(null, user);
      })
  })
}));

passport.serializeUser(function (user, done) {
  if (!user) return done('nincs megadva beléptethető felhasználó', null);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  return done(null, user);
});

app.use(expressSession({ secret: 'prf2023lassananodejsvegereerunk', resave: true }));
app.use(passport.initialize());
app.use(passport.session());



app.use('/api/users', require('./usersRouter'));
app.use('/api/items', require('./itemsRouter'));

app.use('', express.static('public'))


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})