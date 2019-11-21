import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';

const LoginCont = (props) => {
  const classes = useStyles();

  const {
    error,
    login,
    onChangeLogin,
    password,
    onChangePassword,
    signIn,
    goToRegistration,
  } = props;
  return (
    <div className="App-header">
      <form className={classes.container} noValidate autoComplete="off">
        <h1>Welcome</h1>
        <text className={classes.error}>{error || ''}</text>
        <div>
          <TextField
            value={login}
            id="filled-basic"
            className={classes.textField}
            label="Login"
            margin="normal"
            variant="filled"
            onKeyPress={event => event.key === 'Enter' ?  signIn() : null}
            onChange={onChangeLogin}
          />
        </div>
        <div>
          <TextField
            value={password}
            id="filled-basic"
            type="password"
            className={classes.textField}
            label="Password"
            margin="normal"
            variant="filled"
            onChange={onChangePassword}
            onKeyPress={event => event.key === 'Enter' ?  signIn() : null}
          />
        </div>
        <div className="buttonsCont">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={signIn}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={goToRegistration}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
};

export default LoginCont;
