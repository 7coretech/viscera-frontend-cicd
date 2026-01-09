import React from 'react';
import { Box, Card, CardContent, Typography, Button, Divider, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputComponent from 'src/components/shared/Form/Input';
import ButtonComponent from 'src/components/shared/Button';
import useMediaQuery from 'src/components/hooks/useMediaQuery';
import { FormLabel } from 'src/modules/app/utility/Styles';
const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function RecruiterChangePassword() {
  const theme = useTheme();
  const { isMobile, isTablet } = useMediaQuery();

  return (
    <Box sx={{ p: { xs: 2, md: 3 },width:'100%', height:'calc(100vh - 120px)', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
     

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: theme.shadows[1],
          border: `1.5px solid ${theme.palette.primary.light1}`,
          padding:'25px',
          maxWidth:isMobile ? '100%' : '500px'
        }}
      >
        <Box sx={{  display:'flex',
            justifyContent:'center',
            alignItems:'center'}}>

       
         <Typography variant="h2" sx={{ ...theme.typography.h2, mb: 3, borderBottom:`3px solid ${theme.palette.primary.light1}`, pb:0.5 }}>
        Change Password
      </Typography>
       </Box>
       
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log('Change Password Payload:', values);
              setTimeout(() => {
                setSubmitting(false);
                resetForm();
              }, 800);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormLabel>Current Password</FormLabel>
                <InputComponent
                  fullWidth
                  variant="outlined"
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  sx={{ mb: 2 }}
                />
                <FormLabel>New Password</FormLabel>
                <InputComponent
                  fullWidth
                  variant="outlined"
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  sx={{ mb: 2 }}
                />

<FormLabel>Confirm New Password</FormLabel>
                <InputComponent
                  fullWidth
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                />

               

                <ButtonComponent
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{mt:2}}
                >
                  Update Password
                </ButtonComponent>
              </Form>
            )}
          </Formik>
        
      </Box>
    </Box>
  );
}
