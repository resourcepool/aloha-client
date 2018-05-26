import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import styleSass from './PersonHeader.scss';

export const styles = theme => ({
  root: theme.mixins.gutters({
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  })
});

function PersonHeader(props) {
  const {
    avatar,
    className: classNameProp,
    component: Component,
    website,
    title
  } = props;

  const classes = Object.assign(props.classes, styleSass);

  return (
    <Component className={classNames(classes.root, classNameProp)}>
      {avatar && <div className={classes.avatar}>{avatar}</div>}
      <div className={classes.content}>
        <Typography
          variant={'headline'}
          component="span"
          className={classes.title}
        >
          {title}
        </Typography>
        <Typography
          variant={'body1'}
          component="span"
          color="textSecondary"
          className={classes.subheader}
        >
          {website}
        </Typography>
      </div>
    </Component>
  );
}

PersonHeader.propTypes = {
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

  title: PropTypes.string.isRequired,
  website: PropTypes.string
};

PersonHeader.defaultProps = {
  component: 'div'
};

export default withStyles(styles, { name: 'PersonHeader' })(PersonHeader);
