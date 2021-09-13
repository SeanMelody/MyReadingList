// Const for mongoose
const mongoose = require("mongoose");

// Declare the ReadingList Schema
const readingListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    authorId: {
        type: String,
        // required: true,
    }

});


// module.export it! as Reading List
module.exports = ReadingList = mongoose.model("ReadingList", readingListSchema);