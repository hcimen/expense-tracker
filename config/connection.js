const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};



module.exports = mongoose;