import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import MyProfile from './MyProfile';
import { Provider } from 'react-redux';

import store from '../redux';

const token = JSON.parse(localStorage.getItem('token'));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    token
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

const App = () => (
  <Provider store={store} >
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/registration" component={Registration} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/profile" component={MyProfile} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
