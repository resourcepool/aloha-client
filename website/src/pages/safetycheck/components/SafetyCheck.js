import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styles from './SafetyCheck.scss';

class AboutMe extends Component {
  render() {
    return (
      <div className={styles.container}>
        <ReactMarkdown
          className="markdown-container"
          source={this.props.text}
        />
      </div>
    );
  }
}

// TypeChecking for properties
AboutMe.propTypes = {
  text: PropTypes.string
};

export default AboutMe;
