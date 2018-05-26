import React, { Component } from 'react';
import { Footer, Header } from '../../partials/components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import style from './Index.scss';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div className={style.mainContainer}>
          <Paper id={style.main} elevation={4}>
            {this.props.children}
          </Paper>
        </div>
        <Footer />
      </div>
    );
  }
}

// TypeChecking for properties
Index.propTypes = {
  browse: PropTypes.object,
  children: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    location: state.router.location,
    browse: state.aloha.browse
  };
};

export default connect(mapStateToProps)(Index);
