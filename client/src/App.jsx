import { useContext } from 'react';
import './app.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from './authContext/AuthContext';

const App = () => {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        {user ?  [
          
            <Route path="/movies" key="/movies">
              <Home type="movie" />
            </Route>,
            <Route path="/series" key="/series">
              <Home type="series" />
            </Route>,
            <Route path="/watch" key="/watch">
              <Watch />
            </Route>
        
        ]:<Redirect to="/" />}
      </Switch>
    </Router>
  )
};

export default App;