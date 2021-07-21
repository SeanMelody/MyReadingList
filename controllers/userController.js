const User = require("../models/userModels")
const Confirm = require("../models/confirmModels")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
require("dotenv").config()

module.exports = {

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

            const newUser = new User({
                email,
                password: passwordHash,
                displayName,
            })


            // Confirm starts here
            const confirmationToken = new Confirm({
                token: crypto.randomBytes(10).toString("hex"),
                authorId: newUser._id,
            })
            // console.log(newUser._id)
            // console.log(confirmationToken.authorId)

            // Transporter for emailing confirmation link!
            // Messages sent via my throw away email: dzesean@gmail.com

            // console.log(confirmationToken)
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "dzesean@gmail.com",
                    pass: process.env.EMAILPASS,
                },
            })


            const mailOptions = {
                from: "dzesean@gmail.com",
                to: newUser.email,
                subject: "Please confirm your email for burrito maps!",
                text: `Click the link to confirm  your account! http://localhost:3000/confirm_token${confirmationToken.token}`,
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Confirm email was sent with: http://localhost:3000/confirm_token${confirmationToken.token} for authorId ${newUser._id}`)
                }
            })
            await confirmationToken.save()
            const savedUser = await newUser.save()
            console.log("controller, 82", savedUser)
            res.json(savedUser)

        } catch (err) {
            res.status(500).json({ msg: err })
        }
    },

    // Login route function
    login: async (req, res) => {
        try {
            // Deconstruct to get the email and password
            const { email, password } = req.body
            // If email or password doesn't exist, send back a 400 error
            if (!email || !password) {
                res.status(400).json({ msg: "All required fields not sent" })
            }

            // Await the database check to see if the user exists
            const user = await User.findOne({ email: email })

            // Check to see if a user or not
            if (!user) {
                res.status(400).json({ msg: "User doesn't exist" })
            }

            // Check bcrypt to see if the password matches
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.status(400).json({ msg: "Incorrect Password" })
            }

            // Set the token to the user ID generated by MongoDB
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            })

            res.json({
                token,
                user: { id: user._id, displayName: user.displayName, confirmed: user.confirmed, }
            })


        } catch (err) {
            res.status(500).json({ msg: err })
        }

    },


    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user)

            res.json({
                displayName: user.displayName,
                id: user._id,
            })
        } catch (err) {
            res.send("getUser", err.response)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deleteUser = await User.findByIdAndDelete(req.user)
            res.json(deleteUser)
        } catch (err) {
            console.log(err)
            res.send({ error: err })
        }
    }


}