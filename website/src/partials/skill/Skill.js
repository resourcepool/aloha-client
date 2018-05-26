import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import styles from './Skill.scss';

function Skill(props) {
  function getAvatar(label) {
    const matches = label
      .toUpperCase()
      .replace(/[.\-_0-9]/, '')
      .match(/\b(\w)/g);
    return matches.join('');
  }

  return (
    <Chip
      avatar={<Avatar>{getAvatar(props.label)}</Avatar>}
      label={props.label}
      className={styles.skill}
    />
  );
}

Skill.propTypes = {
  label: PropTypes.string.isRequired
};

Skill.defaultProps = {
  component: 'div'
};

export default Skill;
