import React, { useEffect, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Chip,
  useMediaQuery,
  TextField,
  Autocomplete,
  Divider,
} from "@mui/material";
import {
  FormHeaderContainer,
  HeaderText,
  SubHeader,
} from "src/modules/app/utility/Styles";
import theme from "src/config/theme";
import ButtonComponent from "src/components/shared/Button";
import { postSkills } from 'src/modules/auth/api/authApi';
import { getSkills } from "src/modules/auth/api/authApi";

const clinicalSkillOptions = [
  "ICU",
  "Emergency/ER",
  "Pediatric",
  "OR/Surgical",
  "NICU",
  "Telehealth",
  "Geriatric Care",
  "Mental Health/Psychiatric",
  "Public Health",
  "Community Health",
  "Home Health",
  "Hospice",
  "Labour & Delivery",
  "Crisis/Disaster Response",
];

const technicalSkillOptions = [
  "EMR Systems",
  "Cerner",
  "Telemetry",
  "EPIC",
  "Meditech",
  "Ventilator Management",
  "IV Insertion",
  "Phlebotomy",
];

const softSkillOptions = [
  "Leadership",
  "Time Management",
  "Empathy",
  "Problem Solving",
  "Teamwork",
  "Communication",
  "Adaptability",
  "Critical Thinking",
];

const initialValues = {
  clinicalSkills: [],
  technicalSkills: [],
  softSkills: [],
};

const SkillsSchema = Yup.object().shape({
  clinicalSkills: Yup.array().of(Yup.string()),
  technicalSkills: Yup.array().of(Yup.string()),
  softSkills: Yup.array().of(Yup.string()),
});

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
          background: theme.palette.primary.light2,
          color: theme.palette.primary.main,
          borderRadius: "8px",
          fontWeight: "500",
          ...theme.typography.smallRegular,
        },
        "& .MuiOutlinedInput-root": {
          paddingTop: "8px !important",
          paddingBottom: "8px !important",
          flexWrap: "wrap !important",
          alignItems: "flex-start !important",
          borderRadius: "8px",
        },
        "& .MuiAutocomplete-input": {
          padding: "4px 0 !important",
          marginTop: "4px !important",
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
              flexWrap: "wrap",
              alignItems: "flex-start",
              borderRadius: "8px",
            },
          }}
        />
      )}
    />
  );
};

const SkillsFields = () => {
  return (
    <Box>
      <FormHeaderContainer sx={{ mb: 4 }}>
        <HeaderText>Skills</HeaderText>
        <SubHeader>Showcase your nursing skills and competencies</SubHeader>
      </FormHeaderContainer>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 1 }}
        >
          Clinical Skills
        </Typography>
        <SkillsAutocomplete
          name="clinicalSkills"
          placeholder="Add clinical skills"
          options={clinicalSkillOptions}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 1 }}
        >
          Technical Skills
        </Typography>
        <SkillsAutocomplete
          name="technicalSkills"
          placeholder="Add technical skills"
          options={technicalSkillOptions}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 1 }}
        >
          Soft Skills
        </Typography>
        <SkillsAutocomplete
          name="softSkills"
          placeholder="Add soft skills"
          options={softSkillOptions}
        />
      </Box>
    </Box>
  );
};

const SkillsAndSpecialties = () => {
  const isMobileOrBelow = useMediaQuery(theme.breakpoints.down("sm"));
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getSkills();
        const base =
          res && typeof res === "object"
            ? res
            : {};
        const data =
          base && typeof base.data === "object"
            ? base.data
            : base;
        setFormInitialValues({
          clinicalSkills: Array.isArray(data?.clinical)
            ? data.clinical
            : Array.isArray(data?.clinicalSkills)
            ? data.clinicalSkills
            : [],
          technicalSkills: Array.isArray(data?.technical)
            ? data.technical
            : Array.isArray(data?.technicalSkills)
            ? data.technicalSkills
            : [],
          softSkills: Array.isArray(data?.soft)
            ? data.soft
            : Array.isArray(data?.softSkills)
            ? data.softSkills
            : [],
        });
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

 const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    await postSkills(values);

    alert('Skills saved successfully ✅');

    // Reset the form to initial values (clears all fields)
    resetForm();

  } catch (error) {
    alert(
      error?.response?.data?.message ||
      'Failed to save skills ❌'
    );
    console.error('Skills API error', error);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <Box>
      {error && (
        <Typography sx={{ color: theme.palette.error.main, mb: 2 }}>
          {error}
        </Typography>
      )}
      <Formik
        initialValues={formInitialValues}
        validationSchema={SkillsSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {() => (
          <Form>
            <SkillsFields />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <ButtonComponent
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth={isMobileOrBelow}
                sx={{ width: isMobileOrBelow ? "100%" : "200px" }}
              >
                Save Skills
              </ButtonComponent>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SkillsAndSpecialties;
