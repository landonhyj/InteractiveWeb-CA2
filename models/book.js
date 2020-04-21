var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title:{ type: String, unique: true,lowercase: true, uppercase: true},
    author: String,
    year:   Number,
    price:  Number

});

module.exports = mongoose.model('Book', bookSchema);