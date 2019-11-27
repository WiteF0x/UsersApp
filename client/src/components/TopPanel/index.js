import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { saveUserData } from '../../redux/actions/users';
import { getTypesAction } from '../../redux/actions/types';
import './topPanel.css';
import useStyles from './styles';
import TypesModal from '../TypesModal';

const TopPanel = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const LogOut = () => {
    localStorage.removeItem('token');
    props.onSaveUserData(null);
    props.history.push('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.history.push('/profile')}>
            <img alt="avatar" src="avatar.png" className={classes.profileAvatar} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.user.userName}
          </Typography>
          <Button variant="contained" color="secondary" className="types" onClick={handleOpen}>Types</Button>
          <Button color="inherit" onClick={LogOut}>Log out</Button>
        </Toolbar>
        <TypesModal
          open={open}
          handleClose={handleClose}
          types={props.types}
        />
      </AppBar>
    </div>
  )
}

TopPanel.propTypes = {
  user: PropTypes.object,
  types: PropTypes.array,
  onSaveUserData: PropTypes.func,
  onGetTypes: PropTypes.func,
}

const mapStateToProps = function(state) {
  return {
    types: state.types.types,
  }
};

const mapDispatchToProps = (dispatch) => ({
  onGetTypes: () => dispatch(getTypesAction()),
  onSaveUserData: (payload) => dispatch(saveUserData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopPanel));
