
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  alpha,
  Avatar,
  Menu,
  MenuItem,
  DialogContent,
  Dialog,
  Badge,
  ClickAwayListener,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ButtonComponent from 'src/components/shared/Button';
import { ReactComponent as LeftArrow } from '../../../assets/images/arrow-left 2.svg';
import { ReactComponent as Profile } from '../../../assets/images/profile-circle 2.svg';
import { ReactComponent as Calendar } from '../../../assets/images/calendar.svg';
import { ReactComponent as CloseIcon } from '../../../assets/images/close-circle.svg';
import { ReactComponent as LogOut } from '../../../assets/images/logout.svg';
import { ReactComponent as Add } from '../../../assets/images/add-square.svg';
import { ReactComponent as PreviousIcon } from '../../../assets/images/arrow-left 2.svg';
import { ReactComponent as Notification } from '../../../assets/images/notification.svg';
import { ReactComponent as Dashboard } from '../../../assets/images/dashboard.svg';
import { ReactComponent as Job } from '../../../assets/images/job.svg';
import { ReactComponent as Settings } from '../../../assets/images/setting-2.svg';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import DialogBox from 'src/components/shared/Dialog/DialogBox';
import CustomTabs from 'src/components/shared/CustomTabs/CustomTabs';
import {
  TabsContainer,
  HeaderPart,
  ProfileContainer,
  ProfileAvatar,
  ProfileIcon,
  BoxContainer,
  FooterPart,
  SaveButton,
} from './Styles';
import useResponsive from 'src/components/hooks/useResponsive';
import logo from '../../../assets/images/Viscera_Logo.svg';
import ChatIcon from '@mui/icons-material/Chat';
import { logout } from '../../../modules/auth/store/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { palette, shadows } from 'src/config/theme';

