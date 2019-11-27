import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TypeMenu from '../TypeMenu';
import useStyles from './styles';

const UserDetails = (props) => {
  const classes = useStyles();
  const [anchorEl, changeAnchorEl] = useState(null);

  useEffect(() => {
    console.log('UPDATED!');
  }, [props.user, props.usersList])

  const handleClick = event => {
    props.changeUserDetailsOpen(true);
    changeAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    props.changeUserDetailsOpen(false);
  };

  const renderTypesList = () => (
    <Paper className={classes.root}>
      { props.user.userTypes.map((item, index) => {
          return <Chip
            key={index}
            label={item}
            onDelete={item === 'defaultUser'
            ? undefined
            : () => props.removeType(props.user._id, props.user.userName, props.user.firstName, props.user.lastName, props.user.userInfo, props.user.userTypes, item)}
            className={classes.chip}
          />
        })
      }
    </Paper>
  );

  if (props.user === null) {
    return null;
  }
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div
        style={{
          top: `50%`,
          left: `45%`,
          transform: `translate(-40%, -50%)`,
        }}
        className={classes.paper}
      >

        <h5 id="simple-modal-title">
          <b>User name:</b>
          {props.user.userName}
        </h5>

        <p id="simple-modal-description">
          <b>First name: </b>
          {props.user.firstName}
        </p>

        <p id="simple-modal-description">
          <b>Last name: </b>
          {props.user.lastName}
        </p>

        <p id="simple-modal-description">
          <b>Info: </b>
          {props.user.userInfo === '' ? 'None' : props.user.userInfo}
        </p>
        { renderTypesList() }

        <TypeMenu
          user={props.user}
          anchorEl={anchorEl}
          userDetailsOpen={props.userDetailsOpen}
          handleClose={handleClose}
          addType={props.addType}
          types={props.types}
        />

        <Button
          className={classes.addType}
          aria-controls="simple-menu"
          aria-haspopup="true"
          color="primary"
          onClick={handleClick}
        >
          Add type
        </Button>
        <br />
        <Button
          variant="contained" 
          color="primary"
          className={classes.button}
          onClick={props.handleClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => props.deleteUser(props.user._id)}
        >
          Delete User
        </Button>
      </div>
    </Modal>
  );
}

UserDetails.propTypes = {
  user: PropTypes.object || null,
  usersList: PropTypes.array,
  removeType: PropTypes.func,
  handleClose: PropTypes.func,
  deleteUser: PropTypes.func,
  changeUserDetailsOpen: PropTypes.func,
}

export default UserDetails;
