 import React, { useRef } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Box, Grid, Avatar, IconButton, Button,alpha, Typography, useMediaQuery } from '@mui/material';
import InputComponent from 'src/components/shared/Form/Input';
import InputSelect from 'src/components/shared/Form/Select';
import { FormLabel, FormHeaderContainer, HeaderText,SubHeader } from '../../../utility/Styles';
import theme from 'src/config/theme';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { palette,shadows } from 'src/config/theme';
import ButtonComponent from 'src/components/shared/Button';
import { updateAccountProfile } from 'src/modules/auth/api/authApi';


export const GeneralInformationSchema = Yup.object().shape({
  fullName: Yup.string().optional(),
  emailId: Yup.string().email('Invalid email address').optional(),
  mobileNumber: Yup.string().optional(),
  dateOfBirth: Yup.date().nullable().optional(),
  gender: Yup.string().optional(),
  workStatus: Yup.string().optional(),
  address: Yup.string().optional(),
  city: Yup.string().optional(),
  state: Yup.string().optional(),
  zipCode: Yup.string().optional(),
  professionalBio: Yup.string().optional(),
  photo: Yup.mixed().optional(),
  languages: Yup.array().of(Yup.string()).optional(),
});


const initialValues = {
  fullName: '',
  emailId: '',
  mobileNumber: '',
  dateOfBirth: null,
  gender: '',
  workStatus: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  professionalBio: '',
  photo: null,
  languages: [],
};

