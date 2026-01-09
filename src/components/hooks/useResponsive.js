// hooks/useResponsive.js
import { useTheme, useMediaQuery } from '@mui/material';
import theme from 'src/config/theme';

const useResponsive = () => {
    // const theme = useTheme();

    return {
        isMobile: useMediaQuery(theme.breakpoints.down('sm')),
        isTablet: useMediaQuery(theme.breakpoints.between('sm', 'md')),
        isDesktop: useMediaQuery(theme.breakpoints.up('md')),
    };
};

export default useResponsive;
