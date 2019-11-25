import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const TypeMenu = (props) => {
  const renderMenuItems = () => {
    return props.types.map((item) => (
      <MenuItem id={item._id} onClick={() => props.addType(props.user._id, item.typeTitle)}>
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
  anchorEl: PropTypes.string,
  userDetailsOpen: PropTypes.func,
  handleClose: PropTypes.func,
}

export default TypeMenu;
