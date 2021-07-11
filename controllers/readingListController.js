const ReadingList = require("../models/readingListModels")

module.exports = {
    newBook: async (req, res) => {
        // console.log("newBurrito get route working")
        try {
            const newBook = new ReadingList({
                title: req.body.title,
                authors: [req.body.authors],
                description: req.body.description,
                image: req.body.image,
                link: req.body.link,
                authorId: req.user,
            })

            const successSave = await newBook.save()
            res.json(successSave)
        } catch (err) {
            res.send("error saving new Book: ", err)
        }
        // res.send("success from controller")
    },

}