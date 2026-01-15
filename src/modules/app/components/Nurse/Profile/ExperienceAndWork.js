import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Grid,
  Card,
  CardContent,
  alpha,
  Divider,
} from '@mui/material';
import {
  FormHeaderContainer,
  HeaderText,
  SubHeader,
  Text1,
  Text2,
  Colon,
  HeaderPart,
  FooterPart,
  FormLabel,
} from 'src/modules/app/utility/Styles';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ButtonComponent from 'src/components/shared/Button';
import InputComponent from 'src/components/shared/Form/Input';
import InputSelect from 'src/components/shared/Form/Select';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material';
import useResponsive from 'src/components/hooks/useResponsive';
import { postExperience } from 'src/modules/auth/api/authApi';


const jobTypeOptions = [
  { label: 'Full-Time', value: 'Full-Time' },
  { label: 'Part-Time', value: 'Part-Time' },
  { label: 'Contract', value: 'Contract' },
  { label: 'PRN', value: 'PRN' },
  { label: 'Per-Diem', value: 'Per-Diem' },
  { label: 'Others', value: 'Others' },
];

const shiftTypeOptions = [
  { label: 'Day', value: 'Day' },
  { label: 'Night', value: 'Night' },
  { label: 'Rotational', value: 'Rotational' },
  { label: 'Hybrid', value: 'Hybrid' },
  { label: 'Other', value: 'Other' },
  { label: 'Not Applicable', value: 'Not Applicable' },
];
const contractOptions = [
  { label: 'Less than a Month', value: 'LESS_THAN_1_MONTH' },
  { label: 'Between 3 to 6 Months', value: '3_TO_6_MONTHS' },
  { label: 'Between 6 to 12 Months', value: '6_TO_12_MONTHS' },
  { label: 'Between 12 to 18 Months', value: '12_TO_18_MONTHS' },
  { label: 'More than 2 Years', value: 'MORE_THAN_2_YEARS' },
];

