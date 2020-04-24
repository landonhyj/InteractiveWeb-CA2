const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});

mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});

require('./book.model');