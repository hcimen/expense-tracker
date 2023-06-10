const mongoose = require('mongoose');
const { User, Transaction, userSchema } = require('../models/user-model');
const dotenv = require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
  try{
  await mongoose.connect(`${process.env.DB_URL}`);
  console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }

mongoose.model('User', userSchema);

await mongoose.model('User').findOne();
};

module.exports = mongoose;