import React, { useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
  Autocomplete,
  Chip,
  TextField
} from "@mui/material";

import theme from "src/config/theme";
import InputComponent from "src/components/shared/Form/Input";
import InputSelect from "src/components/shared/Form/Select";
import ButtonComponent from "src/components/shared/Button";
import { FormHeaderContainer, HeaderText, SubHeader, FormLabel } from "../../../utility/Styles";
import { postProfilePreferences } from 'src/modules/auth/api/authApi';


export const PreferencesSchema = Yup.object().shape({
  willingnessToRelocate: Yup.string().required("Required"),
  willingToTravel: Yup.string().required("Required"),
  travelPreference: Yup.array().when("willingToTravel", {
    is: "yes",
    then: (schema) => schema.min(1, "Select at least one").required(),
    otherwise: (schema) => schema.notRequired(),
  }),
  relocationStates: Yup.array().optional(),
  internationalRelocation: Yup.string().required("Required"),
  preferredCountries: Yup.array().when("internationalRelocation", {
    is: "yes",
    then: (schema) => schema.min(1, "Select at least one country").required(),
    otherwise: (schema) => schema.notRequired(),
  }),
  primaryCategories: Yup.array().min(1, "Select at least one role"),
  humanitarianRoles: Yup.array().when("primaryCategories", {
    is: (categories) => categories?.includes("humanitarian"),
    then: (schema) =>
      schema.min(1, "Select at least one humanitarian role").required(),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const initialValues = {
  willingnessToRelocate: "",
  willingToTravel: "",
  travelPreference: [],
  relocationStates: [],
  internationalRelocation: "",
  preferredCountries: [],
  primaryCategories: [],
  humanitarianRoles: [],
};

const stateOptions = [
  { label: "State A", value: "A" },
  { label: "State B", value: "B" },
  { label: "State C", value: "C" },
];

const countryOptions = [
  { label: "USA", value: "usa" },
  { label: "Canada", value: "canada" },
  { label: "UK", value: "uk" },
  { label: "Australia", value: "australia" },
];

const travelOptions = ["Travel Nurse", "Stationary Nurse", "Hybrid"];

const primaryCategoriesOptions = [
  { label: "Travel Nurse", value: "travel" },
  { label: "Stationary Nurse", value: "stationary" },
  { label: "Specialized Nurse", value: "specialized" },
  { label: "Crisis / Humanitarian Nurse", value: "humanitarian" },
];

const humanitarianRolesOptions = [
  "Humanitarian Nurse",
  "Relief Nurse",
  "Emergency Response Nurse",
  "Global Health Nurse",
  "Medical Missionary Nurse",
  "Field Nurse",
  "Disaster Relief Nurse",
];

const PreferencesFields = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  const toggleCheckbox = (field, value) => {
    const current = values[field] || [];
    if (current.includes(value)) {
      setFieldValue(
        field,
        current.filter((v) => v !== value)
      );
    } else {
      setFieldValue(field, [...current, value]);
    }
  };

  return (
    <Box>
      <FormHeaderContainer sx={{ mb: 2 }}>
        <HeaderText>My Preferences</HeaderText>
        <SubHeader>Set your ideal job criteria</SubHeader>
      </FormHeaderContainer>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <FormLabel>Willingness to Relocate</FormLabel>
          <InputSelect
            fullWidth
            variant="outlined"
            name="willingnessToRelocate"
            value={values.willingnessToRelocate}
            onChange={(val) => setFieldValue("willingnessToRelocate", val)}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            error={touched.willingnessToRelocate && Boolean(errors.willingnessToRelocate)}
            helperText={touched.willingnessToRelocate && errors.willingnessToRelocate}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormLabel>Willing to Travel</FormLabel>
          <InputSelect
            fullWidth
            variant="outlined"
            name="willingToTravel"
            value={values.willingToTravel}
            onChange={(val) => setFieldValue("willingToTravel", val)}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            error={touched.willingToTravel && Boolean(errors.willingToTravel)}
            helperText={touched.willingToTravel && errors.willingToTravel}
          />
        </Grid>

        {values.willingToTravel === "yes" && (
          <Grid item xs={12}>
            <FormLabel>Travel Preference</FormLabel>
            <Box>
              {travelOptions.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={values.travelPreference.includes(item)}
                      onChange={() => toggleCheckbox("travelPreference", item)}
                    />
                  }
                  label={item}
                />
              ))}
            </Box>
            {touched.travelPreference && errors.travelPreference && (
              <Typography color="error" variant="caption">
                {errors.travelPreference}
              </Typography>
            )}
          </Grid>
        )}

        {values.willingnessToRelocate === "yes" && (
          <Grid item xs={12} sm={12}>
            <FormLabel>Preferred Relocation States</FormLabel>
            <InputSelect
              fullWidth
              variant="outlined"
              name="relocationStates"
              multiple
              value={values.relocationStates}
              onChange={(val) => setFieldValue("relocationStates", val)}
              options={stateOptions}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={12}>
          <FormLabel>International Relocation</FormLabel>
          <InputSelect
            fullWidth
            variant="outlined"
            name="internationalRelocation"
            value={values.internationalRelocation}
            onChange={(val) => setFieldValue("internationalRelocation", val)}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            error={touched.internationalRelocation && Boolean(errors.internationalRelocation)}
            helperText={touched.internationalRelocation && errors.internationalRelocation}
          />
        </Grid>

        {values.internationalRelocation === "yes" && (
          <Grid item xs={12} sm={12}>
            <FormLabel>Preferred Countries</FormLabel>
            <InputSelect
              fullWidth
              variant="outlined"
              multiple
              name="preferredCountries"
              value={values.preferredCountries}
              onChange={(val) => setFieldValue("preferredCountries", val)}
              options={countryOptions}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <FormLabel>Primary Categories</FormLabel>
          <Box>
            {primaryCategoriesOptions.map((item) => (
              <FormControlLabel
                key={item.value}
                control={
                  <Checkbox
                    checked={values.primaryCategories.includes(item.value)}
                    onChange={() =>
                      toggleCheckbox("primaryCategories", item.value)
                    }
                  />
                }
                label={item.label}
              />
            ))}
          </Box>
        </Grid>

        {values.primaryCategories.includes("humanitarian") && (
          <Grid item xs={12}>
            <FormLabel>Humanitarian Roles</FormLabel>

            <Autocomplete
              variant="outlined"
              multiple
              options={humanitarianRolesOptions}
              value={values.humanitarianRoles}
              onChange={(e, newValue) =>
                setFieldValue("humanitarianRoles", newValue)
              }
              sx={{
                "& .MuiAutocomplete-inputRoot": {
                  padding: "6px 8px !important",
                  alignItems: "flex-start",
                  minHeight: "56px",
                },
                "& .MuiAutocomplete-tag": {
                  margin: "4px",
                },
                "& .MuiChip-root": {
                  margin: "4px !important",
                },
                "& .MuiOutlinedInput-root": {
                  paddingTop: "8px !important",
                  paddingBottom: "8px !important",
                  flexWrap: "wrap !important",
                  alignItems: "flex-start !important",
                },
                "& .MuiAutocomplete-input": {
                  padding: "4px 0 !important",
                  marginTop: "4px !important",
                },
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    sx={{
                      background: theme.palette.primary.light2,
                      color: theme.palette.primary.main,
                      borderRadius: "8px",
                      fontWeight: "500",
                      ...theme.typography.smallRegular,
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Add humanitarian roles"
                  name="humanitarianRoles"
                  error={
                    touched.humanitarianRoles &&
                    Boolean(errors.humanitarianRoles)
                  }
                  helperText={
                    touched.humanitarianRoles && errors.humanitarianRoles
                  }
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      borderRadius: "12px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const Preferences = () => {
  const isMobileOrBelow = useMediaQuery(theme.breakpoints.down("sm"));

const handleSubmit = async (values) => {
  const categoryLabelMap = {
    travel: "Travel Nurse",
    stationary: "Stationary Nurse",
    specialized: "Specialized Nurse",
    humanitarian: "Crisis / Humanitarian Nurse",
  };

  const payload = {
    willingnessToRelocate: values.willingnessToRelocate === "yes",
    willingToTravel: values.willingToTravel === "yes",

    travelPreference:
      values.willingToTravel === "yes"
        ? values.travelPreference
        : [],

    relocationStates:
      values.willingnessToRelocate === "yes"
        ? values.relocationStates
        : [],

    internationalRelocation: values.internationalRelocation === "yes",

    preferredCountries:
      values.internationalRelocation === "yes"
        ? values.preferredCountries
        : [],

    // 🔥 FIX THAT WAS MISSING
    primaryCategories: values.primaryCategories.map(
      (key) => categoryLabelMap[key]
    ),

    humanitarianRoles: values.humanitarianRoles,
  };

  console.log("✅ FINAL PAYLOAD", payload);

 try {
  await postProfilePreferences(payload);

  alert("Your preferences saved successfully ✅");

  window.location.reload(); // 🔥 reload page

} catch (error) {
  alert(
    error?.response?.data?.message ||
    "Something went wrong while saving preferences ❌"
  );
}

};




  return (
   <Formik
  initialValues={initialValues}
  validationSchema={PreferencesSchema}
  onSubmit={handleSubmit}
>

      {() => (
        <Form>
          <PreferencesFields />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <ButtonComponent
              type="submit"
              variant="contained"
              fullWidth={isMobileOrBelow}
            >
              Save Preferences
            </ButtonComponent>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Preferences;
