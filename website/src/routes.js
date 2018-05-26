import React, { Component } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import people from './pages/people';
import safetycheck from './pages/safetycheck';
import { connect } from 'react-redux';

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route
          path="/people"
          component={people.components.PeoplePage}
        />
        <Route
          path="/safetycheck"
          component={safetycheck.components.CheckPage}
        />
        <Redirect exact from="/" to="/people" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.router.location
  };
};

export default connect(mapStateToProps)(Routes);
