import React from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { 
  Box, 
  Grid, 
  Typography, 
  Checkbox, 
  useMediaQuery, 
  FormControlLabel, 
  Button as MuiButton,
  InputAdornment, 
} from '@mui/material';
import InputComponent from 'src/components/shared/Form/Input';
import InputSelect from 'src/components/shared/Form/Select';
import { 
  FormLabel, 
  FormHeaderContainer, 
  HeaderText, 
  SubHeader 
} from '../../../utility/Styles';
import theme from 'src/config/theme';
import ButtonComponent from 'src/components/shared/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { postCompensation } from 'src/modules/auth/api/authApi';


const salaryTypeOptions = [
  { label: 'Annual Salary', value: 'Annual Salary' },
  // { label: 'Hourly Rate', value: 'Hourly Rate' },
  // { label: 'Weekly Pay', value: 'Weekly Pay' },
];

const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const preferredBenefits = [
  'Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k) Matching', 
  'Paid Time Off', 'Signing Bonus', 'Relocation Assistance', 'Housing Stipend', 
  'Travel Reimbursement', 'Continuing Education', 'Tuition Reimbursement', 'Life Insurance'
];

const initialValues = {
  salaryType: 'Annual Salary',
  minimumSalary: '',
  maximumSalary: '',
  salaryNegotiable: true,
  expectedHourlyRate: '',
  expectedWeeklyPay: '',
  expectedTravelPackage: '',
  housingNeeded: '',
  stipendRequired: '',
  visaAssistanceRequired: '',
  sponsorshipRequired: '',
  selectedBenefits: preferredBenefits.slice(0, 3), 
};

const CompensationSchema = Yup.object().shape({
  salaryType: Yup.string().required('Salary type is required'),
  minimumSalary: Yup.number().typeError('Must be a number').nullable().required('Minimum salary is required').min(0, 'Cannot be negative'),
  maximumSalary: Yup.number().typeError('Must be a number').nullable().min(Yup.ref('minimumSalary'), 'Must be greater than minimum'),
  immediateJoining: Yup.string().optional(),
  expectedHourlyRate: Yup.number().typeError('Must be a number').nullable().optional(),
  expectedWeeklyPay: Yup.number().typeError('Must be a number').nullable().optional(),
  expectedTravelPackage: Yup.string().optional(),
  housingNeeded: Yup.string().required('Housing preference is required'),
  stipendRequired: Yup.string().required('Stipend preference is required'),
  visaAssistanceRequired: Yup.string().required('Visa assistance preference is required'),
  sponsorshipRequired: Yup.string().required('Sponsorship preference is required'),
});

