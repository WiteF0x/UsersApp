import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import CustomTextField from '../customTextField';
import TypeMenu from '../TypeMenu';
import {
  saveUserData,
  getProfileInfoAction,
  patchUserAction,
  removeUserTypeAction,
  addTypeToUserAction,
  getMyProfileAction,
} from '../../redux/actions/users';
import { getTypesAction } from '../../redux/actions/types';
import { pushError } from '../../redux/actions/error';
import './myProfile.css';
import useStyles from './styles';

const initialProfile = {
  userId: '',
  userName: '',
  firstName: '',
  lastName: '',
  userInfo: '',
  login: '',
  types: [],
  anchorEl: null,
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'changeUserId':
      return { ...state, userId: action.payload };
    case 'changeUserName':
      return { ...state, userName: action.payload };
    case 'changeFirstName':
      return { ...state, firstName: action.payload };
    case 'changeLastName':
      return { ...state, lastName: action.payload };
    case 'changeUserInfo':
      return { ...state, userInfo: action.payload };
    case 'changeLogin':
      return { ...state, login: action.payload };
    case 'changeUserTypes':
      return { ...state, types: action.payload };
    case 'changeAnchorEl':
      return { ...state, anchorEl: action.payload };
    case 'changeIsOpen':
      return { ...state, isOpen: action.payload };
  }
}

const MyProfile = (props) => {
  // const [userId, changeUserId] = useState('');
  // const [userName, changeUserName] = useState('');
  // const [firstName, changeFirstName] = useState('');
  // const [lastName, changeLastName] = useState('');
  // const [userInfo, changeUserInfo] = useState('');
  // const [login, changeLogin] = useState('');
  // const [types, changeUserTypes] = useState([]);
  // const [anchorEl, changeAnchorEl] = useState(null);
  // const [isOpen, changeIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialProfile);
  const {
    userId,
    userName,
    firstName,
    lastName,
    userInfo,
    login,
    types,
    anchorEl,
    isOpen,
  } = state;
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    props.onGetTypes();
  },[])

  useEffect(() => {
    props.onPushError('');

    if (props.user !== null) {
      dispatch({ type: 'changeUserId', payload: props.user.userId })
      dispatch({ type: 'changeUserName', payload: props.user.userName })
      dispatch({ type: 'changeFirstName', payload: props.user.firstName })
      dispatch({ type: 'changeLastName', payload: props.user.lastName })
      dispatch({ type: 'changeUserInfo', payload: props.user.userInfo })
      dispatch({ type: 'changeLogin', payload: props.user.login })
      dispatch({ type: 'changeUserTypes', payload: props.user.userTypes })
      props.onSaveUserData(props.user)
    } else if (token !== null) {
      props.getMyProfileAction();
    } else {
      props.history.push('/');
    }
  },[props.user])

  const onChangeUserName = event => dispatch({ type: 'changeUserName', payload: event.target.value })
  const onChangeFirstName = event => dispatch({ type: 'changeFirstName', payload: event.target.value })
  const onChangeLastName = event => dispatch({ type: 'changeLastName', payload: event.target.value })
  const onChangeUserInfo = event => dispatch({ type: 'changeUserInfo', payload: event.target.value })
  const onChangeLogin = event => dispatch({ type: 'changeLogin', payload: event.target.value })

  const handleClick = event => {
    dispatch({ type: 'changeIsOpen', payload: true });
    dispatch({ type: 'changeAnchorEl', payload: event.currentTarget })
  };

  const handleClose = () => {
    dispatch({ type: 'changeIsOpen', payload: false });
  };

  const addType = (userId, typeTitle) => {
    if ( types.indexOf(typeTitle) < 0 ) {
      props.onAddTypeToUser({ userId, typeTitle, myProf: true });
    } else {
      alert('Already in use!');
    }
  }


  const renderTypesList = () => (
    <Paper className={classes.root}>
      { types.map((item, index) => {
          return <Chip
            id={index}
            label={item}
            onDelete={item === 'defaultUser' ? undefined : () => props.onRemoveUserTypeAction({ userId, typeTitle: item, myProf: true })}
            className={classes.chip}
          />
        })
      }
    </Paper>
  )

  const goBack = () => props.history.push('/home');
  const save = () => props.onPatchUserAction({ userId, userName, firstName, lastName, userInfo, login, goBack });

  // const isConfirmedPassword = password === confirmPassword && password.length >= 8;
  const isFilledAll = userName !== '' && firstName !== '' && lastName !== '' && login !== '' ? true : false; 

  const menuUser = { _id: userId };

  if (props.user === null) {
    return null;
  }
  return (
    <div className="App">
      <header className="App-header">
      <form className={classes.container} noValidate autoComplete="off">
        <h2>My Profile</h2>
        <text className={classes.error}>{props.error}</text>
        { renderTypesList() }
        <TypeMenu
          anchorEl={anchorEl}
          userDetailsOpen={isOpen}
          handleClose={handleClose}
          addType={addType}
          types={props.types}
          user={menuUser}
        />
        <Button style={{ marginLeft: 4, marginBottom: 7 }} aria-controls="simple-menu" aria-haspopup="true" color="primary" onClick={handleClick}>
          Add type
        </Button>
        <CustomTextField
          id="filled-basic"
          value={login}
          onChange={onChangeLogin}
          label='Login'
        />
        {/* <CustomTextField
          id="filled-basic"
          value={password}
          onChange={onChangePassword}
          label='Password'
          type="password"
        />
        <text className={password && password.length >= 8 ? classes.passwordInfoConf: classes.passwordInfoError}>
          Must be at least 8 characters
        </text>
        <CustomTextField
          id="filled-basic"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          label='Confirm password'
          type="password"
        />
        <text className={isConfirmedPassword ? classes.passwordInfoConf : classes.passwordInfoError}>
          {isConfirmedPassword ? 'Confirmed' : 'Confirm the password'}
        </text> */}
        <CustomTextField
          id="filled-basic"
          value={userName}
          onChange={onChangeUserName}
          label='User Name'
        />
        <CustomTextField
          id="filled-basic"
          value={firstName}
          onChange={onChangeFirstName}
          label='First Name'
        />
        <CustomTextField
          id="filled-basic"
          value={lastName}
          onChange={onChangeLastName}
          label='Last Name'
        />
        <CustomTextField
          id="outlined-multiline-static"
          value={userInfo}
          onChange={onChangeUserInfo}
          label='About me (Can be empty)'
          multiline
          rows="4"
        />
        <div className="buttonCont">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={goBack}
          >
            Cancel
          </Button>
          <Button
            disabled={!isFilledAll}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={save}
          >
            Save
          </Button>
        </div>
      </form>
      </header>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    types: state.types.types,
    user: state.user.user,
  }
};

const mapDispatchToProps = (dispatch) => ({
  getMyProfileAction: () => dispatch(getMyProfileAction()),
  onAddTypeToUser: (payload) => dispatch(addTypeToUserAction(payload)),
  onGetTypes: () => dispatch(getTypesAction()),
  onPatchUserAction: (payload) => dispatch(patchUserAction(payload)),
  onGetProfileInfoAction: (payload) => dispatch(getProfileInfoAction(payload)),
  onRemoveUserTypeAction: (payload) => dispatch(removeUserTypeAction(payload)),
  onSaveUserData: (payload) => dispatch(saveUserData(payload)),
  onPushError: (payload) => dispatch(pushError(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyProfile));
