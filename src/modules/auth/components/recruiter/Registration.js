import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  alpha,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/components/hooks/useResponsive';
import InputComponent from 'src/components/shared/Form/Input';
import ButtonComponent from 'src/components/shared/Button';
import theme, { palette, typography } from 'src/config/theme';
import { FormLabel } from '../utility/Styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function RecruiterRegister() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const [step, setStep] = useState(1);

  const initialValues = {
    fullName: '',
    email: '',
    mobile: '',
    otp: '',
  };

  const validationSchema = [
    // STEP 1 VALIDATION
    Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter valid 10-digit number')
        .required('Mobile is required'),
    }),

    // STEP 2 VALIDATION
    Yup.object({
      otp: Yup.string()
        .length(6, 'Enter 6 digit OTP')
        .required('OTP required'),
    }),
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
          width: '100%',
          maxWidth: 550,
          flex: 1,
          bgcolor: palette.gery.white,
          p: 4,
          boxShadow: theme.shadows[1],
          borderRadius: '12px',
          border: `1.5px solid ${theme.palette.primary.light1}`,
        }}
      >
        <Typography sx={{ ...typography.h2, mb: 1 }}>
          Recruiter Registration
        </Typography>

        <Typography
          sx={{
            ...typography.smallRegular,
            color: palette.gery.darkGray,
            mb: 3,
          }}
        >
          Create your recruiter account and start hiring.
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[step - 1]}
          onSubmit={(values) => {
            if (step < 2) return setStep(step + 1);
            navigate('/recruiter/steps'); 
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <Grid container spacing={2}>

            
                {step === 1 && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <FormLabel>Full Name</FormLabel>
                      <InputComponent
                        name="fullName"
                        variant="outlined"
                        placeholder="Enter your full name"
                        fullWidth
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormLabel>Email</FormLabel>
                      <InputComponent
                        name="email"
                        variant="outlined"
                        placeholder="Enter your email"
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormLabel>Mobile Number</FormLabel>
                      <InputComponent
                        name="mobile"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter mobile number"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.mobile && Boolean(errors.mobile)}
                        helperText={touched.mobile && errors.mobile}
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
                        padding: '12px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        gap: '4px',
                      }}
                    >
                      <InfoOutlinedIcon
                        sx={{ ...typography.h2, color: palette.action.blueLight }}
                      />
                      <Typography
                        sx={{
                          ...typography.smallRegular,
                          color: palette.action.blueLight,
                        }}
                      >
                        We've sent a 6-digit OTP to <b>{values.email}</b>
                      </Typography>
                    </Box>

                    <FormLabel>Enter OTP</FormLabel>
                    <InputComponent
                      name="otp"
                      variant="outlined"
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

             
                <Grid item xs={12} container spacing={2}>
                  {step > 1 && (
                    <Grid item xs={6}>
                      <ButtonComponent
                        variant="outlined"
                        fullWidth
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </ButtonComponent>
                    </Grid>
                  )}

                  <Grid item xs={step > 1 ? 6 : 12}>
                    <ButtonComponent
                      fullWidth
                      type="submit"
                      variant="contained"
                    >
                      {step === 2 ? 'Register' : 'Next'}
                    </ButtonComponent>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: 'center',
                      ...typography.smallRegular,
                      color: palette.gery.dark,
                    }}
                  >
                    Already have an account?
                    <span
                      style={{
                        color: palette.primary.main,
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('/auth/recruiter/login')}
                    >
                      {' '}Login here
                    </span>
                  </Typography>
                </Grid>

              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
