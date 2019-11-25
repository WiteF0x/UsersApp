import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TypeItem from './TypeItem';
import { deleteTypeAction, createTypeAction, updateTypeAction } from '../../redux/actions/types';
import useStyles from './styles';
import EditModal from './EditModal';

const TypesModal = (props) => {
  const classes = useStyles();
  const [isOpenEdit, changeIsOpenEdit] = useState(false);
  const [typeTitle, changeCurrentType] = useState('');
  const [typeId, changeTypeId] = useState('');
  const [newType, changeNewType] = useState('');
  const [disabled, changeDisabled] = useState(true);

  const editClose = () => {
    changeIsOpenEdit(false);
  }

  const editOpen = (type, id) => {
    changeCurrentType(type)
    changeTypeId(id)
    changeIsOpenEdit(true)
  }

  const onChangeType = (event) => {
    changeCurrentType(event.target.value);
  }

  const onChangeNewType = (event) => {
    event.target.value.trim() !== '' ? changeDisabled(false) : changeDisabled(true);
    changeNewType(event.target.value);
  }

  const onSave = (typeId, typeTitle) => {
    props.onUpdateType({ typeId, typeTitle });
    editClose();
  }

  const onCreateType = () => {
    props.onCreateType({ typeTitle: newType })
    changeNewType('');
    changeDisabled(true)
  }

  const renderTypes = () => {
    return props.types.map((item) => {
      return <TypeItem
        id={item._id}
        item={item}
        editOpen={editOpen}
        onDeleteType={props.onDeleteType}
      />
    })
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
      >
        <div style={{ top: `50%`, left: `47%`, transform: `translate(-50%, -50%)` }} className={classes.paper}>
          { renderTypes() }
          <br />

          <TextField
            required
            id="outlined-required"
            label="New type"
            defaultValue={newType}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={newType}
            onChange={event => onChangeNewType(event)}
          />
          <br />
          <Button 
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={disabled}
            onClick={onCreateType}
          >
            Create
          </Button>
        </div>
      </Modal>
      <EditModal
        isOpenEdit={isOpenEdit}
        editClose={editClose}
        typeTitle={typeTitle}
        onChangeType={onChangeType}
        onSave={onSave}
        typeId={typeId}
        typeTitle={typeTitle}
      />
    </div>
  )
};

TypesModal.propTypes = {
  onUpdateType: PropTypes.func,
  onCreateType: PropTypes.func,
  types: PropTypes.array,
  onDeleteType: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
  onDeleteType: (payload) => dispatch(deleteTypeAction(payload)),
  onCreateType: (payload) => dispatch(createTypeAction(payload)),
  onUpdateType: (payload) => dispatch(updateTypeAction(payload)),
});

export default connect(null, mapDispatchToProps)(TypesModal);
