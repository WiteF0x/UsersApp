import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import useStyles from './styles';

const Filter = (props) => {
  const classes = useStyles();

  const renderTypes = () => {
    return props.types.map((item) => {
      return (
        <MenuItem value={item.typeTitle}>{item.typeTitle}</MenuItem>
      )
    })
  }

    return (
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">User type</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={props.type}
            onChange={props.handleChangeType}
          >
            <MenuItem value={'none'}>None</MenuItem>
            { renderTypes() }
          </Select>
        </FormControl>
    );
}

export default Filter;
