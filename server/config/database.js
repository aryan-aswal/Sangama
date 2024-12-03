const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('Database connection error: ', err);
        process.exit(1);
    })
}

module.exports = { dbConnect };