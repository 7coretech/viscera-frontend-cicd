
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Box, useTheme, Typography, alpha, IconButton } from '@mui/material';
import useMediaQuery from 'src/components/hooks/useMediaQuery';
import theme from 'src/config/theme';
import { ReactComponent as ArrowLeft } from '../../../assets/images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../assets/images/arrow-right.svg';

const Paging = ({ size, perPage, page, count, onChange }) => {
  const pages = Math.ceil(count / perPage);
  const { isMobile, isTablet } = useMediaQuery();
  const { palette } = useTheme();

  const handleChange = (event, newPage) => {
    if (page !== newPage - 1) {
      onChange(newPage - 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      onChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < pages - 1) {
      onChange(page + 1);
    }
  };

  let paginationProps = {
    showFirstButton: true,
    showLastButton: true,
    boundaryCount: 1,
  };

  if (isMobile) {
    paginationProps = {
      showFirstButton: false,
      showLastButton: false,
      boundaryCount: 0,
    };
  } else if (isTablet) {
    paginationProps = {
      showFirstButton: false,
      showLastButton: false,
      boundaryCount: 1,
    };
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" alignSelf="stretch" padding="0px 20px" height="24px" >
      {/* Record Count Display */}
      <Box display="flex" alignItems="center" gap="8px">
        <Typography variant="h6" sx={{ color: theme.palette.gery.black }}>{page * perPage + 1}</Typography>
        <Typography variant="body1" sx={{ color: `${alpha(theme.palette.gery.black, 0.70)}` }}>of</Typography>
        <Typography variant="h6" sx={{ color: theme.palette.gery.black }}>{count}</Typography>
        <Typography variant="body1" sx={{ color: `${alpha(theme.palette.gery.black, 0.70)}` }}>records</Typography>
      </Box>

      {/* Pagination Controls */}
      <Box display="flex" alignItems="center" gap="12px">
        <IconButton onClick={handlePrev} disabled={page === 0} sx={{ cursor: page === 0 ? 'default' : 'pointer' }}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="body1" sx={{ color: `${alpha(theme.palette.gery.black, 0.70)}` }}>Page</Typography>
        <Typography variant="h6" sx={{ color: theme.palette.gery.black }}>{page + 1}</Typography>
        <IconButton onClick={handleNext} disabled={page >= pages - 1} sx={{ cursor: page >= pages - 1 ? 'default' : 'pointer' }}>
          <ArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
};

Paging.propTypes = {
  size: PropTypes.string,
  page: PropTypes.number,
  perPage: PropTypes.number,
  count: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

Paging.defaultProps = {
  size: 'medium',
  page: 0,
  perPage: 10,
  count: 0,
};

export default Paging;
