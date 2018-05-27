/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import styles from './SafetyCheckPage.scss';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Chips from '../components/Chips';
import { savePerson } from '../../../actions/aloha';

class SafetyCheckPage extends Component {

  constructor(args) {
    super(args);
    this.state = {
      firstName: '',
      lastName: '',
      status: 'SAFE',
      description: '',
      tags: ['tout-va-bien', 'saint-martin', 'en-vie']
    };
  }

  onFormChanged = (field, target) => {
    switch (field) {
    case 'firstName':
    case 'lastName':
    case 'description':
    case 'status':
      this.setState({ [field]: target.target.value });
      break;
    case 'tags':
      this.setState({ tags: target });
      break;
    }
  };

  onSubmit = () => {
    console.log(this.state);
    this.props.savePerson(this.state);
  };

  render() {
    return (
      <div>
        <form className={styles.root} autoComplete="off">
          <TextField
            id="firstName"
            label="Prénom de la personne"
            type="text"
            className={styles.textField}
            margin="normal"
            onChange={(field) => {
              this.onFormChanged('firstName', field);
            }}
          />
          <TextField
            id="lastName"
            label="Nom de la personne"
            type="text"
            className={styles.textField}
            margin="normal"
            onChange={(field) => {
              this.onFormChanged('lastName', field);
            }}
          />
          <TextField
            id="description"
            label="Description"
            type="text"
            multiline
            rows="4"
            className={styles.textField}
            margin="normal"
            onChange={(field) => {
              this.onFormChanged('description', field);
            }}
          />
          <FormControl className={styles.formControl}>
            <InputLabel htmlFor="age-simple">Etat de santé</InputLabel>
            <Select
              value={this.state.status}
              onChange={this.handleChange}
              inputProps={{
                name: 'status',
                id: 'status',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'SAFE'}>Sain et sauf</MenuItem>
              <MenuItem value={'DANGER'}>En vie, mais blessé</MenuItem>
              <MenuItem value={'DEAD'}>Décédé</MenuItem>
            </Select>
          </FormControl>
          <Chips tags={this.state.tags} onChange={(target) => this.onFormChanged('tags', target)}/>
        </form>
        <Button variant="raised" color="primary" className={styles.button} onClick={this.onSubmit}>
          Envoyer
        </Button>
      </div>
    );
  }
}


// TypeChecking for properties
SafetyCheckPage.propTypes = {
  browse: PropTypes.object,
  savePerson: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  browse: state.aloha.browse
});

export default connect(mapStateToProps, { savePerson })(SafetyCheckPage);
