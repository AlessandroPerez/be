const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
require('dotenv/config');
const { hashPassword } = require('./controller/users');
const { User } = require('./models/User');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs'); 

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Passport local logic

passport.use(new LocalStrategy(
   function (username, password, done) {
      User.findOne({ username: username }, async function (err, user) {
         if (err) { return done(err); }
         if (!user) { return done(null, false); }
         const match = await bcrypt.compare(password, user.password);
         if (!match) { return done(null, false); }
         return done(null, user);
      });
   }
));

//Pssport token

passport.serializeUser(function(user, done) {
   done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
});

// Cors Middleware
app.use(cors());

// Express Session
app.use(session({
   secret: 'secret',
   saveUninitialized: true,
   resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Start listening

app.listen(process.env.PORT || 3000, () => {
   console.log('Server listening on %s port', process.env.PORT);
})

// Establishing mongoDB connection

mongoose.connect(process.env.DB_CONNECTION, () => {
   console.log('Connected to Mongo DB');
})

// Route for Home

app.get('/', (req, res) => {
   res.send('We are in Home');
});

// Importing routs

const postsRoutes = require('./routes/posts');
app.use('/posts', postsRoutes);

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Exporting app

module.exports = app;