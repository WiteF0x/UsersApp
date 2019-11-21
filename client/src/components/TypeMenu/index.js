import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const TypeMenu = (props) => {
  const renderMenuItems = () => {
    return props.types.map((item) => (
      <MenuItem onClick={() => props.addType(props.user._id, item.typeTitle)}>
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

export default TypeMenu;