const hospitalSizeOptions = [
  { label: 'Small', value: 'Small' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Large', value: 'Large' },
  { label: 'Any', value: 'Any' },
];

const locationOptions = [
  { label: 'Rural', value: 'Rural' },
  { label: 'Urban', value: 'Urban' },
  { label: 'Hybrid', value: 'Hybrid' },
  { label: 'Remote', value: 'Remote' },
  { label: 'NA', value: 'NA' },
  { label: 'Other', value: 'Other' },
];

const highAcuityOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const ExperienceSchema = Yup.object().shape({
  startDate: Yup.date().required('Start date is required'),
endDate: Yup.date()
  .nullable()
  .transform((value, originalValue) =>
    originalValue === '' ? null : value
  )
  .min(Yup.ref('startDate'), 'End date cannot be before start date'),

  totalYears: Yup.string().required('Total years is required'),
  specialtyYears: Yup.string().required('Specialty years is required'),
  lastPositionTitle: Yup.string().required('Position title is required'),
  lastEmployer: Yup.string().optional(),
  jobType: Yup.string().required('Job type is required'),
  shiftType: Yup.string().required('Shift type is required'),
  contractDuration: Yup.string().required('Contract duration is required'),
  locationType: Yup.string().required('Location preference is required'),
  highAcuity: Yup.string().required('High-acuity selection is required'),
});

const ExperienceFormFields = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } = useFormikContext();

  const calculateExperience = (start, end) => {
    if (!start) return '';

    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date(); // today if end date missing

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years ${months} months`;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormLabel>Start Date</FormLabel>
        <InputComponent
          variant="outlined"
          fullWidth
          type="date"
          name="startDate"
          value={values.startDate}
          onChange={(e) => {
            handleChange(e);
            const total = calculateExperience(e.target.value, values.endDate);
            setFieldValue('totalYears', total);
          }}
          onBlur={handleBlur}
          error={touched.startDate && Boolean(errors.startDate)}
          helperText={touched.startDate && errors.startDate}
        />
      </Grid>

      <Grid item xs={6}>
        <FormLabel>End Date</FormLabel>
        <InputComponent
          variant="outlined"
          fullWidth
          type="date"
  name="endDate"
  value={values.endDate || ''}
  onChange={(e) => {
    handleChange(e);
    const total = calculateExperience(values.startDate, e.target.value);
    setFieldValue('totalYears', total);
  }}
          onBlur={handleBlur}
          error={touched.endDate && Boolean(errors.endDate)}
          helperText={touched.endDate && errors.endDate}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>Speciality</FormLabel>
        <InputComponent
          placeholder="Years in specialty"
          variant="outlined"
          fullWidth
          name="specialtyYears"
          value={values.specialtyYears}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.specialtyYears && Boolean(errors.specialtyYears)}
          helperText={touched.specialtyYears && errors.specialtyYears}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>Position Title</FormLabel>
        <InputComponent
          placeholder="Last position title"
          variant="outlined"
          fullWidth
          name="lastPositionTitle"
          value={values.lastPositionTitle}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastPositionTitle && Boolean(errors.lastPositionTitle)}
          helperText={touched.lastPositionTitle && errors.lastPositionTitle}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>Employer (optional)</FormLabel>
        <InputComponent
          placeholder="Last employer (optional)"
          variant="outlined"
          fullWidth
          name="lastEmployer"
          value={values.lastEmployer}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastEmployer && Boolean(errors.lastEmployer)}
          helperText={touched.lastEmployer && errors.lastEmployer}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>Job type</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          name="jobType"
          options={jobTypeOptions}
          value={values.jobType}
          onChange={(val) => setFieldValue('jobType', val)}
          onBlur={handleBlur}
          error={touched.jobType && Boolean(errors.jobType)}
          helperText={touched.jobType && errors.jobType}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>Shift type</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          name="shiftType"
          options={shiftTypeOptions}
          value={values.shiftType}
          onChange={(val) => setFieldValue('shiftType', val)}
          onBlur={handleBlur}
          error={touched.shiftType && Boolean(errors.shiftType)}
          helperText={touched.shiftType && errors.shiftType}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>Contract duration</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          name="contractDuration"
          options={contractOptions}
          value={values.contractDuration}
          onChange={(val) => setFieldValue('contractDuration', val)}
          onBlur={handleBlur}
          error={touched.contractDuration && Boolean(errors.contractDuration)}
          helperText={touched.contractDuration && errors.contractDuration}
        />
      </Grid>
     
      <Grid item xs={12}>
        <FormLabel>Location</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          name="locationType"
          options={locationOptions}
          value={values.locationType}
          onChange={(val) => setFieldValue('locationType', val)}
          onBlur={handleBlur}
          error={touched.locationType && Boolean(errors.locationType)}
          helperText={touched.locationType && errors.locationType}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>High-acuity setting</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          name="highAcuity"
          options={highAcuityOptions}
          value={values.highAcuity}
          onChange={(val) => setFieldValue('highAcuity', val)}
          onBlur={handleBlur}
          error={touched.highAcuity && Boolean(errors.highAcuity)}
          helperText={touched.highAcuity && errors.highAcuity}
        />
      </Grid>
    </Grid>
  );
};

const ExperienceAndWork = () => {
  const [open, setOpen] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const theme = useTheme();
  const { isMobile, isTablet } = useResponsive();

  const initialValues = {
    startDate: '',
    endDate: null,
    totalYears: '',
    specialtyYears: '',
    lastPositionTitle: '',
    lastEmployer: '',
    jobType: '',
    shiftType: '',
    contractDuration: '',
   
    locationType: '',
    highAcuity: '',
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormHeaderContainer>
          <HeaderText>Work Experience</HeaderText>
          <SubHeader>Add your nursing work history</SubHeader>
        </FormHeaderContainer>
        {isMobile || isTablet ? (
          <ButtonComponent variant="contained" onClick={() => setOpen(true)}>
            <AddIcon />
          </ButtonComponent>
        ) : (
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Experience
          </ButtonComponent>
        )}
      </Box>

      <Box mt={4}>
        {experienceList.length === 0 ? (
          <Box textAlign="center" py={10}>
            <DescriptionIcon
              sx={{ fontSize: 120, color: alpha(theme.palette.text.secondary, 0.4) }}
            />
            <Typography sx={{ ...theme.typography.h4, fontWeight: 500 }}>
              No experience added
            </Typography>
            <Typography
              mb={1}
              sx={{
                ...theme.typography.h5,
                color: alpha(theme.palette.gery.dark, 0.5),
              }}
            >
              Add your work experience to improve your profile
            </Typography>
            <ButtonComponent variant="contained" onClick={() => setOpen(true)}>
              Add Experience
            </ButtonComponent>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {experienceList.map((exp, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    minHeight: 220,
                    border: `1px solid ${theme.palette.gery.medium}`,
                    borderRadius: '12px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-5px)',
                      backgroundColor: theme.palette.primary.light5,
                    },
                  }}
                >
                  <CardContent>
                    <Grid container spacing={1} alignItems="center">
                      {(() => {
                        const allFields = [
                          ['Position Title', 'lastPositionTitle'],
                          ['Employer', 'lastEmployer'],
                          ['Total Years', 'totalYears'],
                          ['Specialty Years', 'specialtyYears'],
                          ['Job Type', 'jobType'],
                          ['Shift', 'shiftType'],
                          ['Contract', 'contractDuration'],
                          ['Location', 'locationType'],
                          ['High-Acuity', 'highAcuity'],
                        ];

                        const [titleLabel, titleKey] = allFields[0];
                        const remainingFields = allFields.slice(1);

                        return (
                          <React.Fragment>
                            <Grid item xs={12}>
                              <Text2>{exp[titleKey] || '-'}</Text2>
                            </Grid>

                            <Grid item xs={12} sx={{ pt: '0 !important', pb: '0 !important' }}>
                              <Divider sx={{ my: 0.5 }} />
                            </Grid>

                            {remainingFields.map(([label, key]) => (
                              <React.Fragment key={key}>
                                <Grid item xs={4}>
                                  <Text1>{label}</Text1>
                                </Grid>
                                <Grid item xs={1}>
                                  <Colon>:</Colon>
                                </Grid>
                                <Grid item xs={7}>
                                  <Text2>{exp[key] || '-'}</Text2>
                                </Grid>
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        );
                      })()}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <HeaderPart>
          Add Work Experience
          <HighlightOffRoundedIcon
            width={24}
            height={24}
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </HeaderPart>

        <Formik
  initialValues={initialValues}
  validationSchema={ExperienceSchema}
 onSubmit={async (values, { resetForm }) => {
  try {
    // 🔥 BACKEND PAYLOAD MAPPING (IMPORTANT)
    const payload = {
      startDate: values.startDate,
      endDate: values.endDate,
      totalExperience: values.totalYears,
      specialtyExperience: values.specialtyYears,
      positionTitle: values.lastPositionTitle,
      employer: values.lastEmployer,
      jobType: values.jobType,
      shiftType: values.shiftType,
      contractDuration: values.contractDuration,
      locationType: values.locationType,
      highAcuity: values.highAcuity,
    };

    await postExperience(payload);

    // ✅ alert will now always show
    setTimeout(() => {
      alert('Experience saved successfully ✅');
    }, 100);

    // ✅ update UI
    setExperienceList((prev) => [...prev, values]);

    resetForm();
    setOpen(false);
  } catch (error) {
    console.error('Experience API error', error);

    setTimeout(() => {
      alert(
        error?.response?.data?.message ||
        'Failed to save experience ❌'
      );
    }, 100);
  }
}}

>

          {({ handleSubmit }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <DialogContent
                dividers
                sx={{
                  scrollbarWidth: 'none',
                  maxHeight: '60vh', // limit height for scrolling
                  overflowY: 'auto',
                  paddingBottom: 0,
                }}
              >
                <ExperienceFormFields />
              </DialogContent>

              <FooterPart
                sx={{
                  display: 'flex',
                  justifyContent: isMobile || isTablet ? 'space-between' : 'flex-end',
                  gap: 2,
                  padding: '16px',
                  borderTop: `1px solid ${alpha(theme.palette.gery.medium, 0.3)}`,
                }}
              >
                <ButtonComponent
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  sx={{ minWidth: '106px' }}
                >
                  Cancel
                </ButtonComponent>
                <ButtonComponent variant="contained" type="submit" sx={{ minWidth: '106px' }}>
                  Save
                </ButtonComponent>
              </FooterPart>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default ExperienceAndWork;
