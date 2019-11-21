import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    width: 300,
    backgroundColor: 'inheirt',
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: 0,
    boxShadow: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  addType: {
    marginLeft: 4,
    marginBottom: 7,
  },
}));

export default useStyles;
