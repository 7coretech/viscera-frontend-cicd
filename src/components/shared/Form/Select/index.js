import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import theme from 'src/config/theme'
import {
  ListItemIcon,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from "@mui/material/styles";
import { ReactComponent as ArrowDownIcon } from '../../../../assets/images/arrow-down.svg';
import useResponsive from 'src/components/hooks/useResponsive';

import { alpha } from '@mui/material';
const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  fullWidth: PropTypes.bool,
  optLabel: PropTypes.string,
  optValue: PropTypes.string,
  showNone: PropTypes.bool,
  color: PropTypes.string,
};
const defaultProps = {
  className: undefined,
  variant: 'standard',
  name: undefined,
  label: undefined,
  value: '',
  defaultValue: undefined,
  placeholder: 'Select',
  multiple: false,
  fullWidth: false,
  optLabel: 'label',
  optValue: 'value',
  showNone: false,
  sx: {},
  color: 'primary',
};

const InputSelect = ({
  className,
  variant,
  label,
  name,
  value,
  defaultValue,
  placeholder,
  options,
  onChange,
  multiple,
  fullWidth,
  helperText,
  margin,
  optLabel,
  optValue,
  showNone,
  color,
  tip,
  sx,
  ...props
}) => {

  const handleChange = (event) => {
    onChange(event.target.value, event);
  };

  const placeholderExist = typeof placeholder === 'string' && !!placeholder;
  const { isMobile, isTablet } = useResponsive();

  return (
    <FormControl
      sx={{
          height:'56px',

    '& .MuiOutlinedInput-root, & .MuiSelect-select': {
      height: "56px !important",
      minHeight: "56px !important",
      display: "flex",
      alignItems: "center",
      borderRadius:"12px",
    },

    // outline match
    '& fieldset': {
      borderRadius: "12px",
    },

   
    
        ...(placeholderExist
          ? {

            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: `1px solid ${alpha(theme.palette.gery.black, 0.14)}`,
                borderRadius: '12px',

              },

              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputLabel-root': {
              background: 'white',
              padding: '0px 8px',
            },
            '& .MuiSelect-select:has(.notranslate) ~ input': {
              height: '100%',
              opacity: 1,
              padding: '0 14px',
              fontSize: isMobile || isTablet ? theme.mobileTypography.body2 : theme.typography.h5,
              border: 'none',
              '&::placeholder': {
                color: '#c4c4c4',
              },
            },
          }
          : {}),
        ...sx,
      }}
      fullWidth={fullWidth}
      margin={margin}
      error={props.error}
    >
      <InputLabel {...(placeholderExist ? { shrink: true } : {})} id={`${props.id}-label`}>
        {label}
      </InputLabel>
      <Select
        sx={{
          lineHeight: 'normal',
          '& .MuiSelect-select': {

            // padding: '10px 18px',
            // position: 'relative',
          },
          // '& .MuiSelect-icon': {
          //   position: 'absolute',
          //   // right: '10px',
          //   width: '24px',
          //   top: 0,
          // },
        }}

        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root': {
                backgroundColor: theme.palette.gery.white, // Background color for each item
                color: theme.palette.gery.black, // Text color
                fontSize: isMobile || isTablet ? theme.mobileTypography.body2 : theme.typography.body1,
                '&:hover': {
                  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
                  color: '#000',
                },
                '&.Mui-selected': {
                  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,// Selected item background
                  color: theme.palette.gery.black,
                  fontSize: isMobile || isTablet ? theme.mobileTypography.body2 : theme.typography.body1,

                },
              },
            },
          },
        }}
        labelId={`${props.id}-label`}
        {...(placeholderExist
          ? {
            placeholder: placeholder.endsWith('*') ? placeholder.slice(0, -1) : placeholder,
          }
          : {})}
        id={props.id}
        onChange={handleChange}
        variant={variant}
        name={name}
        label={label}
        defaultValue={value}
        value={value}
        {...props}
        color={color}
        multiple={multiple}
        placeholder={placeholder}
        // IconComponent={ArrowDownIcon}
      >
        {/* {showNone && !multiple && <MenuItem value="">{placeholder || 'None'}</MenuItem>} */}
        {showNone && !multiple && <MenuItem value="">None</MenuItem>}

        {(() => {
          if (options && typeof options !== 'undefined' && options.length) {
            return options.map((option) => {
              return (
                <MenuItem
                  disabled={option?.disabled ? option?.disabled : false}
                  key={option[optValue]}
                  value={option[optValue]}
                  sx={{
                    ...option.customStyle,
                  }}

                >
                  {option?.icon ? (
                    <Box display="flex" alignItems="center">
                      <ListItemIcon sx={{ minWidth: '44px' }}>{option.icon}</ListItemIcon>
                      {option[optLabel]}
                    </Box>
                  ) : (
                    option[optLabel]
                  )}
                </MenuItem>
              );
            });
          }
        })()}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl >
  );
};

InputSelect.propTypes = propTypes;
InputSelect.defaultProps = defaultProps;
InputSelect.propTypes = {
  IconComponent: PropTypes.elementType,
};

export default InputSelect;

