import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { singInAction } from '../../redux/actions/auth';
import { pushError } from '../../redux/actions/error';
import LoginCont from './Login'
import './Login.css';

const Login = (props) => {
  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');


  props.onPushError('');
  const token = JSON.parse(localStorage.getItem('token'));
  if (token !== null) {
    props.history.push('/home');
  }

  const onChangeLogin = event => changeLogin(event.target.value);
  const onChangePassword = event => changePassword(event.target.value);
  const goToRegistration = () => props.history.push('/registration');
  const goHome = () => props.history.push('/home');
  const signIn = () => {
    if (login.trim() !== '' && password.trim() !== '') {
      props.onSignIn({login, password, goHome})
    } else {
      props.onPushError('Please, fill all fields!');
    }
  }

  return (
    <LoginCont
      error={props.error}
      login={login}
      onChangeLogin={onChangeLogin}
      password={password}
      onChangePassword={onChangePassword}
      signIn={signIn}
      goToRegistration={goToRegistration}
    />
  );
}

Login.propTypes = {
  onPushError: PropTypes.func,
  error: PropTypes.string,
}

const mapStateToProps = function(state) {
  return {
    error: state.error.error,
  }
};

const mapDispatchToProps = (dispatch) => ({
  onPushError: (payload) => dispatch(pushError(payload)),
  onSignIn: (payload)  => dispatch(singInAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
