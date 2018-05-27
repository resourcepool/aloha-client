import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  
  handleDelete = data => () => {
    const chipData = [...this.props.tags];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.props.onChange(chipData);
  };

  render() {
    const { classes } = this.props;

    let tags = [];
    for (let i in this.props.tags) {
      tags.push(<Chip
        key={i}
        label={this.props.tags[i]}
        onDelete={this.handleDelete(this.props.tags[i])}
        className={classes.chip}
      />);
    }
    return (
      <Paper className={classes.root}>
        {tags}
      </Paper>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(ChipsArray);
