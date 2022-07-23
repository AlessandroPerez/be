var bcrypt = require('bcryptjs');
const {User} = require('../models/User');

async function hashPassword (password){
  return new Promise((resolve,reject)=> {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        resolve(hash);
      });
    });
  })
}

async function handlePostUser(name, email, username, password) {
  try {
    const hashedPassword = await hashPassword(password);
    const savedUser = await User.create({
      name: name,
      email: email,
      username: username,
      password: hashedPassword,
    });
    return savedUser.toJSON({virtuals: true});
  } catch (err) {
    return {message:err};
  }        
}


module.exports = {
    hashPassword,
    handlePostUser,
  }