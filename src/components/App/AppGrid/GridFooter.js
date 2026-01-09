import React from 'react';
import { TableFooter, TableRow, TableCell } from '@mui/material';
import MuiTablePagination from '@mui/material/TablePagination';
import { makeStyles } from '@mui/styles';

import Paging from '../../App/Paging';

// style for the footer
const defaultFooterStyles = makeStyles(() => ({
  footerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px !important',
    borderBottom: 'none',
  },
  paginationClasses: {
    '& [class*="MuiToolbar-root"]': {
      paddingBottom: '0px !important',
    },
  },
}));

// GridFooter to add custom css and to add custom and key feature
const GridFooter = (props) => {
  const classes = defaultFooterStyles();

  // row change event
  const handleRowChange = (event) => {
    props.changeRowsPerPage(event.target.value);
  };

  // page change event
  const handlePageChange = (_, page) => {
    props.changePage(page);
  };

  const handlePageLink = (page) => {
    props.changePage(page);
  };

  const { count, textLabels, rowsPerPage, page, pagingType } = props;

  return (
    <TableFooter>
      <TableRow sx={{ padding: 0 }}>
        {pagingType === 'links' ? (
          <Paging count={count} perPage={rowsPerPage} page={page} onChange={handlePageLink} />
        ) : (
          <TableCell className={classes.footerStyle}>
            <MuiTablePagination
              component="div"
              count={count}
              rowsPerPage={rowsPerPage || 25}
              page={page}
              className={classes.paginationClasses}
              labelRowsPerPage={textLabels.rowsPerPage}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${textLabels.displayRows} ${count}`
              }
              backIconButtonProps={{
                'aria-label': textLabels.previous,
              }}
              nextIconButtonProps={{
                'aria-label': textLabels.next,
              }}
              rowsPerPageOptions={[10, 25, 50, 100]}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowChange}
            />
          </TableCell>
        )}
      </TableRow>
    </TableFooter>
  );
};

export default GridFooter;
