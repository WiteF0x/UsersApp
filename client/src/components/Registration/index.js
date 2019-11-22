import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import CustomTextField from '../customTextField';
import { singUpAction } from '../../redux/actions/auth';
import { pushError } from '../../redux/actions/error';
import  useStyles from './styles';
import './registration.css';

const initialState = {
  userName: '',
  firstName: '',
  lastName: '',
  userInfo: '',
  login: '',
  password: '',
  confirmPassword: '',
};

function reducer(state, action) {
  switch (action.type) {
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
    case 'changePassword':
      return { ...state, password: action.payload };
    case 'changeConfirmPassword':
      return { ...state, confirmPassword: action.payload };
  }
}

const Registration = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    userName,
    firstName,
    lastName,
    userInfo,
    login,
    password,
    confirmPassword,
  } = state;
  const classes = useStyles();

  useEffect(() => {
    console.log('password', password.length);
    props.onPushError('');
    const token = JSON.parse(localStorage.getItem('token'));
    if (token !== null) {
      props.history.push('/home');
    }
  },[])

  const onChangeUserName = event => dispatch({ type: 'changeUserName', payload: event.target.value});
  const onChangeFirstName = event => dispatch({ type: 'changeFirstName', payload: event.target.value});
  const onChangeLastName = event => dispatch({ type: 'changeLastName', payload: event.target.value});
  const onChangeUserInfo = event => dispatch({ type: 'changeUserInfo', payload: event.target.value});
  const onChangeLogin = event =>  dispatch({ type: 'changeLogin', payload: event.target.value});
  const onChangePassword = event => dispatch({ type: 'changePassword', payload: event.target.value});
  const onChangeConfirmPassword = event => dispatch({ type: 'changeConfirmPassword', payload: event.target.value});

  const singUp = () => props.onSingUp({ firstName, lastName, userName, login, password, userInfo, goHome });
  const goBack = () => props.history.push('/');
  const goHome = () => props.history.push('/home');

  const isConfirmedPassword = password === confirmPassword && password.length >= 8 && password.length >= 8;
  const isFilledAll = userName.trim() !== '' && firstName.trim() !== '' && lastName.trim() !== '' && login.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' ? true : false; 
  return (
    <div className="App">
      <header className="App-header">
      <form className={classes.container} noValidate autoComplete="off">
        <h2>Registration</h2>
        <text className={classes.error}>{props.error}</text>
        <CustomTextField
          id="filled-basic"
          value={login}
          onChange={onChangeLogin}
          label='Login'
        />
        <CustomTextField
          id="filled-basic"
          value={password}
          onChange={onChangePassword}
          label='Password'
          type="password"
        />
        <text className={password.length >= 8 ? classes.passwordInfoConf: classes.passwordInfoError}>
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
        </text>
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
            Go Back
          </Button>
          <Button
            disabled={!isFilledAll}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={singUp}
          >
            Sign Up
          </Button>
        </div>
      </form>
      </header>
    </div>
  );
};

const mapStateToProps = function(state) {
  return {
    error: state.error.error,
  }
};

const mapDispatchToProps = (dispatch) => ({
  onSingUp: (payload) => dispatch(singUpAction(payload)),
  onPushError: (payload) => dispatch(pushError(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registration));