const CompensationFields = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } = useFormikContext();

  const handleBenefitToggle = (benefit) => {
    const currentBenefits = values.selectedBenefits;
    if (currentBenefits.includes(benefit)) {
      setFieldValue('selectedBenefits', currentBenefits.filter((b) => b !== benefit));
    } else {
      setFieldValue('selectedBenefits', [...currentBenefits, benefit]);
    }
  };

  const isBenefitSelected = (benefit) => values.selectedBenefits.includes(benefit);

  const renderCurrencyAdornment = () => (
    <InputAdornment position="start"><AttachMoneyIcon sx={{ color: theme.palette.text.secondary }} /></InputAdornment>
  );

  return (
    <Box>
      <FormHeaderContainer sx={{ mb: 4 }}>
        <HeaderText>Compensation</HeaderText>
        <SubHeader>
          Set your salary expectations and benefit preferences
        </SubHeader>
      </FormHeaderContainer>

      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12} sm={4}>
          <FormLabel>Salary Type</FormLabel>
          <InputSelect
            variant="outlined"
            fullWidth
            name="salaryType"
            value={values.salaryType || ''}
            onChange={(val) => setFieldValue('salaryType', val)}
            onBlur={handleBlur}
            options={salaryTypeOptions}
            placeholder="Select Type"
            error={touched.salaryType && Boolean(errors.salaryType)}
            helperText={touched.salaryType && errors.salaryType}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <FormLabel>Minimum</FormLabel>
          <InputComponent
            variant="outlined"
            name="minimumSalary"
            placeholder="0"
            type="number"
            value={values.minimumSalary || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.minimumSalary && Boolean(errors.minimumSalary)}
            helperText={touched.minimumSalary && errors.minimumSalary}
            startAdornment={renderCurrencyAdornment()}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabel>Maximum</FormLabel>
          <InputComponent
            variant="outlined"
            name="maximumSalary"
            placeholder="0"
            type="number"
            value={values.maximumSalary || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.maximumSalary && Boolean(errors.maximumSalary)}
            helperText={touched.maximumSalary && errors.maximumSalary}
            startAdornment={renderCurrencyAdornment()}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.salaryNegotiable}
                onChange={handleChange}
                name="salaryNegotiable"
                color="primary"
                sx={{ p: 0.5 }}
              />
            }
            label={
              <Typography  sx={{ color: theme.palette.text.primary, ...theme.typography.h5 }}>
                Salary is negotiable for the right opportunity
              </Typography>
            }
            sx={{ m: 0, mr: 2, mt: 0 }}
          />
        </Grid>
      </Grid>
      
      <Box mt={4}>
         <Typography variant="h6" component="p" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.secondary }}>
          Additional Compensation Requirements
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>Expected Hourly Rate (Optional)</FormLabel>
              <InputComponent
                variant="outlined"
                name="expectedHourlyRate"
                type="number"
                placeholder="0.00"
                value={values.expectedHourlyRate || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                startAdornment={renderCurrencyAdornment()}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>Expected Weekly Pay (Optional)</FormLabel>
              <InputComponent
                variant="outlined"
                name="expectedWeeklyPay"
                type="number"
                placeholder="0.00"
                value={values.expectedWeeklyPay || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                startAdornment={renderCurrencyAdornment()}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>Expected Travel Package</FormLabel>
              <InputComponent
                variant="outlined"
                name="expectedTravelPackage"
                placeholder="e.g., $500 monthly"
                value={values.expectedTravelPackage || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>Accommodation Needed?</FormLabel>
              <InputSelect
                variant="outlined"
                fullWidth
                name="housingNeeded"
                value={values.housingNeeded || ''}
                onChange={(val) => setFieldValue('housingNeeded', val)}
                onBlur={handleBlur}
                options={yesNoOptions}
                placeholder="Select Yes/No"
                error={touched.housingNeeded && Boolean(errors.housingNeeded)}
                helperText={touched.housingNeeded && errors.housingNeeded}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>Stipend Required?</FormLabel>
              <InputSelect
                variant="outlined"
                fullWidth
                name="stipendRequired"
                value={values.stipendRequired || ''}
                onChange={(val) => setFieldValue('stipendRequired', val)}
                onBlur={handleBlur}
                options={yesNoOptions}
                placeholder="Select Yes/No"
                error={touched.stipendRequired && Boolean(errors.stipendRequired)}
                helperText={touched.stipendRequired && errors.stipendRequired}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>Visa Assistance Required?</FormLabel>
              <InputSelect
                variant="outlined"
                fullWidth
                name="visaAssistanceRequired"
                value={values.visaAssistanceRequired || ''}
                onChange={(val) => setFieldValue('visaAssistanceRequired', val)}
                onBlur={handleBlur}
                options={yesNoOptions}
                placeholder="Select Yes/No"
                error={touched.visaAssistanceRequired && Boolean(errors.visaAssistanceRequired)}
                helperText={touched.visaAssistanceRequired && errors.visaAssistanceRequired}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel>Sponsorship Required?</FormLabel>
              <InputSelect
                variant="outlined"
                fullWidth
                name="sponsorshipRequired"
                value={values.sponsorshipRequired || ''}
                onChange={(val) => setFieldValue('sponsorshipRequired', val)}
                onBlur={handleBlur}
                options={yesNoOptions}
                placeholder="Select Yes/No"
                error={touched.sponsorshipRequired && Boolean(errors.sponsorshipRequired)}
                helperText={touched.sponsorshipRequired && errors.sponsorshipRequired}
              />
            </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography  sx={{ fontWeight: 600, mb: 1.5, color: theme.palette.text.secondary,...theme.typography.h6 }}>
          Preferred Benefits
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {preferredBenefits.map((benefit) => (
            <MuiButton
              key={benefit}
              variant={isBenefitSelected(benefit) ? 'contained' : 'outlined'}
              onClick={() => handleBenefitToggle(benefit)}
              sx={{
                minWidth: 'auto',
                px: 2,
                py: 1,
                borderRadius: '20px', 
                ...(isBenefitSelected(benefit) ? {} : {
                  borderColor: theme.palette.grey[400],
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.light5,
                  }
                }),
              }}
            >
              {benefit}
            </MuiButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const Compensation = () => {
  const isMobileOrBelow = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const payload = {
      salaryType: values.salaryType,
      minimumSalary: Number(values.minimumSalary),
      maximumSalary: values.maximumSalary
        ? Number(values.maximumSalary)
        : null,
      salaryNegotiable: values.salaryNegotiable,
      expectedHourlyRate: values.expectedHourlyRate
        ? Number(values.expectedHourlyRate)
        : null,
      expectedWeeklyPay: values.expectedWeeklyPay
        ? Number(values.expectedWeeklyPay)
        : null,
      expectedTravelPackage: values.expectedTravelPackage || null,
      housingNeeded: values.housingNeeded,
      stipendRequired: values.stipendRequired,
      visaAssistanceRequired: values.visaAssistanceRequired,
      sponsorshipRequired: values.sponsorshipRequired,
      benefits: values.selectedBenefits,
    };

    await postCompensation(payload);

    alert('Compensation saved successfully ✅');
    resetForm();

  } catch (error) {
    console.error('Compensation API error:', error);
    alert(
      error?.response?.data?.message ||
      'Failed to save compensation ❌'
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <Box>
        <Formik
            initialValues={initialValues}
            validationSchema={CompensationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form>
                    <CompensationFields />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                        <ButtonComponent
                            type="submit"
                            variant="contained"
                            fullWidth={isMobileOrBelow}
                            sx={{ width: '200px' }}
                        >
                            Save Compensation
                        </ButtonComponent>
                    </Box>
                </Form>
            )}
        </Formik>
    </Box>
  );
};

export default Compensation;