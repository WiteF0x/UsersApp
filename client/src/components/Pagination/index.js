import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = (props) => {
    return (
        <TablePagination
        rowsPerPageOptions={[5]}
        colSpan={3}
        count={props.count}
        rowsPerPage={5}
        page={props.pageNumber}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={props.handleChangePage}
      />
    );
}

Pagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
}

export default Pagination;
