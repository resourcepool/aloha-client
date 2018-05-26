import React, { Component } from 'react';
import styles from './RaisedButtonsMenu.scss';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Button from '@material-ui/core/Button';
import LocationIcon from '@material-ui/icons/LocationOn';

const GEO_OPTIONS = {
  maximumAge: 5 * 60 * 1000,
};

class RaisedButtonsMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    let geoSuccess = (position) => {
      this.setState({
        position: position.coords
      });
    };
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      () => {
      },
      GEO_OPTIONS);
  }

  renderLocation() {
    if (this.state.location) {
      return this.state.location.latitude + ', ' + this.state.location.longitude;
    }
    return 'No location';
  }

  render() {
    return (
      <nav
        id={styles.raisedButtonMenu}
        className={this.props.shrink ? styles.shrink : styles.expand}
      >
        <Button variant="raised" color="secondary">
          {this.renderLocation()}
          <LocationIcon className={styles.icon}/>
        </Button>
      </nav>
    );
  }
}

// TypeChecking for properties
RaisedButtonsMenu.propTypes = {
  shrink: PropTypes.bool.isRequired
};

export default injectIntl(RaisedButtonsMenu);
