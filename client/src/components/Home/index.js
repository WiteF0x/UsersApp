import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getProfileInfoAction,
  getUsersListAction,
  saveUserData,
  deleteUserAction,
  removeUserTypeAction,
  addTypeToUserAction,
  getMyProfileAction,
} from '../../redux/actions/users';
import { getTypesAction } from '../../redux/actions/types';
import TopPanel from '../TopPanel';
import Filter from '../Filter';
import Pagination from '../Pagination';
import UserDetails from '../UserDetails';
import './Home.css';
import useStyles from './styles';
import Button from '@material-ui/core/Button';

const Home = (props) => {
  const classes = useStyles();
  const [type, setType] = useState('none');
  const [pageNumber, changePageNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedUser, selectUser] = useState(''); 
  const [userDetailsOpen, changeUserDetailsOpen] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    props.onGetTypesAction();
    props.onGetUsersListAction({ number: pageNumber + 1 });
    token !== null ? props.onGetMyProfile() : props.history.push('/');
  },[]);

  useEffect(() => {
    
  },[props.usersList])

  const renderUsers = () => {
      return (
        props.usersList.map((item) => {
          return (
            <li id={item._id} class="w3-bar cardCont">
            <Button
              onClick={() => handleArrow(item)}
              class="w3-bar-item w3-button w3-white w3-xlarge w3-right arrow"
              variant="contained"
              className={classes.button}
            >
              →
            </Button>
            <img src="img_avatar2.png" class="w3-bar-item w3-circle w3-hide-small avatar" />
            <div class="w3-bar-item">
              <span class="w3-large">{item.userName}</span><br />
              <span>{item.firstName} {item.lastName}</span>
            </div>
          </li>
          )
        })
      )
  }

  const handleArrow = (user) => {
    selectUser(user);
    handleOpen();
  }

  const handleChangePage = (event, newPage) => {
    if (type !== 'none') {
      props.onGetUsersListAction({ number: newPage + 1, filter: type });
      changePageNumber(newPage);
    } else {
      props.onGetUsersListAction({ number: newPage + 1 });
      changePageNumber(newPage);
    }
  };

  const handleChangeType = event => {
    setType(event.target.value);
    if (event.target.value !== 'none') {
      changePageNumber(0);
      props.onGetUsersListAction({ number: 1, filter: event.target.value });
    } else {
      props.onGetUsersListAction({ number: 1 });
    }
  };

  const goToLogin = () => props.history.push('/');

  const deleteUser = (id) => {
    props.onDeleteUser({ userId: id, goToLogin });
    handleClose();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addType = (userId, typeTitle) => {
    if ( selectedUser.userTypes.indexOf(typeTitle) < 0 ) {
      props.onAddTypeToUser({ userId, typeTitle });
      const newTypes = selectedUser.userTypes;
      newTypes.push(typeTitle);
      const newUser = {
        _id: selectedUser._id,
        userName: selectedUser.userName,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        userInfo: selectedUser.userInfo || '',
        userTypes: newTypes,     
      };
      selectUser(newUser);
    } else {
      alert('Already in use!');
    }
  }

  const removeType = (id, typeTitle) => {
    if (type === 'none') {
      props.onRemoveUserType({ userId: id, typeTitle: typeTitle, pageNumber: pageNumber + 1 });
    } else {
      props.onRemoveUserType({ userId: id, typeTitle: typeTitle, pageNumber: pageNumber + 1, type });
    }
    const newUser = {
      _id: selectedUser._id,
      userName: selectedUser.userName,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      userInfo: selectedUser.userInfo || '',
      userTypes: selectedUser.userTypes.filter((item) => item !== typeTitle)     
    };
    selectUser(newUser);
  }
  

  if (props.user === null ) {
    return null;
  }
  return (
    <div>
      <TopPanel user={props.user} />
      <div className="homeCont">
        <Filter
          type={type}
          types={props.types}
          handleChangeType={handleChangeType}
        />
        <div class="w3-container" style={{ minWidth: 350 }}>
          <ul class="w3-ul w3-card-4 userCont">
            { renderUsers() }
          </ul>
        </div>
        <Pagination
          pageNumber={pageNumber}
          handleChangePage={handleChangePage}
          count={props.count}
        />
        <UserDetails
          removeType={removeType}
          handleClose={handleClose}
          open={open}
          user={selectedUser}
          deleteUser={deleteUser}
          types={props.types}
          addType={addType}
          userDetailsOpen={userDetailsOpen}
          changeUserDetailsOpen={changeUserDetailsOpen}
        />
      </div>
    </div>
  );
};

Home.propTypes = {
  onDeleteUser: PropTypes.func,
  onAddTypeToUser: PropTypes.func,
  onRemoveUserType: PropTypes.func,
  onGetTypesAction: PropTypes.func,
  onGetUsersListAction: PropTypes.func,
  onGetMyProfile: PropTypes.func,
  type: PropTypes.array,
  user: PropTypes.object,
  usersList: PropTypes.array,
  count: PropTypes.number,
}


const mapStateToProps = function(state) {
  return {
    types: state.types.types,
    user: state.user.user,
    usersList: state.usersList.usersList,
    count: state.count.count,
  }
};

const mapDispatchToProps = (dispatch) => ({
  onGetMyProfile: () => dispatch(getMyProfileAction()),
  onAddTypeToUser: (payload) => dispatch(addTypeToUserAction(payload)),
  onRemoveUserType: (payload) => dispatch(removeUserTypeAction(payload)),
  onDeleteUser: (payload) => dispatch(deleteUserAction(payload)),
  onGetTypesAction: () => dispatch(getTypesAction()),
  onGetProfileInfoAction: (payload) => dispatch(getProfileInfoAction(payload)),
  onSaveUserData: (payload) => dispatch(saveUserData(payload)),
  onGetUsersListAction: (payload) => dispatch(getUsersListAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));