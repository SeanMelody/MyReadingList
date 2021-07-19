const router = require("express").Router()
const { confirmUser } = require("../controllers/ConfirmController")

// Confirm the user route
router.post("/", confirmUser)

module.exports = router;