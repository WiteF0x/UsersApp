import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';

const EditModal = (props) => {
  const classes = useStyles();

  return (
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.isOpenEdit}
        onClose={props.editClose}
      >
        <div
          style={{ top: `50%`, left: `42%`, transform: `translate(-40%, -50%)` }}
          className={classes.paper}
        >
          <TextField
            required
            id="outlined-required"
            label="Type Title"
            defaultValue={props.typeTitle}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={props.typeTitle}
            onChange={event => props.onChangeType(event)}
          />
          <br />
          <Button 
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => props.onSave(props.typeId, props.typeTitle)}
          >
            Save
          </Button>
        </div>
      </Modal>
  )
}

EditModal.propTypes = {
  isOpenEdit: PropTypes.bool,
  editClose: PropTypes.func,
  typeTitle: PropTypes.string,
  onChangeType: PropTypes.func,
  onSave: PropTypes.func,
}

export default EditModal;
