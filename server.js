// Required Consts!
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const { isRegExp } = require("util");


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

// More Heroku optimization
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
}


//Routes
app.use("/users", require("./routes/userRoutes"))
app.use("/readingList", require("./routes/readingListRoutes"))
app.use("/register", require("./routes/confirmRoutes"))


// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
// })

// Let the user know the server is running, and which port.  Yeay!
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});