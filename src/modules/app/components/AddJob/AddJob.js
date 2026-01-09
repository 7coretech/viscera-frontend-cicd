import React from 'react';
import { Box, Typography, MenuItem, Select, alpha, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createJobRequest } from 'src/modules/app/store/appActions';
import InputComponent from 'src/components/shared/Form/Input';
import ButtonComponent from 'src/components/shared/Button';
import { palette, shadows, typography } from 'src/config/theme.js';
import { ReactComponent as AddIcon } from 'src/assets/images/add-square.svg';
import useResponsive from 'src/components/hooks/useResponsive';

const validationSchema = Yup.object().shape({
  // hospital: Yup.string().required('Enter hospital name'),
  title: Yup.string().required('Enter job title'),
  location: Yup.string().required('Enter job location'),
  minExp: Yup.number().min(0, 'Min exp cannot be negative').required(),
  maxExp: Yup.number().required(),
  salaryType: Yup.string().required(),
  minSalary: Yup.number().required(),
  maxSalary: Yup.number().required(),
  description: Yup.string().required(),
  specialty: Yup.string().required(),
  shiftType: Yup.string().required(),
  employmentType: Yup.string().required(),
  education: Yup.string().required(),
});

function RecruiterJobForm() {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(
      createJobRequest(
        values,
        (response) => {
          console.log('✅ Job Created:', response);
          resetForm();
          navigate('/recruiter/sharejob');
        },
        (error) => {
          console.error('❌ Error creating job:', error);
          setSubmitting(false);
        },
      ),
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: palette.gery.extraLightGray,
        p: { xs: 2, md: 6 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          bgcolor: palette.gery.white,
          boxShadow: shadows[1],
          borderRadius: '16px',
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography sx={{ ...typography.h2, mb: 1 }}>Post New Job</Typography>
        <Typography
          sx={{
            ...typography.smallRegular,
            color: palette.gery.darkGray,
            mb: 3,
          }}
        >
          Enter all the details to post a new job.
        </Typography>

        <Formik
          initialValues={{
            // hospital: '',
            title: '',
            location: '',
            minExp: '',
            maxExp: '',
            salaryType: '',
            minSalary: '',
            maxSalary: '',
            description: '',
            specialty: '',
            shiftType: '',
            employmentType: '',
            license: '',
            education: '',
            contractDuration: '',
            benefits: '',
            hospital:'Test'
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <FormField
                label="Job Title"
                name="title"
                placeholder="Ex. Registered Nurse – ICU"
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <FormField
                label="Job Location"
                name="location"
                placeholder="Ex. New York, USA"
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 3,
                  mt: 2,
                }}
              >
                <SelectField
                  label="Specialty"
                  name="specialty"
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={['ICU', 'Pediatrics', 'Emergency', 'Med/Surg', 'Oncology', 'General']}
                />
                <SelectField
                  label="Shift Type"
                  name="shiftType"
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={['Day', 'Night', 'Rotational', 'Weekend']}
                />
                <SelectField
                  label="Employment Type"
                  name="employmentType"
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={['Full-time', 'Part-time', 'Contract', 'Travel Nursing', 'Locum']}
                />
                <SelectField
                  label="Minimum Education"
                  name="education"
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={[
                    'Diploma in Nursing',
                    'Associate Degree in Nursing (ADN)',
                    'Bachelor of Science in Nursing (BSN)',
                    'Master of Science in Nursing (MSN)',
                  ]}
                />
              </Box>

              <FormField
                label="License / Certifications Required"
                name="license"
                placeholder="Ex. RN, BSN, BLS, ACLS"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <FormField
                label="Contract Duration (Optional)"
                name="contractDuration"
                placeholder="Ex. 6 months, 1 year"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <FormField
                label="Benefits Offered"
                name="benefits"
                placeholder="Ex. Health insurance, housing stipend, relocation assistance"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                multiline
                rows={3}
              />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 2,
                  mt: 2,
                }}
              >
                <FormField
                  label="Min Experience (Years)"
                  name="minExp"
                  placeholder="0"
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <FormField
                  label="Max Experience (Years)"
                  name="maxExp"
                  placeholder="5"
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <FormField
                  label="Salary Min ($)"
                  name="minSalary"
                  placeholder="$20"
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <FormField
                  label="Salary Max ($)"
                  name="maxSalary"
                  placeholder="$50"
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Box>
              <Box sx={{ mt: 1, mb: 3 }}>
                <SelectField
                  label="Salary Type"
                  name="salaryType"
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  options={['Hourly', 'Weekly', 'Biweekly', 'Monthly', 'Annual']}
                />
              </Box>
              <FormField
                label="Job Description"
                name="description"
                placeholder="Enter job description"
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                multiline
                rows={4}
              />

              <ButtonComponent
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                startIcon={<AddIcon width={isMobile ? 18 : 22} height={isMobile ? 18 : 22} />}
                fullWidth
                sx={{ height: '52px', borderRadius: '12px', mt: 3 }}
              >
                {isSubmitting ? 'Saving...' : 'Save Job'}
              </ButtonComponent>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

const FormField = ({
  label,
  name,
  placeholder,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  multiline = false,
  rows = 1,
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={{ ...typography.smallRegular, mb: 0.5 }}>{label}</Typography>
    <TextField
      name={name}
      variant="outlined"
      placeholder={placeholder}
      fullWidth
      multiline={multiline}
      rows={rows}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched?.[name] && Boolean(errors?.[name])}
      helperText={touched?.[name] && errors?.[name]}
      sx={{
        backgroundColor: palette.gery.white,
        boxShadow: shadows[1],
        '& .MuiOutlinedInput-root': {
          height: multiline ? '100px !important' : '52px',
          borderRadius: '12px',
          alignItems: multiline ? 'flex-start' : 'center',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${alpha(palette.gery.black, 0.14)}`,
        },
      }}
    />
  </Box>
);

const SelectField = ({ label, name, values, handleChange, handleBlur, options }) => (
  <Box>
    <Typography sx={{ ...typography.smallRegular, mb: 0.5 }}>{label}</Typography>
    <Select
      name={name}
      fullWidth
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      sx={{
        height: '52px',
        borderRadius: '12px',
        backgroundColor: palette.gery.white,
        boxShadow: shadows[1],
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  </Box>
);

export default RecruiterJobForm;
