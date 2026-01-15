import React, { useEffect, useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { 
  Box, 
  Grid, 
  Typography, 
  Checkbox, 
  useMediaQuery, 
  FormControlLabel, 
  Button as MuiButton 
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ButtonComponent from 'src/components/shared/Button';
import { postAvailability } from 'src/modules/auth/api/authApi';
import { getAvailability } from 'src/modules/auth/api/authApi';
const hoursPerWeekOptions = [
  { label: 'Full-time (40+ hrs)', value: 'Full-time (40+ hrs)' },
  { label: 'Part-time (30-39 hrs)', value: 'Part-time (30-39 hrs)' },
  { label: 'Part-time (20-30 hrs)', value: 'Part-time (20-30 hrs)' },
  { label: 'Less than 20 hrs', value: 'Less than 20 hrs' },
];

const immediateJoiningOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const overtimeOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const initialValues = {
  availableFrom: '',
  immediateJoining: '',
  hoursPerWeek: 'Part-time (20-30 hrs)',
  preferredStartTime: '',
  preferredEndTime: '',
  availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  overtimeAllowed: '',
  willingToWorkOvertime: true,
  willingToWorkWeekends: true,
  willingToWorkNightShifts: true,
  willingToBeOnCall: true,
};

const AvailabilitySchema = Yup.object().shape({
  availableFrom: Yup.date()
    .nullable()
    .required('Start date is required'),

  hoursPerWeek: Yup.string()
    .required('Hours per week is required'),

  availableDays: Yup.array()
    .min(1, 'Select at least one available day')
    .required('Available days are required'),
});


const AvailabilityFields = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } = useFormikContext();
  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const handleDayToggle = (day) => {
    const currentDays = values.availableDays;
    if (currentDays.includes(day)) {
      setFieldValue('availableDays', currentDays.filter((d) => d !== day));
    } else {
      setFieldValue('availableDays', [...currentDays, day]);
    }
  };

  const isDaySelected = (day) => values.availableDays.includes(day);

  const renderTimeIcon = () => (
    <Box sx={{ color: theme.palette.grey[500] }}>
      <AccessTimeIcon />
    </Box>
  );

  const renderCalendarIcon = () => (
    <Box sx={{ color: theme.palette.grey[500] }}>
      <CalendarTodayIcon />
    </Box>
  );

  return (
    <Box>
      <FormHeaderContainer sx={{ mb: 4 }}>
        <HeaderText>Availability</HeaderText>
        <SubHeader>
          Set your work schedule preferences
        </SubHeader>
      </FormHeaderContainer>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormLabel>Available From</FormLabel>
          <InputComponent
            variant="outlined"
            name="availableFrom"
            type="date"
            placeholder="dd-mm-yyyy"
            value={values.availableFrom || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.availableFrom && Boolean(errors.availableFrom)}
            helperText={touched.availableFrom && errors.availableFrom}
            endAdornment={renderCalendarIcon()}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabel>Hours per Week</FormLabel>
          <InputSelect
            variant="outlined"
            fullWidth
            name="hoursPerWeek"
            value={values.hoursPerWeek || ''}
            onChange={(val) => setFieldValue('hoursPerWeek', val)}
            onBlur={handleBlur}
            options={hoursPerWeekOptions}
            placeholder="Select Hours"
            error={touched.hoursPerWeek && Boolean(errors.hoursPerWeek)}
            helperText={touched.hoursPerWeek && errors.hoursPerWeek}
          />
        </Grid>
        
    

       
      </Grid>
      
      <Box mt={2}>
        <FormLabel>
          Available Days
        </FormLabel>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {availableDays.map((day) => (
            <MuiButton
              key={day}
              variant={isDaySelected(day) ? 'contained' : 'outlined'}
              onClick={() => handleDayToggle(day)}
              sx={{
                minWidth: 'auto',
                px: 2,
                py: 1,
                borderRadius: '8px',
                ...(isDaySelected(day) ? {} : {
                  borderColor: theme.palette.primary.dark,
                  color: theme.palette.primary.dark,
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.light5,
                  }
                }),
              }}
            >
              {day}
            </MuiButton>
          ))}
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" component="p" sx={{ fontWeight: 600, mb: 1.5, color: theme.palette.text.secondary }}>
          Additional Availability
        </Typography>
        <Grid container >
          {[
            { label: 'Willing to work overtime', name: 'willingToWorkOvertime' },
            { label: 'Willing to work weekends', name: 'willingToWorkWeekends' },
            { label: 'Willing to work night shifts', name: 'willingToWorkNightShifts' },
            { label: 'Willing to be on-call', name: 'willingToBeOnCall' },
          ].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values[item.name]}
                    onChange={handleChange}
                    name={item.name}
                    color="primary"
                    sx={{ p: 0.5 }}
                  />
                }
                label={
                  <Typography  sx={{  color: theme.palette.text.primary,...theme.typography.smallRegular }}>
                    {item.label}
                  </Typography>
                }
                sx={{ m: 0,  }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

const Availability = () => {
  const isMobileOrBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getAvailability();
        const base = res && typeof res === 'object' ? res : {};
        const data =
          base && typeof base.data === 'object'
            ? base.data
            : base;
        const toLabel = (code) => {
          switch (code) {
            case 'FULL_TIME':
              return 'Full-time (40+ hrs)';
            case 'PART_TIME_30_39':
              return 'Part-time (30-39 hrs)';
            case 'PART_TIME_20_30':
              return 'Part-time (20-30 hrs)';
            case 'LESS_THAN_20':
              return 'Less than 20 hrs';
            default:
              return initialValues.hoursPerWeek;
          }
        };
        const capDay = (d) =>
          typeof d === 'string'
            ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()
            : d;
        setFormInitialValues({
          availableFrom: data?.availableFrom
            ? new Date(data.availableFrom).toISOString().split('T')[0]
            : '',
          hoursPerWeek: toLabel(data?.hoursPerWeek),
          availableDays: Array.isArray(data?.availableDays)
            ? data.availableDays.map(capDay)
            : initialValues.availableDays,
          immediateJoining: '',
          preferredStartTime: '',
          preferredEndTime: '',
          overtimeAllowed: '',
          willingToWorkOvertime: Boolean(data?.willingOvertime),
          willingToWorkWeekends: Boolean(data?.willingWeekends),
          willingToWorkNightShifts: Boolean(data?.willingNightShifts),
          willingToBeOnCall: Boolean(data?.willingOnCall),
        });
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load availability');
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  

const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  const payload = {
    immediateJoining: false,

    availableFrom: new Date(values.availableFrom).toISOString(),

    hoursPerWeek:
      values.hoursPerWeek === 'Full-time (40+ hrs)' ? 'FULL_TIME' :
      values.hoursPerWeek === 'Part-time (30-39 hrs)' ? 'PART_TIME_30_39' :
      values.hoursPerWeek === 'Part-time (20-30 hrs)' ? 'PART_TIME_20_30' :
      'LESS_THAN_20',

    // 🔥 THIS FIXES YOUR FAILURE
    availableDays: values.availableDays.map(day => day.toLowerCase()),

    nightShiftAllowed: values.willingToWorkNightShifts,
    onCallAllowed: values.willingToBeOnCall,
    overtimeAllowed: values.willingToWorkOvertime,
    weekendAllowed: values.willingToWorkWeekends,
  };

  console.log('🚀 FINAL PAYLOAD', payload);

  try {
    await postAvailability(payload);
    alert('Availability saved successfully ✅');
    resetForm();
  } catch (error) {
    console.error('❌ API ERROR', error);
    alert(error?.message || 'Failed to save availability ❌');
  } finally {
    setSubmitting(false);
  }
};


  return (
    <Box sx={{  }}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={AvailabilitySchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            {error && (
              <Typography sx={{ color: theme.palette.error.main, mb: 2 }}>
                {error}
              </Typography>
            )}
            <AvailabilityFields />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <ButtonComponent
                type="submit"
                variant="contained"
                disabled={isSubmitting || loading}
                fullWidth={isMobileOrBelow}
                sx={{ width: isMobileOrBelow ? '100%' : '200px' }}
              >
                Save Availability
              </ButtonComponent>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Availability;
