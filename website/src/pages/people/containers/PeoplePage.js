/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPeople } from '../../../actions/aloha';
import Person from '../components/Person';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import styles from './PeoplePage.scss';

const FIRST_OFFSET = 0;
const DEFAULT_LIMIT = 20;

class PeoplePage extends Component {
  componentDidMount() {
    this.props.loadPeople(FIRST_OFFSET, DEFAULT_LIMIT);
  }
  
  onFilterTyped = (filter) => {
    this.props.loadPeople(FIRST_OFFSET, DEFAULT_LIMIT, filter.target.value);
  };

  render() {
    let results = [];
    if (this.props.people && Object.keys(this.props.people).length > 0) {
      for (let k in Object.keys(this.props.people)) {
        results.push(<Person data={this.props.people[k]} key={k} />);
      }
    } else {
      results = 'Aucun résultat ne correspond à vos critères';
    }
    return <div className="people-container">
      <Typography variant={'headline'}>
        <FormattedMessage id="msg.findpeople"/>
      </Typography>
      <br/>

      <TextField
        id="search"
        label="Taper un nom ou une description de la personne"
        type="search"
        className={styles.textField}
        margin="normal"
        onChange={this.onFilterTyped}
      />

      <br/>
      {results}
      <br/>
      <br/>
      
    </div>;
  }
}

// TypeChecking for properties
PeoplePage.propTypes = {
  loadPeople: PropTypes.func.isRequired,
  people: PropTypes.array,
  browse: PropTypes.object
};

const mapStateToProps = (state) => ({
  people: state.aloha.people,
  browse: state.aloha.browse
});

export default connect(mapStateToProps, { loadPeople })(PeoplePage);
