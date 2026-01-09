import React from "react";
import { Box, Typography, Grid, TextField, Divider } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputComponent from "src/components/shared/Form/Input";
import InputSelect from "src/components/shared/Form/Select";
import ButtonComponent from "src/components/shared/Button";
import { FormLabel } from "../../../utility/Styles";
import { palette, typography } from "src/config/theme";
import { useTheme } from "@emotion/react";
import useResponsive from "src/components/hooks/useResponsive";

export default function OrganizationForm({ onSubmit }) {
  const initialValues = {
    organizationName: "",
    organizationType: "",
    subCategory: "",
    country: "",
    state: "",
    city: "",
    fullAddress: "",
    website: "",
    contactEmail: "",
    contactPhone: "",
    ownershipType: "",
    organizationSize: "",
    description: "",
    accreditations: "",
    industrySector: "",
    serviceCoverage: "",
  };

  const validationSchema = Yup.object({
    organizationName: Yup.string().required("Organization name is required"),
    organizationType: Yup.string().required("Select organization type"),
    country: Yup.string().required("Select country"),
    state: Yup.string().required("Select state"),
    city: Yup.string().required("Enter city"),
    contactEmail: Yup.string()
      .email("Invalid email")
      .required("Contact email is required"),
    contactPhone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
      .required("Contact phone is required"),
  });

const orgTypes = [
  { label: "Hospital", value: "HOSPITAL" },
  { label: "Clinic", value: "CLINIC" },
  { label: "Government", value: "GOVERNMENT" },
  { label: "School", value: "SCHOOL" },
  { label: "Corporate", value: "CORPORATE" },
  { label: "NGO", value: "NGO" },
  { label: "Research Institute", value: "RESEARCH_INSTITUTE" },
  { label: "Staffing Agency", value: "STAFFING_AGENCY" },
];

const ownershipTypes = [
  { label: "Public", value: "PUBLIC" },
  { label: "Private", value: "PRIVATE" },
  { label: "Nonprofit", value: "NONPROFIT" },
  { label: "Government", value: "GOVERNMENT" },
  { label: "Corporate", value: "CORPORATE" },
];

const orgSizes = [
  { label: "Small", value: "SMALL" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Large", value: "LARGE" },
];

const industrySectors = [
  { label: "Healthcare", value: "HEALTHCARE" },
  { label: "Education", value: "EDUCATION" },
  { label: "Corporate", value: "CORPORATE" },
  { label: "Government", value: "GOVERNMENT" },
  { label: "NGO", value: "NGO" },
  { label: "Research", value: "RESEARCH" },
  { label: "Staffing", value: "STAFFING" },
];

const coverageAreas = [
  { label: "Local", value: "LOCAL" },
  { label: "Statewide", value: "STATEWIDE" },
  { label: "National", value: "NATIONAL" },
  { label: "International", value: "INTERNATIONAL" },
];

  const theme = useTheme();
   const { isMobile, isTablet } = useResponsive();
   

  return (
  
      <Box>
         
      <Typography  sx={{ ...typography.h2, mb: 1 }}>
        Organization Details
      </Typography>
        <Typography
              sx={{
                ...theme.typography.smallRegular,
                color: palette.gery.darkGray,
                mb: 1,
              }}
            >Tell us more about your organization to complete your profile.</Typography>
            <Divider sx={{mb:2}}/>
            
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur,setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>

              {/* ORGANIZATION NAME */}
              <Grid item xs={12} sm={6}>
                <FormLabel>Organization Name</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="organizationName"
                  placeholder="Enter organization name"
                  fullWidth
                  value={values.organizationName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.organizationName &&
                    Boolean(errors.organizationName)
                  }
                  helperText={
                    touched.organizationName && errors.organizationName
                  }
                />
              </Grid>

              {/* ORGANIZATION TYPE */}
              <Grid item xs={12} sm={6}>
                <FormLabel>Organization Type</FormLabel>
                <InputSelect
                variant="outlined"
                  name="organizationType"
                  options={orgTypes}
                  placeholder="Select type"
                  fullWidth
                  value={values.organizationType}
                 onChange={(value) => setFieldValue("organizationType", value)}

                  onBlur={handleBlur}
                  error={
                    touched.organizationType &&
                    Boolean(errors.organizationType)
                  }
                  helperText={
                    touched.organizationType && errors.organizationType
                  }
                />
              </Grid>

              {/* SUB CATEGORY */}
              <Grid item xs={12} sm={6}>
                <FormLabel>Sub-Category</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="subCategory"
                  placeholder="e.g., Telehealth Company"
                  fullWidth
                  value={values.subCategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>

              {/* COUNTRY */}
              <Grid item xs={12} sm={6}>
                <FormLabel>Country</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="country"
                  placeholder="Enter country"
                  fullWidth
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                />
              </Grid>

              {/* STATE */}
              <Grid item xs={12} sm={6}>
                <FormLabel>State / Province</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="state"
                  placeholder="Enter state"
                  fullWidth
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                />
              </Grid>

              {/* CITY */}
              <Grid item xs={12} sm={6}>
                <FormLabel>City</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="city"
                  placeholder="Enter city"
                  fullWidth
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>

              {/* ADDRESS */}
              <Grid item xs={12}>
                <FormLabel>Address</FormLabel>
                <TextField
                    variant="outlined"
                  name="fullAddress"
                  placeholder="Enter address"
                  fullWidth
                  multiline
                  rows={2}
                  value={values.fullAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                    sx={{
                     '& .MuiOutlinedInput-root': {
            borderRadius:'12px',
           
                     }
                  }}
                />
              </Grid>

              {/* WEBSITE */}
              <Grid item xs={12} sm={6}>
                <FormLabel>Website URL</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="website"
                  placeholder="https://"
                  fullWidth
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>

              {/* CONTACT EMAIL */}
              <Grid item xs={12} sm={6}>
                <FormLabel>General Contact Email</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="contactEmail"
                  placeholder="Enter email"
                  fullWidth
                  value={values.contactEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactEmail && Boolean(errors.contactEmail)}
                  helperText={touched.contactEmail && errors.contactEmail}
                />
              </Grid>

              {/* CONTACT PHONE */}
              <Grid item xs={12} sm={6}>
                <FormLabel>General Contact Phone</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="contactPhone"
                  placeholder="10-digit number"
                  fullWidth
                  value={values.contactPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactPhone && Boolean(errors.contactPhone)}
                  helperText={touched.contactPhone && errors.contactPhone}
                />
              </Grid>

              {/* OWNERSHIP TYPE */}
              <Grid item xs={12} sm={6}>
                <FormLabel>Ownership Type</FormLabel>
                <InputSelect
                    variant="outlined"
                  name="ownershipType"
                  options={ownershipTypes}
                  placeholder="Select"
                  fullWidth
                  value={values.ownershipType}
                 onChange={(value) => setFieldValue("ownershipType", value)}

                />
              </Grid>

              {/* ORG SIZE */}
              <Grid item xs={12} sm={12}>
                <FormLabel>Organization Size</FormLabel>
                <InputSelect
                    variant="outlined"
                  name="organizationSize"
                  options={orgSizes}
                  placeholder="Select size"
                  fullWidth
                  value={values.organizationSize}
              onChange={(value) => setFieldValue("organizationSize", value)}
                />
              </Grid>

              {/* DESCRIPTION */}
              <Grid item xs={12}>
                <FormLabel>Description / About Organization</FormLabel>
                <TextField
                    variant="outlined"
                  name="description"
                  placeholder="Short summary"
                  fullWidth
                  rows={3}
                  multiline
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                     '& .MuiOutlinedInput-root': {
            borderRadius:'12px',
           
                     }
                  }}
                />
              </Grid>

              {/* ACCREDITATIONS */}
              <Grid item xs={12}>
                <FormLabel>Accreditation / Certifications</FormLabel>
                <InputComponent
                    variant="outlined"
                  name="accreditations"
                  placeholder="e.g., JCI, Magnet Status"
                  fullWidth
                  value={values.accreditations}
                  onChange={handleChange}
                />
              </Grid>

              {/* PRIMARY INDUSTRY */}
              <Grid item xs={12} sm={6}>
                <FormLabel>Primary Industry Sector</FormLabel>
                <InputSelect
                    variant="outlined"
                  name="industrySector"
                  options={industrySectors}
                  placeholder="Select"
                  fullWidth
                  value={values.industrySector}
                onChange={(value) => setFieldValue("industrySector", value)}

                />
              </Grid>

              {/* SERVICE COVERAGE */}
              <Grid item xs={12} sm={6}>
                <FormLabel>Service Coverage Area</FormLabel>
                <InputSelect
                    variant="outlined"
                  name="serviceCoverage"
                  options={coverageAreas}
                  placeholder="Select"
                  fullWidth
                  value={values.serviceCoverage}
                 onChange={(value) => setFieldValue("serviceCoverage", value)}

                />
              </Grid>

            
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  
  );
}
