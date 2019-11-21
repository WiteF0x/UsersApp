import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
}));

export default useStyles;
