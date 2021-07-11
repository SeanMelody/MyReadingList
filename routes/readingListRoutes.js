const router = require("express").Router();
const { newBook, getAllReadingList } = require("../controllers/readingListController")

//Post a new book to your reading list

//Get the reading list for display



//Get all books for development purposes
router.get("/all", getAllReadingList)