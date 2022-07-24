const {Post} = require('../models/Posts');
const {getUserById} = require('./users');

// Gets back all the posts

async function handleGetPost(page){
   try{
    const posts = await Post.find({},null,{skip: 5*page, limit: 5}).sort({_id:-1});
    return await Promise.all(posts.map(async (post) => {
      const user = await getUserById(post.writer);
      return {...(post.toJSON({virtuals: true})), writer: user.toJSON({virtuals: true})};
    }));
  } catch (err) {
    return {message:err};
  }
}

// Get back a single post

async function handleGetSinglePost(postId, utente){
  try{
    let owner = false;
    const post = await Post.findById(postId);
    const user = await getUserById(post.writer);
    if (post.writer.toString() == utente) {
      owner = true;
    }
    return {...(post.toJSON({virtuals: true})), writer: user.toJSON({virtuals: true}),owner};
 } catch (err) {
   return {message:err};
 }
}

// Submit a post

async function handlePostPost(title, description, writer){  
  try{
    const savedPost = await Post.create({
      title: title,
      description: description,
      writer: writer,
    });
    return savedPost.toJSON({virtuals: true});
  } catch (err) {
    return {message:err};
  }
}

// Delete a specific post

async function handleRemovePost(postId){
  try{
    return Post.deleteOne({_id: postId});
  } catch (err) {
    return {message:err};
  }
}

// Update a specific post title

async function handleUpdatePost(postId, title, description){
  try{
    let setter = {};
    
    if (title) setter.title = title;
    if (description) setter.description = description;
    const updatedPost = await Post.findByIdAndUpdate(postId, setter, {returnDocument: 'after'});
    return updatedPost.toJSON({virtuals: true});
 } catch (err) {
   return {message:err};
 }
}



module.exports = {
  handleGetPost,
  handleGetSinglePost,
  handlePostPost,
  handleRemovePost,
  handleUpdatePost,
}