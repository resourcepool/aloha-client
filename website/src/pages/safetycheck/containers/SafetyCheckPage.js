import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SafetyCheck from '../components/SafetyCheck';
import { connect } from 'react-redux';
import { loadAboutMe } from '../../../actions/aloha';

class SafetyCheckPage extends Component {
  componentDidMount() {
    this.props.loadAboutMe();
  }

  render() {
    if (!this.props.aboutme) {
      return <div>Loading</div>;
    }
    if (!this.props.metadata) {
      return <SafetyCheck text={this.props.aboutme.text} />;
    }
    return (
      <div>
        <SafetyCheck text={this.props.aboutme.text} />
      </div>
    );
  }
}



// TypeChecking for properties
SafetyCheckPage.propTypes = {
  loadAboutMe: PropTypes.func.isRequired,
  aboutme: PropTypes.object,
  metadata: PropTypes.object
};

const mapStateToProps = (state) => ({
  aboutme: state.cv.aboutme,
  metadata: state.cv.metadata
});

export default connect(mapStateToProps, { loadAboutMe })(SafetyCheckPage);
