/* eslint-disable no-undef */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { IntlProvider } from 'react-intl-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DevTools from './index/dev/DevTools';
import theme from '../theme/theme';

// Page Components
import Routes from '../routes';
import Index from './index/Index';
// History
import history from '../store/history';


class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Provider store={this.props.store}>
          <MuiThemeProvider theme={theme}>
            <IntlProvider locale="en">
              <ConnectedRouter history={history.history}>
                <Index>
                  <Routes />
                  <DevTools />
                </Index>
              </ConnectedRouter>
            </IntlProvider>
          </MuiThemeProvider>
        </Provider>
      </Fragment>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
