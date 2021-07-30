// Import all the react goodness
import React from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'

// Footer Component uses Props to get the user
const Footer = (props) => {
    // Use history so we can send the user back to register if they delete account
    const history = useHistory()

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

    // Return the Footer Component
    return (
        // Footer fixed to the bottom of the page
        <footer className="footer fixed-bottom">
            {/* copyright and love 2021 */}
            <h5 className="margin10">&#169; and &#9829; Sean Melody 2021</h5>
            {/* On click button to delete account */}
            <button onClick={deleteAccount} className="btn btn-danger margin10">Delete Account</button>
        </footer>
    )
}
// Export the component
export default Footer
