import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
// import ReadUnread from '../Components/ReadUnread';

const Books = () => {

    const [readingList, setReadingList] = useState([])

    const { userData } = useContext(userContext)

    const history = useHistory()



    const deleteBook = async (book) => {
        console.log(book)

        try {
            const delBook = await axios.delete("/readingList", { headers: { "x-auth-token": localStorage.getItem("auth-token") }, data: { source: book } })
            // console.log("after axios.delete")
            console.log(delBook.data)
            // notify(newBook.data.title)
        }
        catch (err) {
            console.log(err)
        }
    }

    // const notify = (book) => toast(`${book} Deleted`)


    // Set a book to Read when you hit the Mark Read Button
    const markRead = async (book) => {

        console.log(book)
        try {
            const setBookRead = await axios.put("/readingList", book, { headers: { "x-auth-token": localStorage.getItem("auth-token") }, })
            console.log("after axios.push")
            console.log(setBookRead.data)
            history.push("/welcome");
            // notify(newBook.data.title)
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }

    }
    // Set a book to UnRead when you hit the Mark UnRead Button
    const markUnRead = async (book) => {
        console.log("Mark Unread")
        console.log(book)
        try {
            const setBookUnRead = await axios.patch("/readingList", book, { headers: { "x-auth-token": localStorage.getItem("auth-token") }, })
            console.log("after axios.push")
            console.log(setBookUnRead.data)
            // notify(newBook.data.title)
        }
        catch (err) {
            console.log(err)
        }
    }

    // Delete account function
    const deleteAccount = async () => {
        // console.log(props.user)
        // Try catch to send request to Database to delete user and their books

        // confirm("Are you sure you want to delete your account?");


        try {
            await axios.delete("/users", {
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
            });
            // Push the user back to register
            history.push("/login");
        }
        // Gotta catch them errors!
        catch (err) {
            console.log(`Error deleting: ${err}`)
            console.log(err)
        }
    }

    useEffect(() => {
        if (!userData.user) {
            history.push("/welcome")
        }

        // console.log(userData.user)

        userData.user
            ? console.log(userData.user.displayName)
            : console.log("User Loading")

    }, [userData.user, history])


    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        (async () => {
            try {
                const allBooks = await axios.get("/readingList", {
                    cancelToken: source.token,
                    headers: { "x-auth-token": localStorage.getItem("auth-token") },
                })

                console.log(allBooks.data)
                setReadingList(allBooks.data)
            } catch (err) {
                console.log(err)
            }

        })()
        return () => source.cancel()
    }, [])

    return (
        <>
            <div>
                <ToastContainer />
                <h1 className="margin10">Your Reading List</h1>

                {readingList.length ? (
                    <div className="container">
                        {/* Map through the results from the Mongoose Database */}
                        {readingList.map((book) => (
                            // Set each book to a card
                            <div className="card margin10" key={book._id}>

                                <div className="card-title row justify-content-around" >
                                    <h4 className="col-md-4">{book.title}</h4>
                                    {/* Button to view the book on google books */}
                                    <button
                                        className="col-md-2 btn btn-outline-primary margin10">
                                        <a
                                            href={book.link} target="_blank" rel="noopener noreferrer"
                                        >
                                            View on Google Books
                                        </a>
                                    </button>
                                    {/* Button to call the delete book function */}
                                    <button
                                        className="col-md-2 btn btn-outline-danger margin10"
                                        onClick={() => deleteBook(book)}>Delete Book
                                    </button>
                                    {/* <ReadUnread color={book.read} /> */}
                                    {/* <button>Read: {book.read}</button> */}
                                    {book.read === false ? (
                                        <button
                                            className="col-md-2 btn btn-outline-success margin10 color"
                                            // onClick={() => readUnread(book)}>Mark as Read
                                            onClick={() => markRead(book)}>Mark as Read
                                        </button>
                                    ) :
                                        (<button
                                            className="col-md-2 btn btn-outline-info margin10 color"
                                            // onClick={() => readUnread(book)}>Mark as Read
                                            onClick={() => markUnRead(book)}>Mark as Not Read
                                        </button>)
                                    }
                                    {/* <button
                                        className="col-md-2 btn btn-outline-info margin10 color"
                                        // onClick={() => readUnread(book)}>Mark as Read
                                        onClick={() => readUnread(book.read)}>Mark as Read
                                    </button> */}
                                </div>
                                {/* Div to dispaly the card body, image, authors and description */}
                                <div className="card-body row">
                                    <img className="col-md-2 book-image" src={book.image} alt="book cover" />
                                    <h3 className="col-md-2">{book.authors}</h3>
                                    <p className="col-md-8">{book.description}</p>
                                </div>
                            </div>
                        ))}
                        {/* A break for some space */}
                        <br></br>
                    </div>
                ) : (
                    <h1>No saved books</h1>

                )
                }
            </div>
            {/* On click button to delete account */}
            <button onClick={deleteAccount} className="btn btn-danger delete-account margin10">Delete Account</button>

            {/* Confirmation Thing from Github for Alert */}
            {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } /> */}
        </>
    )
}

export default Books
