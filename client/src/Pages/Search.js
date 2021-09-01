// Import all the necessary goodness!
import React, { Component } from 'react'
import SearchForm from "../Components/SearchForm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../utils/API"
import axios from "axios"

// Export default here instead of below!
export default class Search extends Component {

    // Set state for the API results, and the search form!
    state = {
        result: [],
        search: ""
    }


    // Search Books function for using the API to search for books
    searchBooks = query => {
        API.APISearch(query)
            .then(res => {
                // Set the results to state
                this.setState({ result: res.data.items })
                //console.log it so I know what is returned
                // console.log(res.data.items)
            })
            // Gotta catch them errors!
            .catch(err => console.log(err));
    };

    // Handle input change to get the data from the search bar and make it render
    handleInputChange = event => {
        // Set value and name to state
        const value = event.target.value;
        const name = event.target.name;
        // Set the state
        this.setState({
            [name]: value
        });
    };

    // When the form is submitted, search the API for the value of `this.state.search`
    handleFormSubmit = event => {
        // Gotta prevent the default!
        event.preventDefault();
        // call the searchBooks function!
        this.searchBooks(this.state.search);
        // Console log what is searched
        // console.log(this.state.search)
    };

    // Render all the data using React!
    render() {

        // Save book to the Mongoose database
        const saveBook = async (book) => {

            console.log(book)
            let newSave = {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks.smallThumbnail,
                link: book.volumeInfo.previewLink
            }
            try {
                const newBook = await axios.post("/readingList", newSave, { headers: { "x-auth-token": localStorage.getItem("auth-token") }, })
                console.log(newBook.data)
                notify(newBook.data.title)
            }
            catch (err) {
                console.log(err)
            }
            // Send fetch request to post it to the database
            // fetch(`/readingList`, {
            //     method: 'POST',
            //     body: JSON.stringify(newSave),
            //     headers: { "Content-Type": "application/json" }
            // })
            //     // json that response and let the user know that it was saved
            //     .then((response) => response.json())
            //     .then((data) => {
            //         console.log(data)
            //         // console.log(`${book.volumeInfo.title} saved`)
            //         // notify(`${book.volumeInfo.title} saved`)
            //     })
        }
        const notify = (book) => toast(`${book} Saved`)
        //Return it all
        return (
            <div>
                <ToastContainer />
                {/* Search form so user can search books */}
                <SearchForm
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                {/* Statement to display something different if nothing has been searched for yet */}
                {this.state.result.length ? (
                    <div className="container">
                        {/* Map through the API results */}
                        {
                            this.state.result.map(book =>
                                <div className="card margin10" key={book.id}>
                                    <div className="card-title row justify-content-around">
                                        <h4 className="col-md-5">{book.volumeInfo.title}</h4>
                                        {/* Button to view the book on googlebooks */}
                                        <button className="btn btn-outline-danger links margin10">
                                            <a className="links"
                                                href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                                                View on Google Books
                                            </a>
                                        </button>
                                        {/* Button to save the book to the database */}
                                        <button
                                            className="btn btn-outline-success margin10"
                                            onClick={() => saveBook(book)} >Save Book
                                        </button>
                                    </div>
                                    {/* Display each book */}
                                    <div className="card-body row">
                                        <img className="col-md-2 book-image" src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`} alt="book cover" />
                                        <h5 className="col-md-2">{book.volumeInfo.authors}</h5>
                                        <p className="col-md-8">{book.volumeInfo.description}</p>

                                    </div>

                                </div>


                            )
                        }
                        < br ></br>

                    </div>
                ) : (
                    // Display this if there are no saved books yet
                    <h1 className="space-large no-books">Search for a book and they will display here</h1>
                )}

            </div >
        )
    }
}
