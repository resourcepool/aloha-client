/* eslint-disable no-console */
import React, { Component } from 'react';
import styles from './Menu.scss';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import CheckIcon from '@material-ui/icons/Check';

import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  
  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }
  
  handleClose = () => {
    this.setState({ open: false });
  }
  
  render() {
    return (
      <nav id={styles.menu}>
        <IconButton onClick={this.handleToggle}>
          <i className="material-icons">menu</i>
        </IconButton>
        <Drawer open={this.state.open} onClose={this.handleClose}>
          <span
            tabIndex={0}
            role="button"
            onClick={this.handleToggle}
            onKeyDown={this.handleToggle}
          >
            <div style={{ width: 250 }}>
              <List>
                <ListItem
                  button
                  onClick={() => this.props.goToPage('/')}
                >
                  <ListItemIcon>
                    <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary={<FormattedMessage id="lbl.home"/>}
                    className="text"
                  />
                </ListItem>
              </List>
              <Divider/>
              <List>
                <ListItem button onClick={() => this.props.goToPage('/people')}>
                  <ListItemIcon>
                    <PersonIcon/>
                  </ListItemIcon>
                  <ListItemText primary={<FormattedMessage id="lbl.people"/>}/>
                </ListItem>
                <ListItem
                  button
                  onClick={() => this.props.goToPage('/safetycheck')}
                >
                  <ListItemIcon>
                    <CheckIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary={<FormattedMessage id="lbl.safetycheck"/>}
                  />
                </ListItem>
              </List>
            </div>
          </span>
        </Drawer>
      </nav>
    );
  }
}

// TypeChecking for properties
Menu.propTypes = {
  goToPage: PropTypes.func.isRequired
};

export const goToPage = page => dispatch => {
  return dispatch(push(page));
};

export default injectIntl(connect(null, { goToPage })(Menu));
