import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Chip,
  Divider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import theme from "src/config/theme";
import JOBS from "src/data/dummyjobs";
import { useNavigate } from "react-router-dom";


const FilterPanel = () => {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRight: `1px solid ${theme.palette.gery.medium}`,
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.light5,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
        Filters
      </Typography>

      {[
        { title: "Work Mode", options: ["Hospital / On-site", "Hybrid", "Remote (Tele-nursing)"] },
        { title: "Experience", options: ["Fresher / New Grad", "1–3 Years", "3–7 Years", "7+ Years"] },
        { title: "Specialty / Department", options: ["ICU / Critical Care", "Pediatrics", "Emergency / Trauma", "Dialysis / Renal Care", "OR / Surgical", "Oncology", "Geriatrics"] },
        { title: "Shift Type", options: ["Day Shift", "Night Shift", "Rotational"] },
        { title: "Salary ($/hr)", options: ["$20–30/hr", "$30–40/hr", "$40–50/hr", "$50+/hr"] },
        { title: "Hospital Type", options: ["Multi-speciality Hospital", "Children’s Hospital", "Government Hospital", "Clinic / Nursing Home"] },
        { title: "Education", options: ["ADN", "BSN", "MSN", "DNP", "Diploma"] },
        { title: "Licenses & Certifications", options: ["RN License", "NCLEX-RN Passed", "BLS / ACLS", "State Nursing License"] },
        { title: "Location", options: ["New York", "California", "Texas", "Florida", "Illinois"] },
      ].map((section, i) => (
        <Accordion key={i} defaultExpanded={i === 0} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {section.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {section.options.map((opt) => (
                <FormControlLabel
                  key={opt}
                  control={<Checkbox size="small" />}
                  label={opt}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.9rem",
                      color: theme.palette.text.secondary,
                    },
                  }}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

const JobCard = ({ job }) => {
  const [applied, setApplied] = useState(job.applied || false);
  const [saved, setSaved] = useState(job.saved || false);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        p: 2.5,
        transition: "0.2s ease",
        "&:hover": {
          boxShadow: theme.shadows[3],
          transform: "translateY(-2px)",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={9} sx={{display:"flex",flexDirection:"column"}}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {job.title}
          </Typography>
          <Typography variant="smallRegular" color="text.secondary" sx={{ mb: 1 }}>
            {job.hospital} • {job.location}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <MonetizationOnIcon color="primary" fontSize="small" />
              <Typography variant="smallRegular">{job.salary}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTimeIcon sx={{ color: theme.palette.action.blueLight }} fontSize="small" />
              <Typography variant="smallRegular">{job.shift}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <LocalHospitalIcon sx={{ color: theme.palette.primary.main }} fontSize="small" />
              <Typography variant="smallRegular">{job.type}</Typography>
            </Stack>
          </Stack>

          <Typography variant="smallRegular" color="text.secondary">
            {job.summary}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
            {job.tags.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  borderColor: theme.palette.primary.light2,
                  fontSize: "0.75rem",
                  color: theme.palette.primary.main,
                }}
              />
            ))}
          </Stack>
        </Grid>

        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant={applied ? "outlined" : "contained"}
            size="small"
            fullWidth
            sx={{
              borderRadius: 1.5,
              fontWeight: 500,
              textTransform: "none",
            }}
            onClick={() => navigate("/auth/nurse/login")}
          >
            {applied ? "Applied" : "Apply"}
          </Button>
          <Button
            variant={saved ? "contained" : "outlined"}
            size="small"
            fullWidth
            sx={{
              borderRadius: 1.5,
              fontWeight: 500,
              textTransform: "none",
            }}
            onClick={() => setSaved(!saved)}
          >
            {saved ? "Saved" : "Save"}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

const NurseJobsPage = () => {
  const [jobs] = useState(JOBS);

  return (
    <Grid container>
      <Grid item xs={3}>
        <FilterPanel />
      </Grid>

      <Grid item xs={9} sx={{ p: 3 }}>
        <Typography variant="h2" sx={{ mb: 2, color: theme.palette.primary.main }}>
          Nursing Jobs
        </Typography>

        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Grid>
    </Grid>
  );
};

export default NurseJobsPage;