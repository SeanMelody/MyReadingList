import './App.css';
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Welcome from './Pages/Welcome';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Confirm from './Pages/Confirm';
import ConfirmAccount from './Pages/ConfirmAccount'
import Books from './Pages/Books';
import Search from './Pages/Search';
import Footer from './Components/Footer'
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
    // If no auth token, call the database and set the userData
    else {
      try {
        const userRes = await axios.get("/users", {
          headers: { "x-auth-token": token },
        })
        console.log("app.js", userRes.data)
        setUserData({ token, user: userRes.data })
      } catch (err) {
        console.log("User must log in")
      }
    }

  }

  const logout = () => {
    setUserData({ token: undefined, user: undefined })
    localStorage.setItem("auth-token", "")
  }

  useEffect(() => {
    checkLoggedIn()
  }, [])


  return (
    <div className="App">
      <Router>
        {!userData.user ?
          <>
            <nav className="navbar">
              <h3 className="margin10">My Reading List</h3>
              <Link to="/welcome">
                <button className="btn btn-outline-dark margin10">Welcome</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline-dark margin10">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-outline-dark margin10">Login</button>
              </Link>
            </nav>
            {/* <h1 className="jumbotron">Welcome!  Register and Login to create your own Reading List</h1> */}


          </>
          :
          <>
            <nav className="navbar">
              <h3 className="margin10">My Reading List</h3>
              <Link to="/">
                <button className="btn btn-outline-dark margin10">Your List</button>
              </Link>
              <Link to="/search">
                <button className="btn btn-outline-dark margin10">Search For a Book</button>
              </Link>

              <button onClick={logout} className="btn btn btn-outline-danger margin10">Logout</button>
            </nav>

          </>
        }
        <UserContext.Provider value={{ userData, setUserData }} >
          <Switch>
            <Route path="/welcome" component={Welcome} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Search} />
            <Route path="/confirm" component={Confirm} />
            <Route path="/confirm_token:token" component={ConfirmAccount} />
            <Route path="/" component={Books} />
          </Switch>
        </UserContext.Provider>
      </Router>
      <Footer user={userData} />
    </div>
  );
}

export default App;
