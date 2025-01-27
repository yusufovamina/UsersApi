const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,  
    unique: true,    
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter valid email'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
