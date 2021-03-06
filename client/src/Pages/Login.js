import React, { useState, useContext, useEffect } from 'react'
import userContext from "../Context/UserContext"
import { useHistory } from "react-router-dom"
import axios from "axios"

const Login = () => {

    const [form, setForm] = useState()

    const { userData, setUserData } = useContext(userContext)

    const history = useHistory()

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submitLoginForm = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post("/users/login", form)
            console.log(data)

            if (!data.user.confirmed) {
                history.push("/confirm")
                console.log("not confirmed")
            } else {
                console.log("confirmed")
                setUserData({
                    token: data.token,
                    user: data.user,
                    email: data.email
                })
                // console.log(userData)

                localStorage.setItem("auth-token", data.token)
                history.push("/welcome")
            }


        }

        catch (err) {
            console.log("login error", err.response)
        }
    }

    useEffect(() => {
        // console.log(userData)
        if (userData.user) history.push("/")
    }, [userData.user, history])



    return (
        <div className="sign-ins">
            <h1 className="marginTop">Login</h1>
            <div className="container text-center justify-content-center space-large">
                <form onSubmit={submitLoginForm}>
                    <h3 className="col-md-12 marginTop">Email:</h3>
                    <div className="row justify-content-center">
                        <input onChange={onChange} type="text" name="email" className="col-md-6 text-center input-space"></input>
                    </div>
                    <h3 className="col-md-12 marginTop">Password:</h3>
                    <div className="row justify-content-center">
                        <input onChange={onChange} type="text" name="password" className="col-md-6 text-center input-space"></input>
                    </div>
                    <input type="submit" className="btn btn-primary button-spacing border-dark" />
                </form>
            </div>
        </div >
    )
}

export default Login
