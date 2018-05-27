import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Skill from '../../../partials/skill/Skill';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PersonHeader from './PersonHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
//import PersonIcon from '@material-ui/icons/PersonPinCircle';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

import styles from './Person.scss';

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  getAvatar(label) {
    const matches = label
      .toUpperCase()
      .replace(/[.\-_0-9]/, '')
      .match(/\b(\w)/g);
    return matches.join('');
  }

  getSkillset(project) {
    let result = [];
    project.tags.forEach((s, i) => {
      result.push(<Skill label={s} key={i}/>);
    });
    return result;
  }

  render() {
    return (
      <div>
        <Card className={styles.card}>
          <PersonHeader
            avatar={
              <Avatar>{this.getAvatar(this.props.data.firstName + ' ' + this.props.data.lastName)}</Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon/>
              </IconButton>
            }
            name={this.props.data.firstName + ' ' + this.props.data.lastName}
            status={this.props.data.status}
          />
          <Divider/>
          <CardContent>
            {this.props.data.description}
          </CardContent>
          <Divider/>
          {
            this.props.data.tags && this.props.data.tags.length > 1 ?
              <div className={styles.techenv}>
                <Typography variant="body2" component="div">
                  Tags
                </Typography>
                <div className={styles.skills}>
                  {this.getSkillset(this.props.data)}
                </div>
              </div>
              :
              <div></div>
          }
        </Card>
      </div>
    );
  }
}

// TypeChecking for properties
Person.propTypes = {
  data: PropTypes.object.isRequired
};

export default injectIntl(Person);
