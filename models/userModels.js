const mongoose = require("mongoose");

// Set the user Schema, email, password, displayName, confirmed
// Need to add photo to the option
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email"]
    },
    displayName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
})

// Export as user
module.exports = User = mongoose.model("user", userSchema)