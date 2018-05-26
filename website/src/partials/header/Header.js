import React, { Component } from 'react';
import styles from './Header.scss';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Avatar from '@material-ui/core/Avatar';
import Menu from './menu/Menu';
import ActionMenu from './actionmenu/ActionMenu';
import RaisedButtonMenu from './raisedbuttonsmenu/RaisedButtonsMenu';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

class Header extends Component {
  constructor(props) {
    super(props);
    if (window) {
      window.onscroll = () => {
        this.changeNav();
      };
    }
    this.state = {
      height:
        parseInt(styles.headerLargeHeight, 10) -
        parseInt(styles.headerShrinkHeight, 10),
      shrinkNav: false
    };
  }

  changeNav() {
    let offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (offset > this.state.height && !this.state.shrinkNav) {
      this.setState({
        shrinkNav: true
      });
    } else if (offset < this.state.height && this.state.shrinkNav) {
      this.setState({
        shrinkNav: false
      });
    }
  }
  
  render() {
    return (
      <header
        id={styles.header}
        className={this.state.shrinkNav ? styles.shrink : styles.expand}
      >
        <div
          className={classNames(
            styles.headerContainer,
            this.state.shrinkNav ? styles.shrink : styles.expand
          )}
        >
          <div id={styles.headerMetaContainer}>
            <div id={styles.metadata}>
              <Avatar
                src="/images/logo.png"
                className={styles.avatar}
              />
              <Typography
                component="div"
                variant="headline"
                className={styles.name}
              >
                Aloha - Safety Box
              </Typography>
              <div className={styles.catchline}>{'Plateforme de communication d\'urgence'}</div>
            </div>
          </div>
          <RaisedButtonMenu
            shrink={this.state.shrinkNav}
          />
          <ActionMenu
            shrink={this.state.shrinkNav}
          />
          <Menu />
        </div>
      </header>
    );
  }
}

// TypeChecking for properties
Header.propTypes = {
  text: PropTypes.string,
  browse: PropTypes.object
};

export default injectIntl(Header);
