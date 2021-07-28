import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import axios from "axios"
const Books = (props) => {

    const [readingList, setReadingList] = useState([])

    const { userData } = useContext(userContext)

    const history = useHistory()

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
        </div>
    )
}

export default Books
