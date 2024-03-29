import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import MyProfile from './MyProfile';
import Tasks from './Tasks';
import Project from './Project';
import { Provider } from 'react-redux';

import store from '../redux';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return (
    <Route {...rest} render={(props) => (
      token
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
}

const App = () => (
  <Provider store={store} >
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/registration" component={Registration} />
        <PrivateRoute path="/home" component={Tasks} />
        <PrivateRoute path="/profile" component={MyProfile} />
        <PrivateRoute path='/project' component={Project} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
