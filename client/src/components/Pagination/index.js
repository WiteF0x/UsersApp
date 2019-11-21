import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = (props) => {
  console.log('props.pageNumber>>>', props.pageNumber)
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

export default Pagination;
