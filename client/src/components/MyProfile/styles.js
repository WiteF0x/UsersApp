import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    backgroundColor: '#282c34',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  card: {
    minWidth: 375,
    backgroundColor: 'lightgrey',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
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
