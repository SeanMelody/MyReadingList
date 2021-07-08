const router = require("express").Router();
const { getUser, register } = require("../controllers/userController")


// Test route unused later
router.get("/test", (req, res) => {
    res.send("test route")
})

// Get route to get the user
router.get("/", getUser)


// Post a new user to the database at users/register
router.post("/register", register)


// Export as router
module.exports = router;