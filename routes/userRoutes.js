const router = require("express").Router();
const { getUser } = require("../controllers/userController")


// Test route unused later
router.get("/test", (req, res) => {
    res.send("test route")
})

router.get("/", getUser)


// Export as router
module.exports = router;