import React, { Fragment, useEffect } from 'react';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Redux
import Alert from './components/layout/Alert';
import setAuthToken from './reduxstuff/utils/setAuthToken';
import { loadUser } from './reduxstuff/actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './reduxstuff/store';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
    console.log('On App');
  }, [setAuthToken, loadUser]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={ProfileForm}
            />
            <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
