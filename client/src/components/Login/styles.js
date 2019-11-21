import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    backgroundColor: 'white',
  },
  button: {
    width: 140,
    margin: theme.spacing(1),
    height: 45,
  },
  input: {
    display: 'none',
  },
  error: {
    fontSize: 12,
    color: 'red',
    height: 15,
    textAlign: 'left',
    marginLeft: 25,
    marginBottom: 0,
    width: 300,
  },
}));

export default useStyles;