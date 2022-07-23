const express = require ('express');
var passport = require('passport');

const {handleGetPost,
    handleGetSinglePost,
    handlePostPost,
    handleRemovePost,
    handleUpdatePost, } = require('../controller/posts');

const router = express.Router();

router.use(passport.authenticate('local'));

const Post = require('../models/Posts');


// Gets back all the posts

router.get('/', async (req, res) => {
    res.json(await handleGetPost());
});

// Get back a single post

router.get('/:postId', async (req, res) =>{
    res.json(await handleGetSinglePost(req.params.postId));
});

// Submit a post

router.post('/', async (req, res) => {
    res.json(await handlePostPost(req.body.title, req.body.description));
});

// Delete a specific post

router.delete('/:postId', async (req, res) => {
    res.json(await handleRemovePost(req.params.postId));
});

// Update a specific post title

router.patch('/:postId', async (req, res) => {
    res.json(await handleUpdatePost(req.params.postId, req.body.title, req.body.description));
})


module.exports = router;