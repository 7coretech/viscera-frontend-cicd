
import React, { useState } from "react";
import { Hidden, IconButton, alpha } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ReactComponent as Calender } from "../../../assets/images/calendar.svg";
import { ReactComponent as Clock } from "../../../assets/images/clock.svg";
import dayjs from "dayjs"; // Import dayjs
import theme, { typography } from "src/config/theme";
import { ReactComponent as ArrowDown } from '../../../assets/images/arrow-down.svg';
import { ReactComponent as ArrowLeft } from '../../../assets/images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../assets/images/arrow-right.svg';
import useResponsive from "src/components/hooks/useResponsive";

const DateTimePicker = ({
  label,
  value,
  onChange,
  type = "date",
  sx = {},
  minDate = null,
  maxDate = null,
  disabled = false,
  error = false,
  helperText = "",
  name,
}) => {
  const [currentView, setCurrentView] = useState('day');
  const [open, setOpen] = useState(false);
  const CustomArrowDownIcon = () => <ArrowDown
    width={isMobile || isTablet ? 18 : 24}
    height={isMobile || isTablet ? 18 : 24} />;
  const { isMobile, isTablet } = useResponsive();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      {type === "date" ? (
        <DatePicker
          disabled={disabled}
          value={value ? dayjs(value).isValid() ? dayjs(value) : null : null}
          onChange={(newValue, context) => {
            if (context?.validationError) return;
            if (newValue?.isValid()) {
              console.log("Selected date:", newValue.format('DD/MM/YYYY'));
              if (currentView === 'day') {
                setOpen(false);
                onChange(newValue?.format('YYYY-MM-DD'));
              }
            }
          }}
          view={currentView}
          onViewChange={(newView) => setCurrentView(newView)}
          views={['year', 'month', 'day']}
          format="DD/MM/YYYY"
          minDate={minDate ? dayjs(minDate) : null}
          maxDate={maxDate ? dayjs(maxDate) : null}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          slots={{
            switchViewIcon: CustomArrowDownIcon,
            leftArrowIcon: ArrowLeft,
            rightArrowIcon: ArrowRight
          }}
          slotProps={{
            textField: {
              name: name,
              fullWidth: true,
              label: label,
              error: error,
              helperText: helperText,
              variant: 'outlined',
              InputLabelProps: { shrink: true },
              sx: {
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  ...sx,
                },

                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  ...(isMobile || isTablet ? theme.mobileTypography.body2 : theme.typography.h5),
                },

              },
              InputProps: {
                endAdornment: (
                  <IconButton
                    width={isMobile || isTablet ? 18 : 24}
                    height={isMobile || isTablet ? 18 : 24}
                    onClick={() => { if (!open) setOpen(true) }}
                    sx={{
                      padding: 0,
                      minWidth: "auto",
                    }}
                  >
                    <Calender
                      width={isMobile || isTablet ? 18 : 24}
                      height={isMobile || isTablet ? 18 : 24}
                    />
                  </IconButton>
                ),
              },
            }
          }}

        />
      ) : (
        <TimePicker
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            setOpen(false);
            onChange(newValue);
          }}
          format="HH:mm"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          slotProps={{
            textField: {
              fullWidth: true,
              label: label,
              // readOnly: true,
              sx: {
                height: "52px",
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "12px",
                  ...sx,
                },
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  ...(isMobile || isTablet ? theme.mobileTypography.body2 : theme.typography.h5),
                },
              },
              InputProps: {
                endAdornment: (
                  <IconButton
                    width={isMobile || isTablet ? 18 : 24}
                    height={isMobile || isTablet ? 18 : 24}
                    onClick={() => setOpen(true)} // Open Picker
                    sx={{
                      padding: 0,
                      minWidth: "auto",
                      "& .MuiSvgIcon-root": {
                        fill: "red",
                      },
                    }}
                  >
                    <Clock width={isMobile || isTablet ? 18 : 24}
                      height={isMobile || isTablet ? 18 : 24} />
                  </IconButton>
                ),
              },
            },
          }}
        />
      )}
    </LocalizationProvider>
  );
};
export default DateTimePicker;








