


import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import theme from "src/config/theme";
import useResponsive from "src/components/hooks/useResponsive";

const NumberInput = ({
  value,
  onChange,
  min = 0,
  max = 40000,
  step = 1,
  width = "100%",
  height = "40px",
  borderRadius = "10px",
  error = false,
  helperText = "",
  disabled = false, // <- NEW
}) => {

  // Function to update the number
  const handleChange = (newValue) => {
    if (newValue === "") {
      onChange(""); // Allow clearing the input
    } else {
      const numericValue = parseInt(newValue, 10);
      if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
        onChange(numericValue);
      }
    }
  };

  const { isMobile, isTablet } = useResponsive();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius,
        width,
        height,
        padding: "5px 10px",
        backgroundColor: "white",
        error: error,
        helperText: helperText,

      }}
    >
      {/* Custom Input Field */}
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          textAlign: "left",
          // fontSize: "16px",
          ...((isMobile || isTablet) ? theme.mobileTypography.body2 : theme.typography.h5),
          background: "transparent",
          appearance: "textfield", // Prevent default number input arrows
        }}
      />

      {/* Custom Up/Down Buttons */}
      <Box display="flex" flexDirection="column">
        <IconButton
          size="small"
          onClick={() => handleChange(value + step)}
          sx={{ padding: "0", height: "14px" }}
          disabled={disabled || value >= max}
        >
          <KeyboardArrowUp fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleChange(value - step)}
          sx={{ padding: "0", height: "14px" }}
          disabled={disabled || value <= min}
        >
          <KeyboardArrowDown fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

// Define Props
NumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default NumberInput;

