const User = require("../models/userModels")

module.exports = {

    getUser: async (req, res) => {
        try {
            res.send("Users routes")
        } catch (err) {
            res.send(err.response)
        }

        User.find({})
            .then((user) => {
                res.json(user)
            })
    },


    register: async (req, res) => {
        try {
            // Deconstruct the user object
            const { email, displayName, password, passwordCheck } = req.body

            // Make suer every field is entered
            if (!email || !displayName || !password || !passwordCheck) {
                return res.status(400).json({ msg: "Must enter in all fields" })
            }
            // Make sure password is long enough
            if (password.length < 4) {
                return res.status(400).json({ msg: "Password must be longer then 4 characters" })
            }
            // Make sure password matches PasswordCheck
            if (password !== passwordCheck) {
                return res.status(400).json({ msg: "Password must match" })
            }
            // Make sure only one email is used per user
            const existingUser = await User.findOne({ email: email })

            if (existingUser) {
                return res.status(400).json({ msg: "Must use a different Email" })
            }
            // Defaults to 15 , but can enter 10-20 (more will slow down the system)
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt)

            // Set new user to a new object to send back to the front end, email, hashed password and display name
            const newUser = new User({
                email,
                password: passwordHash,
                displayName,
            })

            console.log(newUser)
            const savedUser = await newUser.save()
            res.json(savedUser)

        } catch (err) {
            res.status(500).json({ msg: err })
        }
    },
}