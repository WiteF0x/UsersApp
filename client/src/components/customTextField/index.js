import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';

const CustomTextField = props => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        value={props.value}
        id={props.id}
        className={classes.textField}
        label={props.label}
        margin="normal"
        variant="filled"
        onChange={props.onChange}
        {...props}
      />
    </div>
  )
}

CustomTextField.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
}

export default CustomTextField;
