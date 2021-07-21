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
            console.log(form)
            const newUser = await axios.post("/users/register", form);
            console.log(newUser)
            history.push("/login")
        } catch (err) {
            console.log(err.response)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <div className="container">
                <form onSubmit={submit}>
                    <h3>Email</h3>
                    <input onChange={onChange} type="text" name="email" className="row col-md-12"></input>
                    <h3>User Name</h3>
                    <input onChange={onChange} type="text" name="displayName" className="row col-md-12"></input>
                    <h3>Password</h3>
                    <input onChange={onChange} type="text" name="password" className="row col-md-12"></input>
                    <h3>Please Re-type your password</h3>
                    <input onChange={onChange} type="text" name="passwordCheck" className="row col-md-12"></input>

                    <input type="submit" className="btn btn-primary margin10" />
                </form>
            </div>
        </div>
    )
}

export default Register
