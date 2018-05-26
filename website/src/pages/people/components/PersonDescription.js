import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactMarkdown from 'react-markdown';

import styleSass from './PersonHeader.scss';

export const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit
  })
});

function ProjectDescription(props) {
  const { className: classNameProp, component: Component, description } = props;

  const classes = Object.assign(props.classes, styleSass);

  return (
    <Component className={classNames(classes.root, classNameProp)}>
      <ReactMarkdown source={description} />
    </Component>
  );
}

ProjectDescription.propTypes = {
  /**
   * The action to display in the card header.
   */
  action: PropTypes.node,
  /**
   * The Avatar for the Card Header.
   */
  avatar: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  description: PropTypes.string.isRequired
};

ProjectDescription.defaultProps = {
  component: 'div'
};

export default withStyles(styles, { name: 'WorkXPDescription' })(
  ProjectDescription
);
