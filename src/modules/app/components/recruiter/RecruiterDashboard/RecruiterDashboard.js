import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  useTheme,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/components/hooks/useResponsive';
import ButtonComponent from 'src/components/shared/Button';
import {
  CardContainer,
  HorizontalContainer,
  VerticalContainer
} from 'src/modules/app/utility/Styles';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HistoryIcon from '@mui/icons-material/History';

import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RecruiterDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();

  const stats = [
    { label: 'Active Jobs', value: 5, icon: WorkOutlineIcon, bg: theme.palette.primary.light4, color: theme.palette.primary.main },
    { label: 'Applicants', value: 35, icon: PeopleOutlineIcon, bg: theme.palette.actionLight.green, color: theme.palette.action.green },
    { label: 'Profile Views', value: '1.2k', icon: VisibilityOutlinedIcon, bg: theme.palette.actionLight.blue, color: theme.palette.action.blueLight },
    { label: 'Credits Left', value: 450, icon: AccountBalanceWalletOutlinedIcon, bg: theme.palette.accent.light, color: theme.palette.accent.main },
  ];

  const jobMetrics = [
    { title: 'Total Listings', count: 12, sub: 'Combined active and inactive jobs', color: theme.palette.primary.main },
    { title: 'Drafts', count: 3, sub: 'Unpublished job posts', color: theme.palette.gery.medium },
    { title: 'Active Posts', count: 9, sub: 'Currently visible to candidates', color: theme.palette.action.green },
  ];

  const recentActivity = [
    { title: 'Job Posted', desc: 'Senior UI/UX Designer', time: '2 hours ago', color: theme.palette.primary.main },
    { title: 'Profile View', desc: 'Tech Solutions Inc. viewed profile', time: '4 hours ago', color: theme.palette.action.blueLight },
    { title: 'Credit Usage', desc: '50 Credits used for Premium Post', time: 'Yesterday', color: theme.palette.accent.main },
  ];

  return (
    <Box
      sx={{
        p: isMobile || isTablet ? 2 : 4,
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: theme.palette.gery.extraLight,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' }
      }}
    >
      <HorizontalContainer sx={{ justifyContent: 'space-between', mb: 4, alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <VerticalContainer>
          <Typography sx={{ ...theme.typography.h1, color: theme.palette.gery.black }}>
            Recruiter Dashboard
          </Typography>
          <Typography sx={{ ...theme.typography.smallRegular, color: theme.palette.gery.dark }}>
            Manage your hiring and organization settings
          </Typography>
        </VerticalContainer>

        <ButtonComponent
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/recruiter/jobform')}
          sx={{ px: 3, height: 45, borderRadius: '10px', width: isMobile ? '100%' : 'auto' }}
        >
          Post New Job
        </ButtonComponent>
      </HorizontalContainer>

      <Grid container spacing={3}>
        {stats.map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <CardContainer 
              sx={{ 
                p: 2.5,
                height: '100%',
                border: `1px solid ${theme.palette.gery.light}`,
                boxShadow: theme.shadows[1],
                '&:hover': { boxShadow: theme.shadows[3], transform: 'translateY(-2px)' },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <HorizontalContainer sx={{ gap: 2 }}>
                <Avatar
                  sx={{
                    width: 52,
                    height: 52,
                    backgroundColor: item.bg,
                    borderRadius: '12px',
                  }}
                >
                  <item.icon sx={{ color: item.color, fontSize: 28 }} />
                </Avatar>
                <VerticalContainer>
                  <Typography sx={{ ...theme.typography.h2, fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                  <Typography sx={{ ...theme.typography.smallRegular, color: theme.palette.gery.dark, fontSize: '14px' }}>
                    {item.label}
                  </Typography>
                </VerticalContainer>
              </HorizontalContainer>
            </CardContainer>
          </Grid>
        ))}

        <Grid item xs={12} md={7}>
          <CardContainer sx={{ p: 0, height: '100%', overflow: 'hidden', border: `1px solid ${theme.palette.gery.light}` }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.gery.light}` }}>
              <Typography sx={{ ...theme.typography.h3 }}>Job Management</Typography>
            </Box>

            <Box sx={{ p: 2 }}>
              {jobMetrics.map((job, i) => (
                <HorizontalContainer
                  key={i}
                  onClick={() => navigate('/recruiter/manageJobs')}
                  sx={{
                    justifyContent: 'space-between',
                    p: 2,
                    cursor: 'pointer',
                    borderRadius: '12px',
                    mb: i < jobMetrics.length - 1 ? 1 : 0,
                    transition: '0.2s',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light5,
                      '& .arrow-icon': { transform: 'translateX(4px)' }
                    },
                  }}
                >
                  <HorizontalContainer sx={{ gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 4, 
                        height: 40, 
                        borderRadius: 4, 
                        bgcolor: job.color 
                      }} 
                    />
                    <VerticalContainer>
                      <Typography sx={{ ...theme.typography.small, fontWeight: 600 }}>
                        {job.title}
                      </Typography>
                      <Typography sx={{ ...theme.typography.smallRegular, color: theme.palette.gery.dark, fontSize: '13px' }}>
                        {job.sub}
                      </Typography>
                    </VerticalContainer>
                  </HorizontalContainer>

                  <HorizontalContainer sx={{ gap: 2 }}>
                    <Chip
                      label={job.count}
                      sx={{
                        bgcolor: theme.palette.primary.light2,
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                        borderRadius: '8px'
                      }}
                    />
                    <ChevronRightIcon className="arrow-icon" sx={{ color: theme.palette.gery.medium, transition: '0.2s' }} />
                  </HorizontalContainer>
                </HorizontalContainer>
              ))}
            </Box>

            <Box sx={{ p: 3, pt: 1 }}>
              <ButtonComponent
                fullWidth
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/recruiter/manageJobs')}
                sx={{ 
                  borderColor: theme.palette.gery.light, 
                  color: theme.palette.gery.dark,
                  '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main }
                }}
              >
                View Detailed Analytics
              </ButtonComponent>
            </Box>
          </CardContainer>
        </Grid>

        <Grid item xs={12} md={5}>
          <CardContainer sx={{ p: 3, height: '100%', border: `1px solid ${theme.palette.gery.light}` }}>
            <Typography sx={{ ...theme.typography.h3, mb: 3 }}>
              Organization Controls
            </Typography>

            <Grid container spacing={1.5}>
              {[
                { label: 'Profile History', icon: BusinessIcon, path: '/recruiter/organization' },
                { label: 'Plans & Credits', icon: Inventory2OutlinedIcon, path: '/recruiter/selectplan' },
                { label: 'Billing & Usage', icon: PaymentsOutlinedIcon, path: '/recruiter/payments' },
                { label: 'General Settings', icon: SettingsOutlinedIcon, path: '/recruiter/settings' },
                { label: 'Global Settings', icon: HubOutlinedIcon, path: '/recruiter/globalSettings' },
              ].map((item, i) => (
                <Grid item xs={12} key={i}>
                  <HorizontalContainer
                    onClick={() => navigate(item.path)}
                    sx={{
                      p: 1.8,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: `1px solid ${theme.palette.gery.extraLight}`,
                      backgroundColor: theme.palette.gery.extraLight,
                      justifyContent: 'space-between',
                      transition: '0.2s',
                      '&:hover': {
                        borderColor: theme.palette.primary.light2,
                        backgroundColor: theme.palette.primary.light5,
                        '& .MuiTypography-root': { color: theme.palette.primary.main, fontWeight: 600 },
                        '& .menu-icon': { color: theme.palette.primary.main }
                      },
                    }}
                  >
                    <HorizontalContainer sx={{ gap: 2 }}>
                      <item.icon className="menu-icon" sx={{ color: theme.palette.gery.dark, transition: '0.2s' }} />
                      <Typography sx={{ ...theme.typography.smallRegular, transition: '0.2s' }}>
                        {item.label}
                      </Typography>
                    </HorizontalContainer>
                    <ChevronRightIcon fontSize="small" sx={{ color: theme.palette.gery.medium }} />
                  </HorizontalContainer>
                </Grid>
              ))}
            </Grid>
          </CardContainer>
        </Grid>

        <Grid item xs={12}>
          <CardContainer sx={{ p: 0, overflow: 'hidden', border: `1px solid ${theme.palette.gery.light}` }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.gery.light}`, display: 'flex', alignItems: 'center', gap: 1 }}>
              <HistoryIcon sx={{ color: theme.palette.gery.dark }} />
              <Typography sx={{ ...theme.typography.h3 }}>Recent Activity & History</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              {recentActivity.map((activity, idx) => (
                <HorizontalContainer 
                  key={idx} 
                  sx={{ 
                    p: 1.5, 
                    mb: idx < recentActivity.length - 1 ? 1 : 0, 
                    borderLeft: `4px solid ${activity.color}`, 
                    bgcolor: theme.palette.gery.extraLight,
                    borderRadius: '4px 12px 12px 4px',
                    justifyContent: 'space-between',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                    gap: 1
                  }}
                >
                  <VerticalContainer>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{activity.title}</Typography>
                    <Typography sx={{ fontSize: '12px', color: theme.palette.gery.dark }}>{activity.desc}</Typography>
                  </VerticalContainer>
                  <Typography sx={{ fontSize: '11px', color: theme.palette.gery.medium, minWidth: 'fit-content' }}>{activity.time}</Typography>
                </HorizontalContainer>
              ))}
            </Box>
          </CardContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecruiterDashboard;