import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  alpha,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/components/hooks/useResponsive.js';
import InputComponent from 'src/components/shared/Form/Input';
import ButtonComponent from 'src/components/shared/Button';
import theme, { mobileTypography, palette, shadows, typography } from 'src/config/theme.js';
import { FormLabel } from '../utility/Styles';
import InputSelect from 'src/components/shared/Form/Select';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function NurseRegister() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const [step, setStep] = useState(1);

  const validationSchema = [
    Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6).required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter valid 10-digit number')
        .required('Required'),
    }),
    Yup.object({
      otp: Yup.string().length(6, 'Enter 6 digit OTP').required('OTP required'),
    }),
    Yup.object({
      workStatus: Yup.string().required('Required'),
    }),
  ];

  const initialValues = {
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    otp: '',
    workStatus: 'experienced',
  };

  const instructionItems = [
    'Build your profile and let recruiters find you',
    'Get job postings delivered right to your email',
    'Find a job and grow your career',
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: palette.gery.extraLightGray,
        justifyContent: 'center',
        alignItems: 'center',
        m: isMobile || isTablet ? 2 : 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          width: '100%',
          maxWidth: isMobile || isTablet ? '100%' : 950,
          flexDirection: isMobile || isTablet ? 'column' : 'row',
          alignItems: 'center',
            ...(step === 4 ? { justifyContent: 'center' } : {}),

        }}
      >
        {step !== 4 && !isMobile && !isTablet && (
          <Box sx={{ flex: 0.7, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {instructionItems.map((text, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  bgcolor: palette.gery.white,
                  boxShadow: shadows[1],
                  width: '100%',
                  maxWidth: 260,
                  borderRadius: '12px',
                  border: `1px solid ${theme.palette.primary.light1}`,
                  transition: '0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    cursor: 'pointer',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    bgcolor: palette.primary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircleIcon sx={{ color: palette.primary.main, fontSize: 32 }} />
                </Box>
                <Typography sx={{ fontSize: '14px', color: palette.gery.black }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        )}

        <Box
          sx={{
               flex: step === 4 ? 0.5 : 1.3,

            bgcolor: palette.gery.white,
            p: 4,
            boxShadow: shadows[1],
            borderRadius: '12px',
            border: `1.5px solid ${theme.palette.primary.light1}`,
          }}
        >
          {step !== 4 && (
<>
  <Typography sx={{ ...typography.h2, mb: 1 }}>Create your profile</Typography>
          <Typography sx={{ ...typography.smallRegular, color: palette.gery.darkGray, mb: 3 }}>
            Search & apply to jobs
          </Typography>
</>
          )}
        

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema[step - 1]}
            onSubmit={(values) => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      if (!values.workStatus) {
        alert('Please select work status'); 
        return;
      }
      setStep(4);
    }
  }}
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched }) => (
              <Form>
                <Grid container spacing={2}>
                  {step === 1 && (
                    <>
                      <Grid item xs={12} md={6}>
                        <FormLabel>Full Name</FormLabel>
                        <InputComponent
                          variant="outlined"
                          name="fullName"
                          placeholder="What is your name?"
                          fullWidth
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.fullName && Boolean(errors.fullName)}
                          helperText={touched.fullName && errors.fullName}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormLabel>Email</FormLabel>
                        <InputComponent
                          variant="outlined"
                          name="email"
                          placeholder="Tell us your email"
                          fullWidth
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormLabel>Mobile number</FormLabel>
                        <InputComponent
                          variant="outlined"
                          name="mobile"
                          placeholder="Enter mobile number"
                          fullWidth
                          value={values.mobile}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, '');
                            setFieldValue('mobile', numericValue);
                          }}
                          onBlur={handleBlur}
                          error={touched.mobile && Boolean(errors.mobile)}
                          helperText={touched.mobile && errors.mobile}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormLabel>Password</FormLabel>
                        <InputComponent
                          variant="outlined"
                          type="password"
                          name="password"
                          placeholder="Minimum 6 characters"
                          fullWidth
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputComponent
                          variant="outlined"
                          type="password"
                          name="confirmPassword"
                          placeholder="Re-enter password"
                          fullWidth
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                          helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                      </Grid>
                    </>
                  )}

                  {step === 2 && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.05),
                          border: `1px solid ${theme.palette.primary.light2}`,
                          borderRadius: '4px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          gap: '4px',
                        }}
                      >
                        <InfoOutlinedIcon sx={{ ...typography.h2, color: palette.action.blueLight }} />
                        <Typography sx={{ ...typography.smallRegular, color: palette.action.blueLight }}>
                          We've sent a 6-digit OTP to <b>{values.email || values.mobile}</b>
                        </Typography>
                      </Box>

                      <FormLabel>Enter OTP</FormLabel>
                      <InputComponent
                        variant="outlined"
                        name="otp"
                        placeholder="Enter 6 digit OTP"
                        fullWidth
                        value={values.otp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.otp && Boolean(errors.otp)}
                        helperText={touched.otp && errors.otp}
                      />

                      <Typography
                        sx={{
                          mt: 1,
                          cursor: 'pointer',
                          color: palette.primary.main,
                          ...typography.smallRegular,
                        }}
                      >
                        Resend OTP
                      </Typography>
                    </Grid>
                  )}

                  {step === 3 && (
                    <Grid item xs={12}>
                      <FormLabel>Work status</FormLabel>
                      <InputSelect
                        variant="outlined"
                        name="workStatus"
                        value={values.workStatus}
                        onChange={(val) => {
                          setFieldValue('workStatus', val);
                          setFieldTouched('workStatus', true);
                        }}
                        options={[
                          { label: 'Experienced', value: 'experienced' },
                          { label: 'Student / Internship', value: 'fresher' },
                        ]}
                        fullWidth
                        showNone={false}
                      />

                      <Box
                        sx={{
                          backgroundColor: alpha(theme.palette.actionLight.green, 1),
                          border: `1px solid ${theme.palette.actionLight.green}`,
                          borderRadius: '4px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          mt: 2,
                          mb: 1,
                          gap: '4px',
                        }}
                      >
                        <CheckCircleOutlineSharpIcon sx={{ ...typography.h3, color: theme.palette.action.green }} />
                        <Typography sx={{ ...mobileTypography.h5, color: theme.palette.action.green }}>
                          Almost done! After this, you'll be able to complete your detailed profile.
                        </Typography>
                      </Box>
                    </Grid>
                  )}

                  {step === 4 && (
                    <Grid item xs={12} textAlign="center" sx={{ }}>
                      <CheckCircleIcon sx={{ fontSize: 70, color: "green", mb: 2 }} />
                      <Typography sx={{ ...typography.h3, mb: 1 }}>Registration Successful!</Typography>
                      <Typography sx={{ ...typography.smallRegular, mb: 3, color: palette.gery.darkGray }}>
                        Your account is ready. Complete your profile to start applying for jobs.
                      </Typography>
                      <ButtonComponent fullWidth variant="outlined" onClick={() => navigate('/nurse/profile')}>
                        Complete Your Profile
                      </ButtonComponent>
                    </Grid>
                  )}

                  {step <= 3 && (
                    <Grid item xs={12} container spacing={2}>
                      {step > 1 && (
                        <Grid item xs={6}>
                          <ButtonComponent variant="outlined" fullWidth onClick={() => setStep(step - 1)}>
                            Back
                          </ButtonComponent>
                        </Grid>
                      )}
                      <Grid item xs={step > 1 ? 6 : 12}>
                        <ButtonComponent fullWidth type="submit" variant="contained">
                          {step === 3 ? 'Register' : 'Next'}
                        </ButtonComponent>
                      </Grid>
                    </Grid>
                  )}

                  
{step !== 4 &&  (
     <Grid item xs={12}>
                    <Typography sx={{ mt: 3, textAlign: 'center', ...typography.smallRegular, color: palette.gery.dark }}>
                      Already have an account?
                      <span style={{ color: palette.primary.main, cursor: 'pointer' }} onClick={() => navigate('/auth/nurse/login')}>
                        {' '}Login here
                      </span>
                    </Typography>
                  </Grid>
)}
               
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default NurseRegister;
