import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from "axios"


const ConfirmAccount = (props) => {

    const history = useHistory()

    useEffect(() => {
        // Ify async statement to use try catch
        (async () => {
            try {
                await axios.post("/register", { token: props.match.params.token })
                history.push("/");
                console.log("props.match.params.token", props.match.params.token)
            } catch (err) {
                console.log(err)
            }
        })();

    }, [history, props.match.params.token])


    return (
        <div>
            Your account is confirmed {props.match.params.token}
            <button className="btn">Return to Home</button>
        </div>
    )
}

export default ConfirmAccount
