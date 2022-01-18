const router = require("express").Router();
const auth = require("../middleware/auth")
const { newBook, getAllReadingList, getUserReadingList, deleteBook, bookRead, bookUnRead } = require("../controllers/readingListController")

//Post a new book to your reading list
router.post("/", auth, newBook)

//Get the reading list for display
router.get("/", auth, getUserReadingList)

// Route to delete a book
router.delete("/", deleteBook)

// Route to set a book to Read
router.put("/", auth, bookRead)

// Route to set a book to UnRead
router.patch("/", auth, bookUnRead)

//Get all books for development purposes
router.get("/all", getAllReadingList)

// Export as router
module.exports = router;