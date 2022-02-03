import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from "axios"

const Register = () => {

    const [form, setForm] = useState()

    const history = useHistory()

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submit = async (e) => {
        e.preventDefault()
        // console.log(form)

        try {
            // console.log(form)
            await axios.post("/users/register", form);
            // const newUser = await axios.post("/users/register", form);
            // console.log(newUser)
            history.push("/login")
        } catch (err) {
            console.log(err.response)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <div className="container text-center justify-content-center space-large">
                <form onSubmit={submit}>
                    <h3 className="col-md-12 marginTop">Email</h3>
                    <div className="row justify-content-center">
                        <input onChange={onChange} type="text" name="email" className="row col-md-6 text-center input-space"></input>
                    </div>
                    <h3 className="col-md-12 marginTop">User Name</h3>
                    <div className="row justify-content-center">
                        <input onChange={onChange} type="text" name="displayName" className="row col-md-6 text-center input-space"></input>
                    </div>
                    <h3 className="col-md-12 marginTop">Password</h3>
                    <div className="row justify-content-center">
                        <input onChange={onChange} type="text" name="password" className="row col-md-6 text-center input-space"></input>
                    </div>
                    <h3 className="col-md-12 marginTop">Please Re-type your password</h3>
                    <div className="row justify-content-center">
                        <input onChange={onChange} type="text" name="passwordCheck" className="row col-md-6 text-center input-space"></input>
                    </div>
                    <input type="submit" className="btn btn-primary button-spacing border-dark" />
                </form>
            </div>
        </div>
    )
}

export default Register
