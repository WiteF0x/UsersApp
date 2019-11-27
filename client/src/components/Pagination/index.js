import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './styles';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import usersPerPage from '../../constants/users';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 5,
    width: 55,
  },
}));

const Pagination = (props) => {
  const classes = useStyles();

  const leftButton = () => (
    props.pageNumber === 1
    ? <Button variant="contained" disabled>←</Button>
    : <Button variant="contained" color="primary" onClick={() => props.handleChangePage(props.pageNumber - 1)}>←</Button>
  )

  const rightButton = () => (
    props.pageNumber === props.pages
    ? <Button variant="contained" disabled>→</Button>
    : <Button variant="contained" color="primary" onClick={() => props.handleChangePage(props.pageNumber + 1)}>→</Button>
  )

  const firstPageButton = () => (
    props.pageNumber === 1
    ? <Button variant="contained" disabled style={styles.leftButton}>◀</Button>
    : <Button variant="contained" color="secondary" onClick={setFirstPage} style={styles.leftButton}>◀</Button>
  )

  const lastPageButton = () => (
    props.pageNumber === props.pages
    ? <Button variant="contained" disabled style={styles.rightButton}>▶</Button>
    : <Button variant="contained" color="secondary" onClick={setLastPage} style={styles.rightButton}>▶</Button>
  )

  const setFirstPage = () => props.handleChangePage(1);
  const setLastPage = () => props.handleChangePage(props.pages);

  const menuItem = () => (
    usersPerPage.map((item, index) => (
      <MenuItem key={index} value={item}>{item}</MenuItem>
    ))
  )

  return (
    <div style={styles.mainCont}>
      <span style={styles.perPageText}>Users per page</span>
      <FormControl className={classes.formControl}>
        <Select
          value={props.usersPerPage}
          onChange={props.handleChangeUsersPerPage}
          defaultValue={5}
          className={classes.selectEmpty}
        >
          { menuItem() }
        </Select>
      </FormControl>
      <div style={{ flexDirection: 'row' }}>
        { firstPageButton() }
        { leftButton() }

        <span style={styles.pages}>
          {props.pageNumber} of {props.pages}
        </span>

        { rightButton() }
        { lastPageButton() }
      </div>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  count: PropTypes.number,
  usersPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  changeUsersPerPage: PropTypes.func,
}

export default Pagination;
