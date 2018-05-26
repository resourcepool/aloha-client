import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Skill from '../../../partials/skill/Skill';
import Card, { CardContent } from '@material-ui/core/Card';
import ProjectHeader from './PersonHeader';
import ProjectDescription from './PersonDescription';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

import styles from './Person.scss';

class Project extends Component {
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
    project.skills.forEach((s, i) => {
      result.push(<Skill label={s} key={i} />);
    });
    return result;
  }

  render() {
    return (
      <div>
        <Card className={styles.card}>
          <ProjectHeader
            avatar={
              this.props.data.logo ? (
                <Avatar
                  aria-label="Recipe"
                  className={styles.avatar}
                  src={'/images/' + this.props.data.logo}
                />
              ) : (
                <Avatar>{this.getAvatar(this.props.data.title)}</Avatar>
              )
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={this.props.data.title}
            website={this.props.data.website}
          />
          <Divider />
          <CardContent>
            <ProjectDescription description={this.props.data.description} />
          </CardContent>
          <Divider />
          <div className={styles.techenv}>
            <Typography variant="body2" component="div">
              Technical environment
            </Typography>
            <div className={styles.skills}>
              {this.getSkillset(this.props.data)}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

// TypeChecking for properties
Project.propTypes = {
  data: PropTypes.object.isRequired
};

export default injectIntl(Project);
