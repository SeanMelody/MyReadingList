const Confirm = require("../models/confirmModels")
const User = require("../models/userModels")

module.exports = {
    confirmUser: async (req, res) => {
        try {
            const confirmation = await Confirm.findOne({ token: req.body.token })
            // console.log(req.body.token)
            // console.log(req.body.authorId)
            // console.log(confirmation.authorId)


            const confirmedUser = await User.findById(confirmation.authorId)

            confirmedUser.confirmed = true;

            confirmedUser.save();
            console.log(confirmedUser.confirmed)
            res.send("success")

        } catch (err) {
            console.log(err)
            res.send(err)
        }
    },

}