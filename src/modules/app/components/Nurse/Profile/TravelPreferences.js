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
  Slider,
} from '@mui/material';
import InputComponent from 'src/components/shared/Form/Input';
import {
  FormLabel,
  FormHeaderContainer,
  HeaderText,
  SubHeader,
} from '../../../utility/Styles';
import theme from 'src/config/theme';
import ButtonComponent from 'src/components/shared/Button';

import { postTravelPreference } from 'src/modules/auth/api/authApi';
import { getTravelPreference } from 'src/modules/auth/api/authApi';
const initialValues = {
  isWillingToTravel: false,
  travelTimePercentage: 25,
  maxTravelDistance: 50,
  preferredStates: '',
  hasDriversLicense: false,
  hasOwnVehicle: false,
  hasValidPassport: false,
  willingForInternationalDeployment: false,
  preferredWorkStyle: [],
};

const TravelPreferencesSchema = Yup.object().shape({
  isWillingToTravel: Yup.boolean(),
  travelTimePercentage: Yup.number().min(0).max(100),
  maxTravelDistance: Yup.number().min(10).max(500),
  preferredStates: Yup.string().optional(),
  hasDriversLicense: Yup.boolean(),
  hasOwnVehicle: Yup.boolean(),
  hasValidPassport: Yup.boolean(),
  willingForInternationalDeployment: Yup.boolean(),
  preferredWorkStyle: Yup.array().min(1, 'Select at least one option').optional(),
});

