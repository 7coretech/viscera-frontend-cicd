import React, { useState } from "react";
import { Box, Typography, Stepper, Step, StepLabel, Button } from "@mui/material";
import { Formik, Form } from "formik";
import StepPersonalInfo from "./StepPersonalInfo";
import StepExperience from "./StepExperience";
import StepEducation from "./StepEducation";
import StepAvailability from "./StepAvailability";
import StepPreview from "./StepPreview";
import theme, { palette, typography } from "src/config/theme";
import ButtonComponent from "src/components/shared/Button";

const steps = [
  "Personal Information",
  "Experience & Specialties",
  "Education & Credentials",
  "Availability & Preferences",
  "Preview Profile",
];

const initialValues = {
  fullName: "",
  email: "",
  mobile: "",
  gender: "",
  dob: "",
  location: "",
  photo: null,
  experienceYears: "",
  skills: "",
  certifications: "",
  specializations: "",
  education: "",
  license: null,
  resume: null,
  shiftTypes: "",
  preferredLocations: "",
  payExpectation: "",
  workStatus: "",
  visaStatus: "",
};

export default function NurseOnboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = async (values, actions) => {
    if (isLastStep) {
      console.log("Final Profile Data:", values);
    } else {
      setActiveStep((prev) => prev + 1);
    }
    actions.setTouched({});
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        mx: "auto",
        mt: 5,
        p: 4,
        bgcolor: palette.gery.white,
        borderRadius: "16px",
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography sx={{ ...typography.h2, mb: 3 }}>
        Onboarding & Profile Setup
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Formik
        initialValues={initialValues}
        onSubmit={handleNext}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            {activeStep === 0 && <StepPersonalInfo {...{ values, errors, touched, handleChange, handleBlur, setFieldValue }} />}
            {activeStep === 1 && <StepExperience {...{ values, errors, touched, handleChange, handleBlur }} />}
            {activeStep === 2 && <StepEducation {...{ values, errors, touched, handleChange, handleBlur, setFieldValue }} />}
            {activeStep === 3 && <StepAvailability {...{ values, errors, touched, handleChange, handleBlur }} />}
            {activeStep === 4 && <StepPreview values={values} />}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                Back
              </Button>
              <ButtonComponent type="submit" variant="contained">
                {isLastStep ? "Submit Profile" : "Next"}
              </ButtonComponent>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
