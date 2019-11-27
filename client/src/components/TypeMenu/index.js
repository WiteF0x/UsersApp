import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const TypeMenu = (props) => {
  const renderMenuItems = () => {
    return props.types.map((item) => (
      <MenuItem key={item._id} onClick={() => props.addType(props.user._id, props.user.userName, props.user.firstName, props.user.lastName, props.user.userInfo, props.user.userTypes, item.typeTitle)}>
        {item.typeTitle}
      </MenuItem>
    ))
  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={props.anchorEl}
      keepMounted
      open={props.userDetailsOpen}
      onClose={props.handleClose}
    >
    { renderMenuItems() }
  </Menu>
  );
}

TypeMenu.propTypes = {
  types: PropTypes.array,
  addType: PropTypes.func,
  anchorEl: PropTypes.string || null,
  userDetailsOpen: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default TypeMenu;
