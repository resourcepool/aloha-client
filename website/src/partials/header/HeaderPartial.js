import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderPartial extends Component {
  
  render() {
    return <Header metadata={this.props.browse} />;
  }
}


// TypeChecking for properties
HeaderPartial.propTypes = {
  browse: PropTypes.object
};

const mapStateToProps = (state) => ({
  browse: state.aloha.browse
});

export default connect(mapStateToProps, {})(HeaderPartial);
