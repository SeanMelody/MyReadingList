import React, { useState } from 'react'
import axios from "axios"

const Register = () => {

    const [form, setForm] = useState()

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(form)

        // try {
        //     await axios.post("/users/register", form);
        //     history.push("/")
        // } catch (err) {
        //     console.log(err.response)
        // }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={submit} className="container">
                <h3>Email</h3>
                <input onChange={onChange} type="text" name="email" className="row col-md-12"></input>
                <h3>User Name</h3>
                <input onChange={onChange} type="text" name="password" className="row col-md-12"></input>
                <h3>Password</h3>
                <input onChange={onChange} type="text" name="passwordCheck" className="row col-md-12"></input>
                <h3>Please Re-type your password</h3>
                <input onChange={onChange} type="text" name="displayName" className="row col-md-12"></input>
                <input type="submit" className="btn btn-primary margin10" />
            </form>
        </div>
    )
}

export default Register
