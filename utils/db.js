const mongoose = require('mongoose');
require('dotenv').config();

//const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/dev-zone-api';
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/dev-zone-api';
mongoose.set('strictQuery', true); // to delete warning mongoose deprecated version 7
const connect = () => mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    DB_URL,
    connect
};