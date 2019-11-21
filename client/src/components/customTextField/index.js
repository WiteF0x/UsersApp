import React from 'react';
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

export default CustomTextField;
