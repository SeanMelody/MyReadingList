const mongoose = require("mongoose");

// Confirmation token issued from the email link
const confirmSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    }
})


module.exports = Confirm = mongoose.model("confirm", confirmSchema)