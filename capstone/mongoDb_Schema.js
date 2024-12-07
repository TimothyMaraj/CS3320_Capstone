

const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema(
    {
        id: Number,
        title: String,
        author: String,
        publisher: String,
        ibsn: String,
        avail: Boolean,
        who: String,
        due: String
    }
);
const Book = mongoose.model('Book',bookSchema);
module.exports = Book;