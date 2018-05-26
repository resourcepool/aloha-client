import React, { Component } from 'react';
import styles from './Footer.scss';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage, injectIntl } from 'react-intl';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <div id={styles.footerContainer}>
        <footer id={styles.footer}>
          <Typography component="span" variant="body1" className={styles.text}>
            <FormattedMessage id="msg.copyright"/>
          </Typography>
        </footer>
      </div>
    );
  }
}

// TypeChecking for properties
Footer.propTypes = {};

export default injectIntl(Footer);
