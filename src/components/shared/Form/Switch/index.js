import React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import useResponsive from 'src/components/hooks/useResponsive';

import {
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  FormHelperText,

} from '@mui/material';




function SwitchComponent({
  label,
  labelPlacement,
  color,
  onChange,
  error,
  value,
  helperText,
  sx,
  ...props
}) {
  const handleChange = (event) => {
    onChange(!value);
  };

  const theme = useTheme();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const CustomSwitch = styled(Switch)(({ theme }) => ({

    display: "flex",
    alignItems: "center",


    '& .MuiSwitch-switchBase': {
      // When the switch is ON
      '&.Mui-checked': {
        color: theme.palette.gery.white,
      },
      '&.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
      // When the switch is OFF
      '&:not(.Mui-checked)': {
        color: theme.palette.primary.main,
        margin: '0 6px'
      },
    },
    '& .MuiSwitch-thumb': {
      width: "20px",
      height: "20px",
    },
    '& .MuiSwitch-track': {
      padding: '2px 20px',
      width: "42px",
      height: "24px",
      borderRadius: "31px",
      backgroundColor: theme.palette.primary.light2,
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: theme.transitions.duration.shortest,
      }),
      '&:before, &:after': {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "31px",
      },
    },
  }));

  return (
    <Box mt={2} sx={sx}>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value={value}
            // control={<Switch color={color} checked={value} onChange={handleChange} />}
            control={<CustomSwitch checked={value} onChange={handleChange} />}
            label={label}
            labelPlacement={labelPlacement}
            {...props}
          />
          {helperText && helperText !== '' ? <FormHelperText>{helperText}</FormHelperText> : null}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

SwitchComponent.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'error']),
  size: PropTypes.oneOf(['medium', 'small']),
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

SwitchComponent.defaultProps = {
  className: undefined,
  label: undefined,
  labelPlacement: 'end',
  onChange: () => { },
  variant: 'standard',
  color: 'primary',
  size: 'medium',
  disabled: false,
  sx: {},
};
export default SwitchComponent;