function Header({ isPermanentOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openCalendarDialog, setOpenCalendarDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);
 
  const user = useSelector((state) => state.auth.user);

const role = (user?.role ?? localStorage.getItem('role'))?.toLowerCase();

const userName = user?.fullName || 'User';
const userRole = role || 'user';



  const notifications = [
    { id: 1, title: 'New application received', time: '2m ago' },
    { id: 2, title: 'Shift approved', time: '10m ago' },
    { id: 3, title: 'Profile updated successfully', time: '1h ago' },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };


  const nurseMenu = [
    {
      label: 'Dashboard',
      icon: <Dashboard style={{ width: 22, height: 22 }} />,
      action: () => navigate('/nurse/dashboard'),
    },
    {
      label: 'My Profile',
      icon: <Profile style={{ width: 22, height: 22 }} />,
      action: () => navigate('/nurse/profile'),
    },
    {
      label: 'My Jobs',
      icon: <Job style={{ width: 22, height: 22 }} />,
      action: () => navigate('/nurse/jobdashboard'),
    },
      {
      label: 'Settings',
      icon: <Settings style={{ width: 22, height: 22 }} />,
      action: () => navigate('/nurse/settings'),
    },
  ];

  const recruiterMenu = [
     {
      label: 'Dashboard',
      icon: <Dashboard style={{ width: 22, height: 22 }} />,
      action: () => navigate('/recruiter/dashboard'),
    },
     {
      label: 'Manage Job',
      icon: <WorkOutlineOutlinedIcon sx={{ width: 22, height: 22, fontSize:'medium' }} />,
      action: () => navigate('/recruiter/manageJobs'),
    },
    {
      label: 'Post New Job',
      icon: <Add style={{ width: 22, height: 22 }} />,
      action: () => navigate('/recruiter/jobform'),
    },
    {
      label: 'My Packages',
      icon: <Job style={{ width: 22, height: 22 }} />,
      action: () => navigate('/recruiter/selectplan'),
    },
    {
      label: 'Billing & Payments',
      icon: <Calendar style={{ width: 22, height: 22 }} />,
      action: () => navigate('/recruiter/payments'),
    },
    {
      label: 'Organization',
      icon: <Profile style={{ width: 22, height: 22 }} />,
      action: () => navigate('/recruiter/organization'),
    },
    {
      label: 'Global Settings',
      icon: <HubOutlinedIcon sx={{ width: 22, height: 22 }} />,
      action: () => navigate('/recruiter/globalSettings'),
    },
    {
        label: 'Settings',
      icon: <Settings style={{ width: 22, height: 22 }} />,
      action: () => navigate('/recruiter/settings'),
    },
    
  ];
  const logoutItem = {
    label: 'Logout',
    icon: <LogOut style={{ width: 22, height: 22 }} />,
    action: handleLogout,
  };

const menuItems =
  role === 'recruiter'
    ? [...recruiterMenu, logoutItem]
    : [...nurseMenu, logoutItem];


  return (
    <>
      <AppBar
        sx={{
          position: 'fixed',
          bgcolor: theme.palette.gery.white,
          paddingX: isMobile || isTablet ? '20px' : 2,
          boxShadow: 'none',
          borderBottom: '1px solid #0000001A',
          height: isMobile || isTablet ? '72px' : '84px',
          display: 'flex',
          justifyContent: 'center',
          width: { xs: '100%', sm: '100%', md: '100%' },
        }}
        disableGutters
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              {isDesktop && location.pathname.includes('/appointment/Patients/') && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <IconButton sx={{ marginRight: '10px' }}>
                    <LeftArrow width={24} height={24} />
                  </IconButton>
                  <Typography variant="h5" color="black" sx={{ marginLeft: '-20px' }}>
                    Back
                  </Typography>
                </Box>
              )}
              {(isDesktop || isMobile || isTablet) && (
                <img src={logo} alt="Logo" style={{ height: '40px', width: '142px' }} />
              )}
            </Box>
            <Box sx={{ height: '52px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ClickAwayListener onClickAway={() => setNotificationOpen(false)}>
                  <Box sx={{ position: 'relative' }}>
                    <Badge badgeContent={notifications.length} color="error">
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          width: 36,
                          height: 36,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: theme.palette.primary.dark },
                        }}
                        onClick={() => setNotificationOpen((prev) => !prev)}
                      >
                        <Notification
                          style={{ color: theme.palette.gery.white, width: '24px', height: '24px' }}
                        />
                      </Avatar>
                    </Badge>
                    {notificationOpen && (
                      <Paper
                        sx={{
                          position: 'absolute',
                          top: '50px',
                          right: 0,
                          width: 450,
                          p: 1,
                          zIndex: 10,
                          borderRadius: 2,
                          boxShadow: 4,
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          Notifications
                        </Typography>
                        {notifications.map((n) => (
                          <Box
                            key={n.id}
                            sx={{
                              mb: 1,
                              p: 1,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              borderRadius: 1,
                            }}
                          >
                            <Typography variant="body2">{n.title}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {n.time}
                            </Typography>
                          </Box>
                        ))}
                      </Paper>
                    )}
                  </Box>
                </ClickAwayListener>

                <Avatar
                  onClick={() => navigate('/nurse/chatList')}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 36,
                    height: 36,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: theme.palette.primary.dark },
                  }}
                >
                  <ChatIcon sx={{ color: 'white', fontSize: '20px' }} />
                </Avatar>
              </Box>

              <Box
                sx={{
                  width: isMobile || isTablet ? 'auto' : '209px',
                  height: '52px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  src={''}
                  sx={{
                    width: isMobile || isTablet ? '40px' : '52px',
                    height: isMobile || isTablet ? '40px' : '52px',
                    backgroundColor: palette.primary.light2,
                    color: palette.primary.main,
                  }}
                >
                  {userName?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                {isDesktop && (
                  <Box>
                    <Typography
                      variant={theme.typography.h3}
                      color={theme.palette.gery.black}
                      sx={{ textWrap: 'nowrap' }}
                    >
                      {userName}
                    </Typography>
                    <br />
                    <Typography
                      variant={theme.typography.smallRegular}
                      color={`${alpha(theme.palette.gery.black, 0.698)}`}
                    >
                      as an {userRole}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Menu
                PaperProps={{
                  sx: {
                    backgroundColor: palette.gery.white,
                    boxShadow: shadows[4],
                    borderRadius: '12px',
                    border: `1px solid ${alpha(theme.palette.gery.black, 0.14)}`,
                  },
                }}
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      handleCloseUserMenu();
                      item.action();
                    }}
                  >
                    <Typography
                      variant="h65"
                      sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      {item.icon}
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <DialogBox open={openProfileDialog}>
        <HeaderPart>
          Doctor Profile
          <CloseIcon
            width={isMobile || isTablet ? 18 : 24}
            height={isMobile || isTablet ? 18 : 24}
            onClick={() => setOpenProfileDialog(false)}
            style={{ cursor: 'pointer' }}
          />
        </HeaderPart>
        <DialogContent sx={{ pl: 0, pr: 0, pb: 0 }}>
          <BoxContainer>
            <ProfileContainer>
              <ProfileAvatar>D</ProfileAvatar>
              <ProfileIcon>
                <Add width="18px" height="18px" />
              </ProfileIcon>
              <input type="file" accept="image/*" style={{ display: 'none' }} />
            </ProfileContainer>
          </BoxContainer>
          <TabsContainer>
            <CustomTabs
              value={selectedTab}
              onChange={(index) => setSelectedTab(index)}
              sx={{
                tabStyles: {
                  color: `${alpha(palette.gery.black, 0.7)}`,
                  selectedColor: palette.primary.main,
                  height: '56px',
                },
                indicatorStyles: { color: palette.primary.main, height: '2px' },
              }}
            />
          </TabsContainer>
        </DialogContent>
        <FooterPart>
          {selectedTab > 0 && (
            <ButtonComponent
              variant="none"
              startIcon={
                <PreviousIcon
                  width={isMobile || isTablet ? '18px' : '24px'}
                  height={isMobile || isTablet ? '18px' : '24px'}
                  sx={{ color: palette.primary.main, ...(isMobile ? theme.typography.h6 : {}) }}
                />
              }
              onClick={() => setSelectedTab((prev) => prev - 1)}
            >
              Previous
            </ButtonComponent>
          )}
          <SaveButton
            type="submit"
            variant="outlined"
            startIcon={
              <Add
                width={isMobile || isTablet ? '18px' : '24px'}
                height={isMobile || isTablet ? '18px' : '24px'}
                sx={{ color: palette.primary.main }}
              />
            }
          />
        </FooterPart>
      </DialogBox>

      <Dialog open={openCalendarDialog} onClose={() => setOpenCalendarDialog(false)}></Dialog>
    </>
  );
}

export default Header;
