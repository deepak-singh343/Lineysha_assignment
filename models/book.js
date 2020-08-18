//require mongoose and create schema for user
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;