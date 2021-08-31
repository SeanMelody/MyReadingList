// Import all the react goodness
import React from 'react'
// import { useHistory } from "react-router-dom"
// import axios from 'axios'

// Footer Component uses Props to get the user
const Footer = (props) => {
    // Use history so we can send the user back to register if they delete account
    // const history = useHistory()

    // Return the Footer Component
    return (
        // Footer fixed to the bottom of the page
        <footer className="footer">
            {/* copyright and love 2021 */}
            <h5 className="margin10">&#169; and &#9829; Sean Melody 2021</h5>

        </footer>
    )
}
// Export the component
export default Footer
