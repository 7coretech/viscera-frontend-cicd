import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/system";
import theme from "src/config/theme";
import useResponsive from "src/components/hooks/useResponsive";

// const StyledTabs = styled(Tabs)(({ indicatorStyles }) => ({
//     "& .MuiTabs-indicator": {
//         backgroundColor: indicatorStyles?.color || "#283593",
//         height: indicatorStyles?.height || "3px",
//     },
//     "& .MuiTabs-flexContainer": {
//         gap: '2px',
//     },
// }));

const StyledTabs = styled(Tabs)(({ indicatorStyles }) => ({
    "& .MuiTabs-indicator": {
        backgroundColor: indicatorStyles?.color || "#283593",
        height: indicatorStyles?.height || "3px",
    },
    "& .MuiTabs-flexContainer": {
        gap: '2px',
    },
    "& .MuiTabs-scrollButtons": {
        // display: "inline-flex",
        [`@media (max-width:600px)`]: {
            display: "inline-flex",
        },
    },
}));

const StyledTab = styled(Tab)(({ tabStyles }) => ({
    ...theme.typography.body1,
    padding: '10px 26px',
    textTransform: "none",
    color: tabStyles?.color || "#757575",
    minHeight: tabStyles?.height || "48px",
    "&.Mui-selected": {
        color: tabStyles?.selectedColor || "#283593",
    },
    [theme.breakpoints.down('md')]: {
        // ...theme.mobileTypography.body2
    }
}));

const CustomTabs = ({
    value,
    tabs,
    onChange,
    sx = {},
}) => {
    const handleChange = (_, newValue) => {
        if (onChange) onChange(newValue);
    };
    const { isMobile, isTablet } = useResponsive();

    return (
        <Box sx={{ width: "100%", backgroundColor: sx.backgroundColor || "#fff" }}>
            <StyledTabs
                value={value}
                onChange={handleChange}
                indicatorStyles={sx.indicatorStyles || {}}
                variant="scrollable"
                scrollButtons="auto"

            >
                {tabs.map((tab, index) => (
                    <StyledTab key={index} label={tab.label} tabStyles={sx.tabStyles || {}} sx={{ ...((isMobile || isTablet) ? theme.mobileTypography.h6 : theme.typography.h6) }} />
                ))}
            </StyledTabs>
        </Box>
    );
};

export default CustomTabs;
