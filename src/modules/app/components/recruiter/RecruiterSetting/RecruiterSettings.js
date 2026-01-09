import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Switch,
  FormControl,
  useTheme,
} from '@mui/material';
import InputSelect from 'src/components/shared/Form/Select';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from 'src/components/shared/Button';

export default function RecruiterSettings() {
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
  const [newAppFrequency, setNewAppFrequency] = useState('every');
  const [candidateMsgFrequency, setCandidateMsgFrequency] = useState('instant');
  const [jobExpReminder, setJobExpReminder] = useState('15');
  const [language, setLanguage] = useState('en');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [loginActivity, setLoginActivity] = useState([
    { device: 'Chrome on Windows', time: '2025-12-18 09:30 AM' },
    { device: 'Safari on iPhone', time: '2025-12-17 08:15 PM' },
  ]);

  const timeZoneOptions = [
    { label: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
    { label: 'Eastern Time (ET)', value: 'America/New_York' },
    { label: 'Greenwich Mean Time (GMT)', value: 'Europe/London' },
  ];

  const frequencyOptions = [
    { label: 'Every New Application', value: 'every' },
    { label: 'Once in a Day', value: 'daily' },
    { label: 'Once in a Week', value: 'weekly' },
  ];

  const candidateMsgOptions = [
    { label: 'Instant Notification over Email', value: 'instant' },
    { label: 'Once in 24 hours', value: 'daily' },
  ];

  const jobExpOptions = [
    { label: 'Before 15 days', value: '15' },
    { label: 'Before 6 days', value: '6' },
    { label: 'Before 2 days', value: '2' },
  ];

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Spanish', value: 'es' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h2" sx={{ mb: 2, color: theme.palette.text.primary }}>
        Recruiter Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionCard title="Account Settings">
            <ButtonComponent
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => navigate('/recruiter/change-password')}
            >
              Change Password
            </ButtonComponent>

            <FormControl fullWidth sx={{ mb: 2 }}>
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

        <Grid item xs={12}>
          <SectionCard title="Notifications">
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                New Application Alert
              </Typography>
              <InputSelect
                variant="outlined"
                fullWidth
                value={newAppFrequency}
                onChange={(val) => setNewAppFrequency(val)}
                options={frequencyOptions}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Candidate’s Messages
              </Typography>
              <InputSelect
                variant="outlined"
                fullWidth
                value={candidateMsgFrequency}
                onChange={(val) => setCandidateMsgFrequency(val)}
                options={candidateMsgOptions}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Job Expiring Reminder
              </Typography>
              <InputSelect
                variant="outlined"
                fullWidth
                value={jobExpReminder}
                onChange={(val) => setJobExpReminder(val)}
                options={jobExpOptions}
              />
            </FormControl>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Email Notifications</Typography>
                <Switch defaultChecked />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Push Notifications</Typography>
                <Switch defaultChecked />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>SMS Notifications</Typography>
                <Switch defaultChecked />
              </Box>
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12}>
          <SectionCard title="Language Settings">
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputSelect
                variant="outlined"
                fullWidth
                value={language}
                onChange={(val) => setLanguage(val)}
                options={languageOptions}
              />
            </FormControl>
          </SectionCard>
        </Grid>

        <Grid item xs={12}>
          <SectionCard title="Login Activity">
            {loginActivity.length === 0 ? (
              <Typography>No recent logins found</Typography>
            ) : (
              loginActivity.map((item, index) => (
                <Box key={index} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{item.device}</Typography>
                  <Typography>{item.time}</Typography>
                </Box>
              ))
            )}
          </SectionCard>
        </Grid>

        <Grid item xs={12}>
          <SectionCard title="Multi-Factor Authentication (MFA)">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>MFA</Typography>
              <Switch checked={mfaEnabled} onChange={() => setMfaEnabled(!mfaEnabled)} />
            </Box>
            {mfaEnabled && (
              <ButtonComponent
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/recruiter/manage-mfa')}
              >
                Manage MFA
              </ButtonComponent>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}
