import React, { useState, useContext, useEffect } from 'react'
import userContext from "../Context/UserContext"
import { useHistory } from "react-router-dom"
import axios from "axios"

const Login = () => {

    const [form, setForm] = useState()

    // const { userData, setUserData } = useContext(userContext)

    const history = useHistory()

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }




    return (
        <div>
            <h1>Login</h1>
            <div className="container">
                <form>
                    <h3 className="col-md-12">Email:</h3>
                    <input onChange={onChange} type="text" name="email" className="row col-md-12"></input>

                    <h3 className="col-md-12">Password:</h3>
                    <input onChange={onChange} type="text" name="password" className="row col-md-12"></input>

                    <input type="submit" className="btn btn-primary margin10" />
                </form>
            </div>
        </div>
    )
}

export default Login
