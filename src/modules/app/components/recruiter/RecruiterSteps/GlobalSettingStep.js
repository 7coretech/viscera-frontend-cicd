import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Grid,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Divider,
} from '@mui/material';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import useResponsive from 'src/components/hooks/useResponsive';
import InputComponent from 'src/components/shared/Form/Input';
import { FormLabel } from 'src/modules/app/utility/Styles';
import InputSelect from 'src/components/shared/Form/Select';
import ButtonComponent from 'src/components/shared/Button';

const genderOptions = [
  { label: 'No Preference', value: 'no_preference' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const workStatusOptions = [
  { label: 'No Preference', value: 'no_preference' },
  { label: 'Experienced', value: 'experienced' },
  { label: 'Student/Intern', value: 'intern' },
];

const yesNoNoPref = [
  { label: 'No Preference', value: 'no_preference' },
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const travelOptions = ['Travel Nurse', 'Stationary Nurse', 'Hybrid'];

const primaryCategoriesOptions = [
  { label: 'Travel Nurse', value: 'travel' },
  { label: 'Stationary Nurse', value: 'stationary' },
  { label: 'Specialized Nurse', value: 'specialized' },
  { label: 'Crisis / Humanitarian Nurse', value: 'humanitarian' },
];

const humanitarianRolesOptions = [
  'Humanitarian Nurse',
  'Relief Nurse',
  'Emergency Response Nurse',
  'Global Health Nurse',
  'Medical Missionary Nurse',
  'Field Nurse',
  'Disaster Relief Nurse',
];

const countryOptions = [
  { label: 'USA', value: 'usa' },
  { label: 'Canada', value: 'canada' },
  { label: 'UK', value: 'uk' },
  { label: 'Australia', value: 'australia' },
];

const noPreferenceOption = { label: 'No Preference', value: 'no_preference' };
const nursingLicenseTypeOptions = [
  noPreferenceOption,
  { label: 'Registered Nurse (RN)', value: 'RN' },
  { label: 'Licensed Practical Nurse (LPN)', value: 'LPN' },
  { label: 'Licensed Vocational Nurse (LVN)', value: 'LVN' },
  { label: 'Nurse Practitioner (NP)', value: 'NP' },
  { label: 'Advanced Practice Registered Nurse (APRN)', value: 'APRN' },
];
const jobTypeOptions = [
  noPreferenceOption,
  { label: 'Full-Time', value: 'Full-Time' },
  { label: 'Part-Time', value: 'Part-Time' },
  { label: 'Contract', value: 'Contract' },
  { label: 'PRN', value: 'PRN' },
  { label: 'Per-Diem', value: 'Per-Diem' },
];

const shiftTypeOptions = [
  noPreferenceOption,
  { label: 'Day', value: 'Day' },
  { label: 'Night', value: 'Night' },
  { label: 'Rotational', value: 'Rotational' },
];

const contractOptions = [
  noPreferenceOption,
  { label: '4 weeks', value: '4 weeks' },
  { label: '8 weeks', value: '8 weeks' },
  { label: '12 weeks', value: '12 weeks' },
  { label: '24 weeks', value: '24 weeks' },
];
const clinicalSkillOptions = [
  'ICU',
  'Emergency/ER',
  'Pediatric',
  'OR/Surgical',
  'NICU',
  'Telehealth',
  'Geriatric Care',
  'Mental Health/Psychiatric',
  'Public Health',
  'Community Health',
  'Home Health',
  'Hospice',
  'Labour & Delivery',
  'Crisis/Disaster Response',
];

const technicalSkillOptions = [
  'EMR Systems',
  'Cerner',
  'Telemetry',
  'EPIC',
  'Meditech',
  'Ventilator Management',
  'IV Insertion',
  'Phlebotomy',
];

const softSkillOptions = [
  'Leadership',
  'Time Management',
  'Empathy',
  'Problem Solving',
  'Teamwork',
  'Communication',
  'Adaptability',
  'Critical Thinking',
];

const validationSchema = Yup.object().shape({
  preferredGender: Yup.string().required(),
  preferredWorkStatus: Yup.string().required(),

  noLocationPreference: Yup.boolean(),
  preferredStates: Yup.array().optional(),
  preferredCities: Yup.array().optional(),

  noAgePreference: Yup.boolean(),
  minAge: Yup.number().nullable().min(18, 'Minimum age must be at least 18').optional(),
  maxAge: Yup.number()
    .nullable()
    .test('maxAge', 'Max age must be greater than min age', function (value) {
      const { minAge } = this.parent;
      if (!value || !minAge) return true;
      return value >= minAge;
    })
    .optional(),

  willingnessToRelocate: Yup.string().required(),
  willingToTravel: Yup.string().required(),
  travelPreference: Yup.array().optional(),
  internationalRelocation: Yup.string().required(),
  preferredCountries: Yup.array().optional(),
  primaryCategories: Yup.array().optional(),
  humanitarianRoles: Yup.array().optional(),

  preferredJobType: Yup.string().required('Job Type is required'),
  preferredShiftType: Yup.string().required('Shift Type is required'),
  preferredContractDuration: Yup.array()
    .min(1, 'At least one Contract Duration is required')
    .required('Contract Duration is required'),
  preferredNursingLicenseType: Yup.string().required('License Type is required'),

  requiredDriverLicense: Yup.string().required(),
  requiredOwnVehicle: Yup.string().required(),
  requiredValidPassport: Yup.string().required(),
  minTravelTimePercentage: Yup.number().nullable().min(0).max(100).optional(),
  maxTravelDistanceRequired: Yup.number().nullable().min(0).max(1000).optional(),

  clinicalSkills: Yup.array().optional(),
  technicalSkills: Yup.array().optional(),
  softSkills: Yup.array().optional(),
  salaryType: Yup.string().required(),
  minimumSalary: Yup.number().nullable().min(0),
  maximumSalary: Yup.number().nullable().min(0),
  salaryNegotiable: Yup.string().required(),

  hoursPerWeek: Yup.string().required(),
  availableDays: Yup.array().min(1, 'Select at least one day'),
  overtimeAllowed: Yup.string().optional(),
});

const GlobalSettingStep = () => {
  const theme = useTheme();
  const { isMobile, isTablet } = useResponsive();

  const SkillsAutocomplete = ({ label, name, placeholder, options }) => {
    const { values, setFieldValue, touched, errors } = useFormikContext();

    return (
      <Autocomplete
        multiple
        freeSolo
        options={options}
        value={values[name]}
        onChange={(e, newValue) => setFieldValue(name, newValue)}
        sx={{
          '& .MuiAutocomplete-inputRoot': {
            padding: '6px 8px !important',
            alignItems: 'flex-start',
            minHeight: '56px',
          },
          '& .MuiAutocomplete-tag': {
            margin: '4px',
          },
          '& .MuiChip-root': {
            margin: '4px !important',
            background: theme.palette.primary.light2,
            color: theme.palette.primary.main,
            borderRadius: '8px',
            fontWeight: '500',
            ...theme.typography.smallRegular,
          },
          '& .MuiOutlinedInput-root': {
            paddingTop: '8px !important',
            paddingBottom: '8px !important',
            flexWrap: 'wrap !important',
            alignItems: 'flex-start !important',
            borderRadius: '8px',
          },
          '& .MuiAutocomplete-input': {
            padding: '4px 0 !important',
            marginTop: '4px !important',
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={placeholder}
            error={touched[name] && Boolean(errors[name])}
            helperText={touched[name] && errors[name]}
            InputProps={{
              ...params.InputProps,
              sx: {
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                borderRadius: '8px',
              },
            }}
          />
        )}
      />
    );
  };

  return (
    <Box>
      <Typography sx={{ ...theme.typography.h2, mb: 1 }}>Global Settings</Typography>
 <Typography
              sx={{
                ...theme.typography.smallRegular,
                color: theme.palette.gery.darkGray,
                mb: 1,
              }}
            >    Set your default rules for candidate visibility and post reach
</Typography>
            <Divider sx={{mb:2}}/>

        <Formik
          initialValues={{
            preferredGender: 'no_preference',
            preferredWorkStatus: 'no_preference',

            noLocationPreference: true,
            preferredStates: [],
            preferredCities: [],

            noAgePreference: true,
            minAge: '',
            maxAge: '',

            willingnessToRelocate: 'no_preference',
            willingToTravel: 'no_preference',
            travelPreference: [],
            internationalRelocation: 'no_preference',
            preferredCountries: [],
            primaryCategories: [],
            humanitarianRoles: [],

            preferredJobType: 'no_preference',
            preferredShiftType: 'no_preference',
            preferredContractDuration: [],
            preferredNursingLicenseType: 'no_preference',

            requiredDriverLicense: 'no_preference',
            requiredOwnVehicle: 'no_preference',
            requiredValidPassport: 'no_preference',
            minTravelTimePercentage: null,
            maxTravelDistanceRequired: null,

            clinicalSkills: [],
            technicalSkills: [],
            softSkills: [],
            salaryType: 'annual',
            minimumSalary: '',
            maximumSalary: '',
            salaryNegotiable: 'no_preference',
            hoursPerWeek: '',
            availableDays: [],
            willingToWorkOvertime: false,
            willingToWorkWeekends: false,
            willingToWorkNightShifts: false,
            willingToBeOnCall: false,
            overtimeAllowed: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log('FINAL SUBMIT:', values)}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Box>
                <Grid container rowSpacing={1} columnSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormLabel>Preferred Gender</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="preferredGender"
                      value={values.preferredGender}
                      onChange={handleChange}
                    >
                      {genderOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Preferred Work Status</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="preferredWorkStatus"
                      value={values.preferredWorkStatus}
                      onChange={handleChange}
                    >
                      {workStatusOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.noLocationPreference}
                          onChange={(e) => setFieldValue('noLocationPreference', e.target.checked)}
                        />
                      }
                      label="No Location Preference"
                    />
                  </Grid>

                  {!values.noLocationPreference && (
                    <Grid item xs={12} md={6}>
                      <FormLabel>Preferred States</FormLabel>
                      <InputComponent
                        variant="outlined"
                        fullWidth
                        value={values.preferredStates.join(', ')}
                        onChange={(e) =>
                          setFieldValue(
                            'preferredStates',
                            e.target.value.split(',').map((s) => s.trim()),
                          )
                        }
                      />
                    </Grid>
                  )}

                  {!values.noLocationPreference && (
                    <Grid item xs={12} md={6}>
                      <FormLabel>Preferred Cities</FormLabel>
                      <InputComponent
                        variant="outlined"
                        fullWidth
                        value={values.preferredCities.join(', ')}
                        onChange={(e) =>
                          setFieldValue(
                            'preferredCities',
                            e.target.value.split(',').map((s) => s.trim()),
                          )
                        }
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.noAgePreference}
                          onChange={(e) => setFieldValue('noAgePreference', e.target.checked)}
                        />
                      }
                      label="No Age Preference"
                    />
                  </Grid>

                  {!values.noAgePreference && (
                    <Grid item xs={12} md={6}>
                      <FormLabel>Minimum Age</FormLabel>
                      <InputComponent
                        variant="outlined"
                        fullWidth
                        type="number"
                        name="minAge"
                        value={values.minAge}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}

                  {!values.noAgePreference && (
                    <Grid item xs={12} md={6}>
                      <FormLabel>Maximum Age</FormLabel>
                      <InputComponent
                        variant="outlined"
                        fullWidth
                        type="number"
                        name="maxAge"
                        value={values.maxAge}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <FormLabel>Willingness to Relocate (Required)</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="willingnessToRelocate"
                      value={values.willingnessToRelocate}
                      onChange={handleChange}
                    >
                      {yesNoNoPref.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Willingness to Travel (Required)</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="willingToTravel"
                      value={values.willingToTravel}
                      onChange={handleChange}
                    >
                      {yesNoNoPref.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  {values.willingToTravel === 'yes' && (
                    <Grid item xs={12}>
                      <FormLabel>Required Travel Preference Types</FormLabel>
                      {travelOptions.map((item) => (
                        <FormControlLabel
                          key={item}
                          control={
                            <Checkbox
                              checked={values.travelPreference.includes(item)}
                              onChange={() => {
                                const arr = values.travelPreference;
                                const updated = arr.includes(item)
                                  ? arr.filter((i) => i !== item)
                                  : [...arr, item];
                                setFieldValue('travelPreference', updated);
                              }}
                            />
                          }
                          label={item}
                        />
                      ))}
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <FormLabel>Minimum Travel Time (%)</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      type="number"
                      name="minTravelTimePercentage"
                      placeholder="e.g. 25 (percent)"
                      value={values.minTravelTimePercentage || ''}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Max Commute/Travel Distance (miles)</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      type="number"
                      name="maxTravelDistanceRequired"
                      placeholder="e.g. 50 (miles)"
                      value={values.maxTravelDistanceRequired || ''}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Driver's License Required</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="requiredDriverLicense"
                      value={values.requiredDriverLicense}
                      onChange={handleChange}
                    >
                      {yesNoNoPref.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Own Vehicle Required</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="requiredOwnVehicle"
                      value={values.requiredOwnVehicle}
                      onChange={handleChange}
                    >
                      {yesNoNoPref.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Valid Passport Required</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="requiredValidPassport"
                      value={values.requiredValidPassport}
                      onChange={handleChange}
                    >
                      {yesNoNoPref.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>International Relocation</FormLabel>
                    <InputComponent
                      variant="outlined"
                      select
                      fullWidth
                      name="internationalRelocation"
                      value={values.internationalRelocation}
                      onChange={handleChange}
                    >
                      {yesNoNoPref.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  {values.internationalRelocation === 'yes' && (
                    <Grid item xs={12} md={6}>
                      <FormLabel>Preferred Countries</FormLabel>
                      <InputComponent
                        variant="outlined"
                        select
                        fullWidth
                        name="preferredCountries"
                        SelectProps={{ multiple: true }}
                        value={values.preferredCountries}
                        onChange={(e) => setFieldValue('preferredCountries', e.target.value)}
                      >
                        {countryOptions.map((c) => (
                          <MenuItem key={c.value} value={c.value}>
                            {c.label}
                          </MenuItem>
                        ))}
                      </InputComponent>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <FormLabel>Required Primary Categories</FormLabel>
                    {primaryCategoriesOptions.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        control={
                          <Checkbox
                            checked={values.primaryCategories.includes(item.value)}
                            onChange={() => {
                              const arr = values.primaryCategories;
                              const updated = arr.includes(item.value)
                                ? arr.filter((i) => i !== item.value)
                                : [...arr, item.value];
                              setFieldValue('primaryCategories', updated);
                            }}
                          />
                        }
                        label={item.label}
                      />
                    ))}
                  </Grid>

                  {values.primaryCategories.includes('humanitarian') && (
                    <Grid item xs={12}>
                      <FormLabel>Required Humanitarian Roles</FormLabel>
                      {humanitarianRolesOptions.map((role) => (
                        <FormControlLabel
                          key={role}
                          control={
                            <Checkbox
                              checked={values.humanitarianRoles.includes(role)}
                              onChange={() => {
                                const arr = values.humanitarianRoles;
                                const updated = arr.includes(role)
                                  ? arr.filter((i) => i !== role)
                                  : [...arr, role];
                                setFieldValue('humanitarianRoles', updated);
                              }}
                            />
                          }
                          label={role}
                        />
                      ))}
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <FormLabel>Preferred Job Type</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="preferredJobType"
                      value={values.preferredJobType}
                      onChange={handleChange}
                    >
                      {jobTypeOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Preferred Shift Type</FormLabel>
                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="preferredShiftType"
                      value={values.preferredShiftType}
                      onChange={handleChange}
                    >
                      {shiftTypeOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Preferred Contract Duration</FormLabel>

                    <InputComponent
                      variant="outlined"
                      fullWidth
                      select
                      name="preferredContractDuration"
                      value={values.preferredContractDuration || []}
                      onChange={(e) => setFieldValue('preferredContractDuration', e.target.value)}
                      SelectProps={{
                        multiple: true,
                        renderValue: (selected) =>
                          contractOptions
                            .filter((opt) => selected.includes(opt.value))
                            .map((opt) => opt.label)
                            .join(', '),
                      }}
                    >
                      {contractOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </InputComponent>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Nursing License Type</FormLabel>
                    <InputSelect
                      variant="outlined"
                      fullWidth
                      name="preferredNursingLicenseType"
                      options={nursingLicenseTypeOptions}
                      value={values.preferredNursingLicenseType || ''}
                      onChange={(val) => setFieldValue('preferredNursingLicenseType', val)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel>Clinical Skills</FormLabel>
                    <SkillsAutocomplete
                      name="clinicalSkills"
                      placeholder="Add clinical skills"
                      options={clinicalSkillOptions}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel>Technical Skills</FormLabel>
                    <SkillsAutocomplete
                      name="technicalSkills"
                      placeholder="Add technical skills"
                      options={technicalSkillOptions}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel>Soft Skills</FormLabel>
                    <SkillsAutocomplete
                      name="softSkills"
                      placeholder="Add soft skills"
                      options={softSkillOptions}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel>Yearly Compensation Range</FormLabel>
                    <Grid container rowSpacing={1} columnSpacing={2}>
                      <Grid item xs={6}>
                        <InputComponent variant="outlined" placeholder="Min" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <InputComponent variant="outlined" placeholder="Max" fullWidth />
                      </Grid>
                    </Grid>
                  </Grid>
                    <Grid item xs={12}>
                    <FormLabel>Weekly Compensation Range</FormLabel>
                    <Grid container rowSpacing={1} columnSpacing={2}>
                      <Grid item xs={6}>
                        <InputComponent variant="outlined" placeholder="Min"  fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <InputComponent variant="outlined" placeholder="Max" fullWidth />
                      </Grid>
                    </Grid>
                  </Grid>
                    <Grid item xs={12}>
                    <FormLabel>Hourly Compensation Range</FormLabel>
                    <Grid container rowSpacing={1} columnSpacing={2}>
                      <Grid item xs={6}>
                        <InputComponent variant="outlined" placeholder="Min" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <InputComponent variant="outlined" placeholder="Max" fullWidth />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormLabel>Hours per Week</FormLabel>
                    <InputSelect
                      variant="outlined"
                      fullWidth
                      name="hoursPerWeek"
                      value={values.hoursPerWeek}
                      onChange={(val) => setFieldValue('hoursPerWeek', val)}
                      options={[
                        { label: 'Full-time (40+ hrs)', value: 'Full-time (40+ hrs)' },
                        { label: 'Part-time (30-39 hrs)', value: 'Part-time (30-39 hrs)' },
                        { label: 'Part-time (20-30 hrs)', value: 'Part-time (20-30 hrs)' },
                        { label: 'Less than 20 hrs', value: 'Less than 20 hrs' },
                      ]}
                      placeholder="Select Hours"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel>Available Days</FormLabel>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {[
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                      ].map((day) => (
                        <ButtonComponent
                          key={day}
                          variant={values.availableDays?.includes(day) ? 'contained' : 'outlined'}
                          onClick={() => {
                            const days = values.availableDays || [];
                            if (days.includes(day)) {
                              setFieldValue(
                                'availableDays',
                                days.filter((d) => d !== day),
                              );
                            } else {
                              setFieldValue('availableDays', [...days, day]);
                            }
                          }}
                          sx={{
                            minWidth: 'auto',
                            px: 2,
                            py: 1,
                            borderRadius: '8px',
                          }}
                        >
                          {day}
                        </ButtonComponent>
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel>Additional Availability</FormLabel>
                  </Grid>

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
                          />
                        }
                        label={item.label}
                      />
                    </Grid>
                  ))}

                  {/* OPTIONAL FIELD */}
                  <Grid item xs={12} md={12}>
                    <FormLabel>Overtime Allowed</FormLabel>
                    <InputSelect
                      variant="outlined"
                      fullWidth
                      name="overtimeAllowed"
                      value={values.overtimeAllowed}
                      onChange={(val) => setFieldValue('overtimeAllowed', val)}
                      options={[
                        { label: 'Yes', value: 'Yes' },
                        { label: 'No', value: 'No' },
                      ]}
                      placeholder="Select Yes / No"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Travel Time Percentage</FormLabel>
                    <InputSelect
                      variant="outlined"
                      fullWidth
                      name="travelTimePercentage"
                      value={values.travelTimePercentage}
                      onChange={(val) => setFieldValue('travelTimePercentage', val)}
                      options={[
                        { label: '0–10%', value: '0-10%' },
                        { label: '10–25%', value: '10-25%' },
                        { label: '25–50%', value: '25-50%' },
                        { label: '50–75%', value: '50-75%' },
                        { label: '75–100%', value: '75-100%' },
                      ]}
                      placeholder="Select Percentage"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormLabel>Max Travel Distance</FormLabel>
                    <InputSelect
                      variant="outlined"
                      fullWidth
                      name="maxTravelDistance"
                      value={values.maxTravelDistance}
                      onChange={(val) => setFieldValue('maxTravelDistance', val)}
                      options={[
                        { label: 'Up to 10 km', value: '0-10' },
                        { label: '10–25 km', value: '10-25' },
                        { label: '25–50 km', value: '25-50' },
                        { label: '50–100 km', value: '50-100' },
                        { label: '100+ km', value: '100+' },
                      ]}
                      placeholder="Select Distance"
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <FormLabel>Preferred Work Style</FormLabel>
                    <InputSelect
                      variant="outlined"
                      fullWidth
                      name="preferredWorkStyle"
                      value={values.preferredWorkStyle}
                      onChange={(val) => setFieldValue('preferredWorkStyle', val)}
                      options={[
                        { label: 'Remote', value: 'Remote' },
                        { label: 'On-Site', value: 'On-Site' },
                        { label: 'Hybrid', value: 'Hybrid' },
                        { label: 'Willing to Relocate', value: 'Willing to Relocate' },
                      ]}
                      placeholder="Select Work Style"
                    />
                  </Grid>
                </Grid>

              
              </Box>
            </Form>
          )}
        </Formik>
    
    </Box>
  );
};

export default GlobalSettingStep;
