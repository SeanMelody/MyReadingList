import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import userContext from "../Context/UserContext"
import axios from 'axios'

const Footer = (props) => {

    // const { userData, setUserData } = useContext(userContext)

    const history = useHistory()

    const deleteAccount = async () => {
        console.log(props.user)
        try {
            await axios.delete("/users", {
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
            });

            history.push("/login");
        } catch (err) {
            console.log(`Error deleting: ${err}`)
            console.log(err)
        }
    }



    // Use effect to make sure the user is signed in, and if not, then send to login
    // useEffect(() => {
    //     if (!userData.user) {
    //         history.push("/login")
    //     }

    //     // console.log(userData.user)

    //     userData.user
    //         ? console.log(userData.user.displayName)
    //         : console.log("User loading")

    // }, [userData.user, history])

    return (
        <footer className="footer fixed-bottom">
            {/* <hr></hr> */}
            {/* copyright and love 2021 */}
            <h5 className="margin10">&#169; and &#9829; Sean Melody 2021</h5>
            <button onClick={deleteAccount} className="btn btn-danger margin10">Delete Account</button>
        </footer>
    )
}

export default Footer
