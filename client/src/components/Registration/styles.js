import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    flexDirection: 'column',
  },
  button: {
    width: 140,
    margin: theme.spacing(1),
    height: 45,
  },
  passwordInfoConf: {
    color: 'green',
    fontSize: 12,
    margin: theme.spacing(1),
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 0,
  },
  passwordInfoError: {
    color: 'red',
    fontSize: 12,
    margin: theme.spacing(1),
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 0,
  },
  error: {
    fontSize: 12,
    color: 'red',
    height: 15,
    textAlign: 'left',
    marginLeft: 7,
    marginBottom: 0,
    width: 300,
  },
}));

export default useStyles;
