import React, { useEffect } from 'react'

const Books = (props) => {


    const { savedBooks, getBooks } = props

    useEffect(() => {
        getBooks()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>Your Reading List (Home)</h1>
        </div>
    )
}

export default Books
