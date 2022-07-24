var express  = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User');
const { handlePostUser } = require('../controller/users');
const { checkAuthenticated } = require('../authentication');

const router = express.Router();

// Register User
router.post('/register',async function(req, res){
    try {
        await handlePostUser(req.body.name, req.body.email, req.body.username, req.body.password);
        res.redirect('/login.html');
    } catch {
        res.redirect('/register.html');
    }

});


// Endpoint to login
router.post('/login',
    passport.authenticate('local'),
    checkAuthenticated,
    function(req, res) {
        try {
            res.redirect('/posts.html');
        } catch {
            res.redirect('/login.html');
        }
    }
);

// Endpoint to get current user
router.get('/user', function(req, res){
    res.send(req.user);
})


// Endpoint to logout
router.get('/logout', function(req, res){
    req.logout();
    res.send(null)
});

module.exports = router;