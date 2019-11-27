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
import Button from '@material-ui/core/Button';

const Home = (props) => {
  const [open, setOpen] = useState(false);
  const [pages, changePages] = useState(0);
  const [type, setType] = useState('none');
  const [selectedUser, selectUser] = useState(null); 
  const [pageNumber, changePageNumber] = useState(1);
  const [usersPerPage, changeUsersPerPage] = useState(5);
  const [userDetailsOpen, changeUserDetailsOpen] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'));

  const {
    onGetMyProfile,
    history,
    onGetTypesAction,
    onGetUsersListAction,
  } = props;

  useEffect(() => {
    if (props.count % usersPerPage === 0) {
      let countPages = props.count / usersPerPage;
      changePages(countPages)
    } else {
      let countPages = props.count / usersPerPage;
      changePages(~~countPages + 1)
    }
  }, [props.count, usersPerPage])

  useEffect(() => {

    props.usersList.map((item) => {
      if (selectedUser && item._id === selectedUser._id) {
        selectUser(item);
      }
    })
  }, [props.usersList])

  useEffect(() => {
    token !== null ? onGetMyProfile() : history.push('/');
    onGetTypesAction();
    onGetUsersListAction({ number: pageNumber, usersPerPage: 5 });
  }, [token, pageNumber, onGetMyProfile, onGetTypesAction, onGetUsersListAction, history]);

  const renderUsers = () => {
      return (
        props.usersList.map((item) => {
          return (
            <li key={item._id} className="w3-bar cardCont">
              <Button
                onClick={() => handleArrow(item)}
                className="w3-bar-item w3-button w3-white w3-xlarge w3-right arrow"
                variant="contained"
              >
                →
              </Button>
              <img  alt="default_avatar" src="img_avatar2.png" className="w3-bar-item w3-circle w3-hide-small avatar" />
              <div className="w3-bar-item">
                <span className="w3-large">{item.userName}</span><br />
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

  const handleChangeUsersPerPage = event => {
    let selectedValue = event.target.value;
    props.count % selectedValue === 0
    ? changePages(props.count / selectedValue)
    : changePages(~~(props.count / selectedValue) + 1)

    if (pageNumber > pages) {
      changePageNumber(pages);
    }
    changeUsersPerPage(selectedValue)
    if (type !== 'none') {
      props.onGetUsersListAction({ number: pageNumber, filter: type, usersPerPage: selectedValue });
    } else {
      props.onGetUsersListAction({ number: pageNumber, usersPerPage: selectedValue });
    }
  }

  const handleChangePage = (newPage) => {
      if (type !== 'none') {
        props.onGetUsersListAction({ number: newPage, filter: type, usersPerPage });
        changePageNumber(newPage);
      } else {
        props.onGetUsersListAction({ number: newPage, usersPerPage });
        changePageNumber(newPage);
      }
  };

  const handleChangeType = event => {
    setType(event.target.value);
    if (event.target.value !== 'none') {
      changePageNumber(1);
      props.onGetUsersListAction({ number: 1, filter: event.target.value, usersPerPage });
    } else {
      props.onGetUsersListAction({ number: 1, usersPerPage });
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

  const addType = (userId, userName, firstName, lastName, userInfo, userTypes, typeTitle) => {
    if ( selectedUser.userTypes.indexOf(typeTitle) < 0 ) {
      props.onAddTypeToUser({ userId, userName, firstName, lastName, userInfo, userTypes: [...userTypes, typeTitle], typeTitle });
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

  const removeType = (id, userName, firstName, lastName, userInfo, userTypes, typeTitle) => {
    if (type === 'none') {
      props.onRemoveUserType({ userId: id,  userName, firstName, lastName, userInfo, userTypes: userTypes.filter(it => it !== typeTitle), typeTitle: typeTitle, pageNumber: pageNumber });
    } else {
      props.onRemoveUserType({ userId: id,  userName, firstName, lastName, userInfo, userTypes: userTypes.filter(it => it !== typeTitle), typeTitle: typeTitle, pageNumber: pageNumber, type });
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
        <div className="w3-container" style={{ minWidth: 350 }}>
          <ul className="w3-ul w3-card-4 userCont">
            { renderUsers() }
          </ul>
        </div>
        <Pagination
          pages={pages}
          pageNumber={pageNumber}
          count={props.count || 0}
          usersPerPage={usersPerPage}
          handleChangePage={handleChangePage}
          handleChangeUsersPerPage={handleChangeUsersPerPage}
        />
        <UserDetails
          open={open}
          addType={addType}
          user={selectedUser}
          types={props.types}
          usersList={props.usersList}
          deleteUser={deleteUser}
          removeType={removeType}
          handleClose={handleClose}
          userDetailsOpen={userDetailsOpen}
          changeUserDetailsOpen={changeUserDetailsOpen}
        />
      </div>
    </div>
  );
};

Home.propTypes = {
  type: PropTypes.array,
  user: PropTypes.object,
  count: PropTypes.number,
  usersList: PropTypes.array,
  onDeleteUser: PropTypes.func,
  onGetMyProfile: PropTypes.func,
  onAddTypeToUser: PropTypes.func,
  onRemoveUserType: PropTypes.func,
  onGetTypesAction: PropTypes.func,
  onGetUsersListAction: PropTypes.func,
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