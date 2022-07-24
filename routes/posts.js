const express = require ('express');
var passport = require('passport');

const {handleGetPost,
    handleGetSinglePost,
    handlePostPost,
    handleRemovePost,
    handleUpdatePost, } = require('../controller/posts');
const { checkAuthenticated } = require('../authentication');
const router = express.Router();

router.use(checkAuthenticated);

const Post = require('../models/Posts');


// Gets back all the posts

router.get('/', async (req, res) => {
    res.json(await handleGetPost(req.query.page));
});

// Get back a single post

router.get('/:postId', async (req, res) =>{
    res.json(await handleGetSinglePost(req.params.postId, req.user._id));
});

// Submit a post

router.post('/', async (req, res) => {
    try {
        await handlePostPost(req.body.title, req.body.description, req.user._id);
        res.redirect('/posts.html');
    } catch {
        res.redirect('/newPost.html');
    }

});

// Delete a specific post

router.delete('/:postId', async (req, res) => {
    await handleRemovePost(req.params.postId);
    res.sendStatus(200);
});

// Update a specific post title

router.patch('/:postId', async (req, res) => {
    res.json(await handleUpdatePost(req.params.postId, req.body.title, req.body.description));
})


module.exports = router;