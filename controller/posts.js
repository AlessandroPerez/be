const {Post} = require('../models/Posts');

// Gets back all the posts

async function handleGetPost(){
   try{
    const posts = await Post.find();
    return posts.map(post => {
      return post.toJSON({virtuals: true});
    });
  } catch (err) {
    return {message:err};
  }
}

// Get back a single post

async function handleGetSinglePost(postId){
  try{
    const post = await Post.findById(postId);
    return post.toJSON({virtuals: true});
 } catch (err) {
   return {message:err};
 }
}

// Submit a post

async function handlePostPost(title, description){  
  try{
    const savedPost = await Post.create({
      title: title,
      description: description,
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