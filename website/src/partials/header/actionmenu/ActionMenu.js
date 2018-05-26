/* eslint-disable no-console */
import React, { Component } from 'react';
import styles from './ActionMenu.scss';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Hotel';
import LocalHostpitalIcon from '@material-ui/icons/LocalHospital';
import FoodIcon from '@material-ui/icons/LocalPizza';
import WaterIcon from '@material-ui/icons/LocalDrink';
import Button from '@material-ui/core/Button';

class ActionMenu extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <nav
        id={styles.actionMenu}
        className={this.props.shrink ? styles.shrink : styles.expand}
      >
        <Button
          variant="fab"
          mini
          color="secondary"
          aria-label="add"
        >
          <HomeIcon />
        </Button>
        <Button
          variant="fab"
          mini
          color="secondary"
          aria-label="add"
        >
          <LocalHostpitalIcon />
        </Button>
        <Button
          variant="fab"
          mini
          color="secondary"
          aria-label="add"
        >
          <FoodIcon />
        </Button>
        <Button
          variant="fab"
          mini
          color="secondary"
          aria-label="add"
        >
          <WaterIcon />
        </Button>
      </nav>
    );
  }
}

// TypeChecking for properties
ActionMenu.propTypes = {
  shrink: PropTypes.bool.isRequired
};

export default ActionMenu;