const TravelFields = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } = useFormikContext();

  const handleTravelTimeChange = (event, newValue) => {
    setFieldValue('travelTimePercentage', newValue);
  };

  const handleMaxDistanceChange = (event, newValue) => {
    setFieldValue('maxTravelDistance', newValue);
  };

  const renderPreferredStatesInput = () => (
    <InputComponent
      variant="outlined"
      name="preferredStates"
      placeholder="Enter states you prefer to work in, separated by commas"
      value={values.preferredStates || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.preferredStates && Boolean(errors.preferredStates)}
      helperText={touched.preferredStates && errors.preferredStates}
    />
  );

  const workStyleOptions = [
    { label: 'Relocation', value: 'Relocation' },
    { label: 'Travelling', value: 'Travelling' },
    { label: 'Stationary', value: 'Stationary' },
    { label: 'Hybrid', value: 'Hybrid' },
  ];

  return (
    <Box>
      <FormHeaderContainer sx={{ mb: 4 }}>
        <HeaderText>Travel Preferences</HeaderText>
        <SubHeader>Set your travel and relocation preferences</SubHeader>
      </FormHeaderContainer>

      <Box sx={{ mb: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.isWillingToTravel}
              onChange={handleChange}
              name="isWillingToTravel"
              color="primary"
              sx={{ p: 0.5 }}
            />
          }
          label={
            <Typography sx={{ color: theme.palette.text.primary, ...theme.typography.h4 }}>
              I am willing to travel for work
            </Typography>
          }
          sx={{ m: 0, mr: 2 }}
        />
      </Box>

      {values.isWillingToTravel && (
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={6}>
            <FormLabel sx={{ mb: 2 }}>Travel Time: {values.travelTimePercentage}%</FormLabel>
            <Slider
              name="travelTimePercentage"
              value={values.travelTimePercentage}
              onChange={handleTravelTimeChange}
              aria-labelledby="travel-time-slider"
              min={0}
              max={100}
              step={5}
              valueLabelDisplay="off"
              sx={{
                color: theme.palette.primary.main,
                '& .MuiSlider-thumb': { backgroundColor: theme.palette.primary.dark },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -1.5 }}>
              <Typography variant="caption" color="text.secondary">
                0%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                100%
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormLabel sx={{ mb: 2 }}>Max Travel Distance: {values.maxTravelDistance} miles</FormLabel>
            <Slider
              name="maxTravelDistance"
              value={values.maxTravelDistance}
              onChange={handleMaxDistanceChange}
              aria-labelledby="max-distance-slider"
              min={10}
              max={500}
              step={10}
              valueLabelDisplay="off"
              sx={{
                color: theme.palette.primary.main,
                '& .MuiSlider-thumb': { backgroundColor: theme.palette.primary.dark },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -1.5 }}>
              <Typography variant="caption" color="text.secondary">
                10mi
              </Typography>
              <Typography variant="caption" color="text.secondary">
                500mi
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      <Box mt={4}>
        <FormLabel>Preferred States/Regions</FormLabel>
        {renderPreferredStatesInput()}

        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          Enter states you prefer to work in, separated by commas
        </Typography>

        <Box mt={3}>
          <FormLabel>Preferred Work Style</FormLabel>
          <Grid container direction="row" spacing={1} mt={1}>
            {workStyleOptions.map((item) => (
              <Grid item key={item.value}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="preferredWorkStyle"
                      value={item.value}
                      checked={values.preferredWorkStyle.includes(item.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue('preferredWorkStyle', [...values.preferredWorkStyle, item.value]);
                        } else {
                          setFieldValue(
                            'preferredWorkStyle',
                            values.preferredWorkStyle.filter((v) => v !== item.value)
                          );
                        }
                      }}
                      color="primary"
                      sx={{ p: 0.5 }}
                    />
                  }
                  label={<Typography sx={{ color: theme.palette.text.primary }}>{item.label}</Typography>}
                  sx={{ m: 0 }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography sx={{ ...theme.typography.h6, mb: 1.5, color: theme.palette.text.secondary }}>
          Additional Information
        </Typography>
        <Grid container direction="column" spacing={1}>
          {[
            { label: "I have a valid driver's license", name: 'hasDriversLicense' },
            { label: 'I have my own vehicle', name: 'hasOwnVehicle' },
            { label: 'I have a valid passport', name: 'hasValidPassport' },
            { label: 'I am open to international travel assignments', name: 'willingForInternationalDeployment' },
          ].map((item) => (
            <Grid item key={item.name}>
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
                  <Typography sx={{ ...theme.typography.body1, color: theme.palette.text.primary }}>
                    {item.label}
                  </Typography>
                }
                sx={{ m: 0, mr: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const TravelPreferences = () => {
  const isMobileOrBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTravel = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getTravelPreference();
        const base = res && typeof res === 'object' ? res : {};
        const data =
          base && typeof base.data === 'object'
            ? base.data
            : base;
        setFormInitialValues({
          isWillingToTravel: Boolean(data?.willingToTravel),
          travelTimePercentage: 25,
          maxTravelDistance: 50,
          preferredStates: Array.isArray(data?.preferredStatesOrRegions) ? data.preferredStatesOrRegions.join(', ') : '',
          hasDriversLicense: Boolean(data?.additionalInformation?.hasDriversLicense),
          hasOwnVehicle: Boolean(data?.additionalInformation?.hasOwnVehicle),
          hasValidPassport: Boolean(data?.additionalInformation?.hasPassport),
          willingForInternationalDeployment: Boolean(data?.additionalInformation?.openToInternationalAssignments),
          preferredWorkStyle: Array.isArray(data?.preferredWorkStyle) ? data.preferredWorkStyle : [],
        });
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load travel preferences');
      } finally {
        setLoading(false);
      }
    };
    fetchTravel();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Transform preferredStates string to array for API
      const transformedValues = {
        ...values,
        preferredStates: values.preferredStates
          ? values.preferredStates.split(',').map((s) => s.trim())
          : [],
      };

      console.log('Submitting travel preferences:', JSON.stringify(transformedValues, null, 2));

      const response = await postTravelPreference(transformedValues);

      console.log('Travel preferences saved successfully:', response);

      alert('Travel preferences saved successfully!');
    } catch (error) {
      console.error('Error saving travel preferences:', error);
      alert('Failed to save travel preferences. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={formInitialValues}
        validationSchema={TravelPreferencesSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {() => (
          <Form>
            {error && (
              <Typography sx={{ color: theme.palette.error.main, mb: 2 }}>
                {error}
              </Typography>
            )}
            <TravelFields />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <ButtonComponent
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth={isMobileOrBelow}
                sx={{ width: isMobileOrBelow ? '100%' : 200 }}
              >
                Save Travel Preferences
              </ButtonComponent>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TravelPreferences;
