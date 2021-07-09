import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Register from './Pages/Register';
import Login from './Pages/Login';
import Books from './Pages/Books';
import Search from './Pages/Search';

function App() {
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


        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Books} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
