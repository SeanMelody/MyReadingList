import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import axios from "axios"
const Books = () => {

    const [readingList, setReadingList] = useState([])

    const { userData } = useContext(userContext)

    const history = useHistory()


    const deleteBook = (book) => {
        console.log(book)
    }

    useEffect(() => {
        if (!userData.user) {
            history.push("/login")
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
        <div>
            <h1>Your Reading List (Home)</h1>

            {readingList.length ? (
                <div className="container">
                    {/* Map through the results from the Mongoose Database */}
                    {readingList.map((book) => (
                        // Set each book to a card
                        <div className="card" key={book._id}>
                            <div className="card-title row justify-content-around" >
                                <h4 className="col-md-5">{book.title}</h4>
                                {/* Button to view the book on google books */}
                                <button
                                    className="btn btn-outline-primary">
                                    <a
                                        href={book.link} target="_blank" rel="noopener noreferrer"
                                    >
                                        View on Google Books
                                            </a>
                                </button>
                                {/* Button to call the delete book function */}
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => deleteBook(book)}>Delete Book
                                        </button>

                            </div>
                            {/* Div to dispaly the card body, image, authors and descrioption */}
                            <div className="card-body row">
                                <img className="col-md-2" src={book.image} alt="book cover" />
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
    )
}

export default Books
