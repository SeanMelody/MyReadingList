import React from 'react'

const Footer = (props) => {

    const deleteAccount = () => {
        console.log(props.user)
    }


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
