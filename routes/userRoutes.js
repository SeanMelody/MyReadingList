const router = require("express").Router();
const auth = require("../middleware/auth");
const { register, login, getUser, deleteUser } = require("../controllers/userController");


// Test route unused later
router.get("/test", (req, res) => {
    res.send("test route")
})

// Get route to get the user
router.get("/", auth, getUser)

// Post a new user to the database at users/register
router.post("/register", register)

// router/delete to delete the user
router.delete("/", auth, deleteUser)

// users/login to get the user
router.post("/login", login)

// Export as router
module.exports = router;