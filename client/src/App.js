import './App.css';
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Register from './Pages/Register';
import Login from './Pages/Login';
import Confirm from './Pages/Confirm';
import Books from './Pages/Books';
import Search from './Pages/Search';
import UserContext from './Context/UserContext'
import axios from 'axios'


function App() {

  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined
  })

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")

    if (token === null) {
      localStorage.setItem("auth-token", "")
    }
    else {
      console.log("no auth token")
    }

  }

  useEffect(() => {
    checkLoggedIn()
  })


  return (
    <div className="App">
      <h1>Reading List</h1>
      <Router>
        <Link to="/register">
          <button className="btn btn-danger margin10">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-primary margin10">Login</button>
        </Link>

        <UserContext.Provider value={{ userData, setUserData }} >
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Search} />
            <Route path="/confirm" component={Confirm} />
            <Route path="/" component={Books} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
