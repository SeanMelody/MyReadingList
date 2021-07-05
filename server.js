// Required Consts!
const express = require("express");
const app = express();
const mongoose = require("mongoose")


// Set up for Heroku or Port 5555 cause I'm crazy!
const PORT = process.env.PORT || 5555;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using Mongoose for MongoDB, myReadingList
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/myReadingList",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) throw err;
        console.log("Connected to myReadingList database")
    }
);

// Let the user know the server is running, and which port.  Yeay!
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});