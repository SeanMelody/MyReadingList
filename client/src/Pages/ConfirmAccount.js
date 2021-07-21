import React, { useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import axios from "axios"


const ConfirmAccount = (props) => {

    // const history = useHistory()

    useEffect(() => {
        // Ify async statement to use try catch
        (async () => {
            try {
                await axios.post("/register", { token: props.match.params.token })
                // history.push("/");
                console.log("props.match.params.token", props.match.params.token)
            } catch (err) {
                console.log(err)
            }
        })();

    }, [props.match.params.token])


    return (
        <div>
            <h3>Your account has been confirmed!</h3>
            <h3> Please Log In</h3>
            <h5>{props.match.params.token}</h5>
            <a href="/login">
                <button className="btn btn-success margin10">
                    Login
                </button>
            </a>
        </div>
    )
}

export default ConfirmAccount
