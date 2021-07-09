// Import React
import React from "react";


// Declare a function for the search bar and bring in props
const SearchForm = (props) => {

    //Return the search form!
    return (
        <form className="border-dark">
            {/* Header Component here */}

            <div className="row form-group">
                <div className="col-md-9">
                    {/* Input form for searching the GoogleBooksAPI */}
                    <input
                        onChange={props.handleInputChange}
                        value={props.search}
                        name="search"
                        type="text"
                        placeholder="Search For Books"
                        className="form-control text-center border border-dark"
                        id="search"
                    />
                </div>
                {/* Button to start the search */}
                <button
                    onClick={props.handleFormSubmit} className="btn btn-outline-primary col-md-3">
                    Search
                </button>

            </div>
        </form>
    )

}

// Export to use as the Search Component
export default SearchForm