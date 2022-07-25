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

/**
 * @swagger
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - writer
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The post title
 *         description:
 *           type: string
 *           description: The post description
 *         writer:
 *           type: string
 *           description: The post writer
 *         likes:
 *           type: array
 *           items:
 *              type: string
 *           description: All the users who liked a post
 */

 /**
  * @swagger
  * tags:
  *   name: Posts
  *   description: The posts managing API
  */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 */

// Gets back all the posts

router.get('/', async (req, res) => {
    res.json(await handleGetPost(req.query.page));
});

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post content by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       404:
 *         description: The post was not found
 */

// Get back a single post

router.get('/:postId', async (req, res) =>{
    res.json(await handleGetSinglePost(req.params.postId, req.user._id));
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posts'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       500:
 *         description: Some server error
 */


// Submit a post

router.post('/', async (req, res) => {
    try {
        await handlePostPost(req.body.title, req.body.description, req.user._id);
        res.redirect('/posts.html');
    } catch {
        res.redirect('/newPost.html');
    }

});

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The postId id
 * 
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */

// Delete a specific post

router.delete('/:postId', async (req, res) => {
    await handleRemovePost(req.params.postId);
    res.sendStatus(200);
});


/**
 * @swagger
 * /posts/{postId}:
 *  patch:
 *    summary: Edit the post by the id
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: postId
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Posts'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some error happened
 */

// Update a specific post title

router.patch('/:postId', async (req, res) => {
    res.json(await handleUpdatePost(req.params.postId, req.body.title, req.body.description));
})


module.exports = router;