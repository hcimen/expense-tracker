const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
};



module.exports = mongoose;