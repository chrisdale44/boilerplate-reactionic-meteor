import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

// route components
import Body from '../../ui/layouts/Body.jsx';
import AppContainer from '../../ui/containers/AppContainer.jsx';
import Login from '../../ui/pages/Login.jsx';
import Signup from '../../ui/pages/Signup.jsx';
import Auth from '../../ui/layouts/Auth.jsx';
import MainContainer from '../../ui/containers/MainContainer.jsx';
import WelcomeContainer from '../../ui/containers/WelcomeContainer.jsx';
import HelloWorld from '../../ui/pages/HelloWorld.jsx';
import ClickMeContainer from '../../ui/containers/ClickMeContainer.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';

function requireAuth(nextState, replace) {
  if (!Meteor.userId()) {
    replace('/login');
  }
}

function requireNoAuth(nextState, replace) {
  if (Meteor.userId()) {
    replace('/');
  }
}

export default () => (
  <Router history={browserHistory}>
    <Route component={Body}>
      <Route component={AppContainer}>
        <Route component={Auth} onEnter={requireNoAuth}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Route>
        <Route path="/" component={MainContainer} onEnter={requireAuth}>
          <IndexRedirect to="welcome" />
          <Route path="welcome" component={WelcomeContainer} />
          <Route path="helloworld" component={HelloWorld} />
          <Route path="clickme" component={ClickMeContainer} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
  </Router>
);
