const User = require("../models/userModels")

module.exports = {

    getUser: async (req, res) => {
        try {
            res.send("Users routes")
        } catch (err) {
            res.send(err.response)
        }

        // User.find({})
        //     .then((user) => {
        //         res.json(user)
        //     })
    },
}