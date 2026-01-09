import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Dialog,
  DialogContent,
  TextField,
  Alert,
  IconButton,
  useTheme,
  Stack,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from 'src/components/shared/Button';
import { FooterPart, HeaderText } from 'src/modules/app/utility/Styles';
import { HeaderPart } from 'src/components/App/Header/Styles';

export default function ManageMFAPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [mfaStatus, setMfaStatus] = useState({ authenticator: true, sms: false });
  const [openSetup, setOpenSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const [openSmsSetup, setOpenSmsSetup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsStep, setSmsStep] = useState(1); 

  const SectionCard = ({ title, children, subtitle }) => (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: '12px',
        p: 3,
        border: `1.5px solid ${theme.palette.primary.light1}`,
        boxShadow: theme.shadows[1],
        mb: 3,
      }}
    >
      <Typography variant="h3" sx={{ color: theme.palette.text.primary, mb: subtitle ? 0.5 : 2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: theme.palette.gery.dark, mb: 2.5 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, mx: 'auto' }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ color: theme.palette.primary.main, backgroundColor: theme.palette.primary.light5 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h2" sx={{ color: theme.palette.text.primary }}>
          Multi-Factor Authentication
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionCard 
            title="Verification Methods" 
            subtitle="Secure your account by adding an additional layer of verification."
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5">Authenticator App</Typography>
                  {mfaStatus.authenticator && <Chip size="small" icon={<CheckCircleIcon />} label="Active" color="success" sx={{ borderRadius: '6px' }} />}
                </Stack>
                <Typography variant="smallRegular" sx={{ color: theme.palette.gery.dark }}>
                  Use apps like Google Authenticator or Microsoft Authenticator.
                </Typography>
              </Box>
              <ButtonComponent 
                variant={mfaStatus.authenticator ? "outlined" : "contained"}
                onClick={() => setOpenSetup(true)}
              >
                {mfaStatus.authenticator ? "Reconfigure" : "Set up"}
              </ButtonComponent>
            </Box>

            <Divider sx={{ my: 1, borderColor: theme.palette.primary.light3 }} />

           
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
              <Box>
                <Typography variant="h5">Text Message (SMS)</Typography>
                <Typography variant="smallRegular" sx={{ color: theme.palette.gery.dark }}>
                  Receive a verification code via text message.
                </Typography>
              </Box>
              <ButtonComponent 
                variant="outlined" 
                onClick={() => { setOpenSmsSetup(true); setSmsStep(1); }}
              >
                Add Phone
              </ButtonComponent>
            </Box>
          </SectionCard>
        </Grid>

        <Grid item xs={12}>
          <SectionCard 
            title="Backup Recovery Codes" 
            subtitle="If you lose your device and can't receive codes, these can be used to log in."
          >
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3, 
                borderRadius: '8px', 
                backgroundColor: theme.palette.accent.light,
                color: theme.palette.accent.main,
                '& .MuiAlert-icon': { color: theme.palette.accent.main }
              }}
            >
              Store these codes in a secure place. Each code can only be used once.
            </Alert>
            
            <Box sx={{ 
              backgroundColor: theme.palette.gery.extraLight, 
              p: 3, 
              borderRadius: '8px', 
              border: `1px dashed ${theme.palette.gery.medium}`,
              mb: 3 
            }}>
              <Grid container spacing={2}>
                {['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456'].map((code) => (
                  <Grid item xs={6} key={code}>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 700, textAlign: 'center' }}>
                      {code}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <ButtonComponent variant="contained">Download Codes</ButtonComponent>
              <ButtonComponent variant="outlined">Generate New</ButtonComponent>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      <Dialog 
        open={openSetup} 
        onClose={() => setOpenSetup(false)} 
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <HeaderPart> <HeaderText >Configure Authenticator</HeaderText></HeaderPart>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Scan this QR code with your authenticator app, then enter the 6-digit code below.
          </Typography>
          <Box sx={{ width: '200px', height: '200px', bgcolor: theme.palette.gery.extraLight, mx: 'auto', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${theme.palette.primary.light2}`, borderRadius: '12px' }}>
            <Typography variant="small" sx={{ textAlign: 'center', p: 2 }}>QR Code Placeholder</Typography>
          </Box>
          <TextField
            fullWidth
            label="Verification Code"
            placeholder="000 000"
            variant="outlined"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '4px', fontWeight: 'bold' } }}
          />
        </DialogContent>
        <FooterPart>
          <ButtonComponent variant="text" onClick={() => setOpenSetup(false)} sx={{ color: theme.palette.gery.dark }}>Cancel</ButtonComponent>
          <ButtonComponent variant="contained" disabled={verificationCode.length < 6} onClick={() => setOpenSetup(false)}>Verify & Save</ButtonComponent>
        </FooterPart>
      </Dialog>

      <Dialog 
        open={openSmsSetup} 
        onClose={() => setOpenSmsSetup(false)} 
        PaperProps={{ sx: { borderRadius: '12px', width: '400px' } }}
      >
        <HeaderPart>
          <HeaderText>{smsStep === 1 ? "Add Phone Number" : "Verify OTP"}</HeaderText>
        </HeaderPart>
        <DialogContent sx={{ mt: 2 }}>
          {smsStep === 1 ? (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>Enter your mobile number to receive a verification code.</Typography>
              <TextField 
                fullWidth 
                label="Phone Number" 
                placeholder="+91 00000 00000" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Box>
          ) : (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>We sent a code to {phoneNumber}. Enter it below.</Typography>
              <TextField 
                fullWidth 
                label="6-Digit OTP" 
                placeholder="000 000"
                inputProps={{ style: { textAlign: 'center', letterSpacing: '4px' } }}
              />
            </Box>
          )}
        </DialogContent>
        <FooterPart>
          <ButtonComponent variant="text" onClick={() => setOpenSmsSetup(false)} sx={{ color: theme.palette.gery.dark }}>Cancel</ButtonComponent>
          <ButtonComponent 
            variant="contained" 
            onClick={() => smsStep === 1 ? setSmsStep(2) : setOpenSmsSetup(false)}
          >
            {smsStep === 1 ? "Next" : "Verify & Save"}
          </ButtonComponent>
        </FooterPart>
      </Dialog>
    </Box>
  );
}