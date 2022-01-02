const ReadingList = require("../models/readingListModels")

module.exports = {
    newBook: async (req, res) => {
        // console.log("book get route working")
        try {
            const newBook = new ReadingList({
                title: req.body.title,
                authors: req.body.authors,
                description: req.body.description,
                image: req.body.image,
                link: req.body.link,
                authorId: req.user,
            })
            // console.log(newBook)

            const successSave = await newBook.save()
            res.json(successSave)
            // console.log(successSave)
        } catch (err) {
            // res.send("error saving new Book: ", err)
            res.status().send("error saving new Book: ", err)
        }
        // res.send("success from controller")
    },


    // Get All Books!
    getAllReadingList: async (req, res) => {

        try {
            const all = await ReadingList.find({})
            res.json(all)
            // console.log(all)
        }
        catch (err) {
            console.log("Not able to get all books", err)
        }
    },

    getUserReadingList: async (req, res) => {
        // console.log("getuserBurritos")

        try {
            const allReadingList = await ReadingList.find({ authorId: req.user })
            res.json(allReadingList)

        } catch (err) {
            console.log(err)
            res.send("Can not get readingList", err)
        }
    },

    // Get All ReadingLists!
    getAllReadingLists: (req, res) => {

        try {
            ReadingList.find({})
                .then((all) => {
                    res.json(all)
                })
        }
        catch (err) {
            console.log("Not able to get all ReadingLists", err)
        }
    },

    bookReadUnRead: async (req, res) => {
        try {
            // console.log("ReadingListController bookReadUnread")
            console.log(req.body)
            let readId = req.body._id
            console.log(readId)
            const successRead = await ReadingList.findOneAndUpdate({ readId }, { read: true })
                .then((data) => {
                    res.json(data)
                    console.log(successRead.data)
                })

            // res.json(successRead)
            console.log("Success Read")
        }
        catch (err) {
            console.log("Not able to set book to read/unread")
        }
    },

    deleteBook: async (req, res) => {
        // console.log("hi from Reading List Controller")
        // console.log(req)
        try {
            const successSave = await ReadingList.findByIdAndDelete(req.book)
                .then((data) => {
                    res.json(data)
                })

        }
        catch (err) {
            console.log("Not able to delete Book", err)
        }

    },

}