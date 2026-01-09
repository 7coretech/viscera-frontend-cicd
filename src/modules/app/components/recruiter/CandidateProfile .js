import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  Chip,
  Stack,
  Paper
} from "@mui/material";
import ButtonComponent from "src/components/shared/Button/index.js";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealingIcon from "@mui/icons-material/Healing";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import dayjs from "dayjs";
import theme from "src/config/theme";

const nurse = {
  id: 1,
  name: "Sarah Johnson",
  avatar: "https://i.pravatar.cc/100?img=12",
  appliedDate: "2025-09-25",
  specialization: "ICU Nurse",
  license: "RN – NY State Board #45213",
  currentHospital: "NYU Langone Health",
  experience: "3y 6m",
  education: "B.Sc Nursing - NYU, 2019",
  noticePeriod: "0-15d",
  expectedSalary: "$42/hr",
  prefShift: "Night Shifts",
  skills: ["Critical Care", "Patient Monitoring", "Medication Administration"],
  prefLocations: ["New York", "Boston"],
  certifications: ["BLS", "ACLS", "PALS"],
  experiences: [
    {
      role: "ICU Nurse",
      company: "NYU Langone Health",
      duration: "2022 - Present",
      location: "New York",
      description:
        "Handling critical care patients, monitoring vitals, and emergency response."
    },
    {
      role: "Staff Nurse",
      company: "Mount Sinai Hospital",
      duration: "2019 - 2022",
      location: "New York",
      description:
        "Assisted in pediatric department and trained new nurses."
    }
  ],
  educationDetails: [
    { degree: "B.Sc Nursing", institution: "NYU", year: "2019" }
  ],
  bio: "Dedicated to compassionate patient care and emergency response with 3+ years ICU experience."
};

const NurseProfile = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: theme.shadows[2] }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={nurse.avatar} sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h2" fontWeight={600}>
              {nurse.name}
            </Typography>
            <Typography variant="smallRegular" color="text.secondary">
              {nurse.specialization} at {nurse.currentHospital}
            </Typography>
            <Typography variant="smallRegular" color="text.secondary">
              Applied on {dayjs(nurse.appliedDate).format("DD MMM YYYY")}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Typography variant="smallRegular">
                <WorkOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
                {nurse.experience}
              </Typography>
              <Typography variant="smallRegular">
                <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                {nurse.prefLocations?.join(", ")}
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack spacing={1}>
              <ButtonComponent
                variant="contained"
                startIcon={<MailOutlineIcon />}
              >
                Contact
              </ButtonComponent>
              <ButtonComponent
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={() => window.open(nurse.resumeUrl, "_blank")}
              >
                View Resume
              </ButtonComponent>
              <ButtonComponent
                variant="outlined"
                startIcon={<FileDownloadIcon />}
              >
                Download Resume
              </ButtonComponent>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: theme.shadows[1] }}>
        <Typography variant="h4" gutterBottom>
          Nurse Profile Summary
        </Typography>
        <Divider sx={{ mb: 2, borderColor: theme.palette.gery.mediumGray }} />
        <Stack spacing={1}>
          <Typography variant="smallRegular"><b>License:</b> {nurse.license}</Typography>
          <Typography variant="smallRegular"><b>Specialization:</b> {nurse.specialization}</Typography>
          <Typography variant="smallRegular"><b>Experience:</b> {nurse.experience}</Typography>
          <Typography variant="smallRegular"><b>Preferred Shift:</b> {nurse.prefShift}</Typography>
          <Typography variant="smallRegular"><b>Notice Period:</b> {nurse.noticePeriod}</Typography>
          <Typography variant="smallRegular"><b>Expected Salary:</b> {nurse.expectedSalary}</Typography>
          <Typography variant="smallRegular"><b>Education:</b> {nurse.education}</Typography>
        </Stack>
        
      </Paper>
 
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Divider sx={{ mb: 2, borderColor: theme.palette.gery.mediumGray }} />
        <Typography variant="smallRegular">{nurse.bio}</Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Certifications
        </Typography>
        <Divider sx={{ mb: 2, borderColor: theme.palette.gery.mediumGray }} />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {nurse.certifications.map((c, i) => (
            <Chip key={i} label={c} color="primary" size="small" />
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Clinical Skills
        </Typography>
        <Divider sx={{ mb: 2, borderColor: theme.palette.gery.mediumGray }} />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {nurse.skills.map((s, i) => (
            <Chip
              key={i}
              icon={<HealingIcon />}
              label={s}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Hospital Experience
        </Typography>
        <Divider sx={{ mb: 2, borderColor: theme.palette.gery.mediumGray }} />
        {nurse.experiences?.map((exp, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography variant="body1" fontWeight={600}>
              {exp.role} - {exp.company}
            </Typography>
            <Typography variant="smallRegular" color="text.secondary">
              {exp.duration} | {exp.location}
            </Typography>
            <Typography variant="smallRegular" sx={{ mt: 1 }}>
              {exp.description}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Education
        </Typography>
        <Divider sx={{ mb: 2, borderColor: theme.palette.gery.mediumGray }} />
        {nurse.educationDetails?.map((edu, i) => (
          <Box key={i} sx={{ mb: 1 }}>
            <Typography variant="body1" fontWeight={600}>
              {edu.degree}
            </Typography>
            <Typography variant="smallRegular" color="text.secondary">
              {edu.institution}, {edu.year}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ mt: 3 }}
      >
        <ButtonComponent
          variant="outlined"
          color="success"
          startIcon={<CheckCircleOutlineIcon />}
        >
          Shortlist
        </ButtonComponent>
        <ButtonComponent
          variant="outlined"
          color="warning"
          startIcon={<HelpOutlineIcon />}
        >
          Maybe
        </ButtonComponent>
        <ButtonComponent
          variant="outlined"
          color="error"
          startIcon={<CancelOutlinedIcon />}
        >
          Reject
        </ButtonComponent>
      </Stack>
    </Box>
  );
};

export default NurseProfile;
