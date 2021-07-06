// Const for mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Declare the ReadingList Schema
const readingListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    description: String,
    image: String,
    link: String,
    authorId: {
        type: String,
        // required: true,
    }

});

// const for the ReadingList mongoose Database
const ReadingList = mongoose.model("ReadingList", readingListSchema);

// module.export it!
module.exports = ReadingList;