const GeneralInformationFields = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } = useFormikContext();

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Prefer not to say', value: 'other' },
  ];

  const workStatusOptions = [
    { label: 'Experience', value: 'Experience' },
    { label: 'Student/Intership', value: 'Student/Intership' },
  ];

  const stateOptions = [
    { label: 'State A', value: 'A' },
    { label: 'State B', value: 'B' },
    { label: 'State C', value: 'C' },
  ];
  const languageOptions = [
  { label: 'English', value: 'English' },
  { label: 'Hindi', value: 'Hindi' },
  { label: 'Gujarati', value: 'Gujarati' },
 
];


  const fileInputRef = useRef(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue('photo', file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const photoUrl =
    values.photo instanceof File ? URL.createObjectURL(values.photo) : values.photo;

  return (
    <Box>
      <FormHeaderContainer sx={{ mb: 2 }}>
        <HeaderText>General Information</HeaderText>
        <SubHeader >
          Manage your personal details
        </SubHeader>
      </FormHeaderContainer>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: '1.5rem',
          }}
          src={photoUrl}
        >
          {values.fullName ? values.fullName[0] : 'U'}
        </Avatar>
        <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            style={{ display: 'none' }}
            name="photo"
          />
          <Box
            onClick={handleUploadClick}
            sx={{
              display:'flex',
              flexDirection:'column',
              alignItems:'flex-start',
              gap:'5px',
              p: 0,
              color: theme.palette.text.secondary,
              cursor:'pointer',
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.primary.main,
              },
            }}
          >
            <Box sx={{display:'flex',justifyContent:'center', alignItems:'center', width:'50px', height:'50px', borderRadius:'50%', border:`2px solid ${theme.palette.primary.main}`}}>
            <PhotoCameraIcon fontSize="medium" />
             </Box>
              <Typography sx={{...theme.typography.h6, color:theme.palette.text.secondary}}>
              Upload a professional photo

              </Typography>
           
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormLabel>Full Name</FormLabel>
          <InputComponent
            variant="outlined"
            name="fullName"
            value={values.fullName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && Boolean(errors.fullName)}
            helperText={touched.fullName && errors.fullName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel>Email ID</FormLabel>
          <InputComponent
           variant="outlined"
            name="emailId"
            type="email"
            value={values.emailId || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.emailId && Boolean(errors.emailId)}
            helperText={touched.emailId && errors.emailId}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabel>Mobile Number</FormLabel>
          <InputComponent
           variant="outlined"
            name="mobileNumber"
            type="tel"
            value={values.mobileNumber || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobileNumber && Boolean(errors.mobileNumber)}
            helperText={touched.mobileNumber && errors.mobileNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel>Date of Birth</FormLabel>
          <InputComponent
           variant="outlined"
            name="dateOfBirth"
            type="date"
            placeholder="dd-mm-yyyy"
            value={values.dateOfBirth || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
            helperText={touched.dateOfBirth && errors.dateOfBirth}
          
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabel>Gender</FormLabel>
          <InputSelect
          showNone={false}
           variant="outlined"
            fullWidth
            name="gender"
            value={values.gender || ''}
            onChange={(val) => setFieldValue('gender', val)}
            onBlur={handleBlur}
            options={genderOptions}
            placeholder="Select Gender"
            error={touched.gender && Boolean(errors.gender)}
            helperText={touched.gender && errors.gender}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel>Work Status</FormLabel>
          <InputSelect
           variant="outlined"
            fullWidth
            name="workStatus"
            value={values.workStatus || ''}
            onChange={(val) => setFieldValue('workStatus', val)}
            onBlur={handleBlur}
            options={workStatusOptions}
            placeholder="Select Work Status"
            error={touched.workStatus && Boolean(errors.workStatus)}
            helperText={touched.workStatus && errors.workStatus}
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabel>Address</FormLabel>
          <InputComponent
           variant="outlined"
            name="address"
            value={values.address || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
          />
        </Grid>
        <Grid item xs={12}>
  <FormLabel>Language</FormLabel>
  <InputSelect
    variant="outlined"
    fullWidth
    multiple
    name="languages"
    value={values.languages || []}
    onChange={(val) => setFieldValue('languages', val)}
    options={languageOptions}
    placeholder="Select languages"
    error={touched.languages && Boolean(errors.languages)}
    helperText={touched.languages && errors.languages}
  />
</Grid>


        <Grid item xs={12} sm={4}>
          <FormLabel>City</FormLabel>
          <InputComponent
           variant="outlined"
            name="city"
            placeholder="City"
            value={values.city || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.city && Boolean(errors.city)}
            helperText={touched.city && errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel>State</FormLabel>
          <InputSelect
           variant="outlined"
            fullWidth
            name="state"
            value={values.state || ''}
            onChange={(val) => setFieldValue('state', val)}
            onBlur={handleBlur}
            options={stateOptions}
            placeholder="State"
            error={touched.state && Boolean(errors.state)}
            helperText={touched.state && errors.state}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabel>Zip Code</FormLabel>
          <InputComponent
           variant="outlined"
            name="zipCode"
            placeholder="Zip Code"
            type="number"
            value={values.zipCode || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.zipCode && Boolean(errors.zipCode)}
            helperText={touched.zipCode && errors.zipCode}
          />
        </Grid>

      
      </Grid>
    </Box>
  );
};

const GeneralInformationForm = () => {
    const isMobileOrBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const payload = {
      address: values.address,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      languages: values.languages,
    };

    Object.keys(payload).forEach(
      (key) => payload[key] === '' && delete payload[key]
    );

    await updateAccountProfile(payload);

    alert('Profile updated successfully!');

  } catch (err) {
    alert('Something went wrong while saving profile');
    console.error('API ERROR', err);
  } finally {
    setSubmitting(false);
  }
};



  return (
    <Formik
  initialValues={initialValues}
  // validationSchema={GeneralInformationSchema} ❌ comment
  onSubmit={handleSubmit}
>

      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <GeneralInformationFields />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <ButtonComponent
             
              type="submit"
              variant="contained"
              // disabled={isSubmitting || !dirty || !isValid} 
              // fullWidth
                fullWidth={isMobileOrBelow}
                sx={{width:'200px'}}
            
            >
              Save Changes
            </ButtonComponent>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default GeneralInformationForm;
