const router = require("express").Router();
const auth = require("../middleware/auth")
const { newBook, getAllReadingList, getUserReadingList, deleteBook, bookReadUnRead } = require("../controllers/readingListController")

//Post a new book to your reading list
router.post("/", auth, newBook)

//Get the reading list for display
router.get("/", auth, getUserReadingList)

//Route to delete a book
router.delete("/", auth, deleteBook)

// Route to console log if a book is Read/UnRead
router.put("/", auth, bookReadUnRead)

//Get all books for development purposes
router.get("/all", getAllReadingList)

// Export as router
module.exports = router;