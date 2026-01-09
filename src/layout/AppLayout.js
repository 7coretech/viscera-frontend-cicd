import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from 'src/components/App/Header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { drawerWidth, palette } from 'src/config/theme';
import { useLocation } from 'react-router-dom';
import useResponsive from 'src/components/hooks/useResponsive';
function AppLayout({ children, ...props }) {
  const location = useLocation();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isPermanentOpen, setIsPermanentOpen] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('isPermanentOpen');

    if (isMobile || isTablet) {
      setIsPermanentOpen(true);
    } else {
      setIsPermanentOpen(stored === null ? false : stored === 'true');
    }
  }, [isMobile, isTablet, isDesktop]);
  
  console.log('props');
  console.log(props);
  useEffect(() => {
    if (location.pathname === '/appointment/Patients') {
      setIsPermanentOpen(false);
      localStorage.setItem('isPermanentOpen', false);
    }
  }, [location.pathname]);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md: isPermanentOpen ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 70px)',
            lg: isPermanentOpen ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 70px)',
          },
          marginLeft: isPermanentOpen ? 0 : '0px',
          transition: 'all 0.3s ease-in-out',
          marginBottom: 4,
          // marginTop: 1,
          maxWidth: '100vw',
        }}
      >
        <Box>
          <Toolbar
            disableGutters
          >
            <Container maxWidth="xxl" disableGutters sx={{ marginBottom: '83px' }}>
              <Header isPermanentOpen={isPermanentOpen} />
            </Container>
          </Toolbar>
        </Box>
        <Container maxWidth="xxl" disableGutters>
          {/* {children} */}
          {React.Children.map(children, child =>
            React.isValidElement(child) ? React.cloneElement(child, { isPermanentOpen }) : child
          )}
        </Container>

      </Box>
    </Box>
  );
}
export default AppLayout;





