import React, {useState} from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from '@mui/material';
import InputSelect from 'src/components/shared/Form/Select';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from 'src/components/shared/Button';

export default function NurseSettings() {
  const theme = useTheme();
  const navigate = useNavigate();
  const SectionCard = ({ title, children }) => (
    <Card
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        border: `1.5px solid ${theme.palette.primary.light1}`,

      }}
    >
      <CardContent>
        <Typography variant="h3" sx={{ mb: 2, color: theme.palette.text.primary }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
   const [timeZone, setTimeZone] = useState('Asia/Kolkata'); 
  const timeZoneOptions = [
    {
      label: 'India Standard Time (IST)',
      value: 'Asia/Kolkata',
    },
    {
      label: 'Eastern Time (ET)',
      value: 'America/New_York',
    },
    {
      label: 'Greenwich Mean Time (GMT)',
      value: 'Europe/London',
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Page Header */}
      <Typography variant="h2" sx={{ mb: 2, color: theme.palette.text.primary }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Time Zone Settings */}
        <Grid item xs={12}>
          <SectionCard title="Time Zone">
            <Typography variant="body1" sx={{ mb: 1, color: theme.palette.text.primary }}>
              Your current time zone
            </Typography>
            <Typography variant="smallRegular" sx={{ mb: 2, color: theme.palette.text.secondary }}>
              Used for job alerts, application updates, and communication timing
            </Typography>

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputSelect
                variant="outlined"
                fullWidth
                value={timeZone}
                onChange={(val) => setTimeZone(val)}
                options={timeZoneOptions}
              />
            </FormControl>
          </SectionCard>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12}>
          <SectionCard title="Notifications">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="body1">New Job Alert</Typography>
              <Switch defaultChecked />
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="body1">Application Status Alert</Typography>
              <Switch defaultChecked />
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1">Recruiter Messages Alert</Typography>
              <Switch defaultChecked />
            </Box>
          </SectionCard>
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12}>
          <SectionCard title="Privacy Settings">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="body1">Profile Visibility</Typography>
                <Typography variant="smallRegular" color="text.secondary">
                  Visible in recruiter search results
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="body1">Recruiters can contact me</Typography>
                <Typography variant="smallRegular" color="text.secondary">
                  Allow recruiters to message or call you
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Box>

            <Divider sx={{ my: 2 }} />

            <ButtonComponent variant="contained" color="primary" onClick={() => {
                navigate(`/nurse/change-password`)
            }}>
              Change Password
            </ButtonComponent>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
