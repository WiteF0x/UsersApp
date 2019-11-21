import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const TypeItem = (props) => {
  const classes = useStyles();

  if (props.item.typeTitle === 'defaultUser') {
    return (
      <div style={{ marginBottom: 25 }}>
      <h2 id="simple-modal-title">
        {props.item.typeTitle}
      </h2>
      <Button variant="contained" disabled color="primary" className={classes.button}>
        Edit
      </Button>
      <Button variant="contained" disabled color="secondary" className={classes.button}>
        Delete
      </Button>
    </div>
    )
  }
  return (
    <div style={{ marginBottom: 25 }}>
      <h2 id="simple-modal-title">
        {props.item.typeTitle}
      </h2>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => props.editOpen(props.item.typeTitle, props.item._id)}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => props.onDeleteType({ titleId: props.item._id })}
      >
        Delete
      </Button>
    </div>
  )
}

export default TypeItem;
