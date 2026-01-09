import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Chip,
  Divider,
  Grid,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  FormControl,
  Tab,
  Tabs
} from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import theme from "src/config/theme";
import ButtonComponent from "src/components/shared/Button/index.js";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const FilterPanel = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRight: `1px solid ${theme.palette.gery.mediumGray}`,
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.light5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Filters
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">AI Recommendations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Best Matches" />
            <FormControlLabel control={<Checkbox />} label="High Shortlist Chance" />
            <FormControlLabel control={<Checkbox />} label="90%+ Criteria Match" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Keywords</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            placeholder="Search keywords in profile"
            size="small"
            fullWidth
            sx={{ mb: 1 }}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Search in key skills only" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Questionnaire</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Q1. What is your notice period / availability?
          </Typography>
          <FormGroup>
            {["Immediate Joiner", "0-15 Days", "1 Month", "2 Months", "More than 2 Months", "Currently Employed"].map(opt => (
              <FormControlLabel key={opt} control={<Checkbox />} label={opt} />
            ))}
          </FormGroup>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Q2. Do you have a valid US Nursing License?
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Yes (Active RN License)" />
            <FormControlLabel control={<Checkbox />} label="NCLEX Passed, Pending License" />
            <FormControlLabel control={<Checkbox />} label="No" />
          </FormGroup>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Q3. Preferred Shifts
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Day Shift" />
            <FormControlLabel control={<Checkbox />} label="Night Shift" />
            <FormControlLabel control={<Checkbox />} label="Rotational" />
          </FormGroup>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Q4. Work Authorization
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="US Citizen / Green Card" />
            <FormControlLabel control={<Checkbox />} label="H1B / Work Visa" />
            <FormControlLabel control={<Checkbox />} label="Need Sponsorship" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField placeholder="Search state or city" size="small" fullWidth sx={{ mb: 1 }} />
          <FormGroup>
            {["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Miami, FL"].map(loc => (
              <FormControlLabel key={loc} control={<Checkbox />} label={loc} />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">0 years to 20+ years</Typography>
          <FormGroup>
            {["New Graduate", "1-3 Years", "3-7 Years", "7+ Years"].map(exp => (
              <FormControlLabel key={exp} control={<Checkbox />} label={exp} />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Salary ($)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">$20/hr – $100/hr</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Salary not disclosed" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Education</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField placeholder="Search degree" size="small" fullWidth sx={{ mb: 1 }} />
          <FormGroup>
            {["ADN (Associate Degree in Nursing)", "BSN (Bachelor of Science in Nursing)", "MSN (Master of Science in Nursing)", "DNP (Doctor of Nursing Practice)", "Diploma in Nursing"].map(edu => (
              <FormControlLabel key={edu} control={<Checkbox />} label={edu} />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Licenses & Certifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["Registered Nurse (RN)", "NCLEX-RN Certified", "State Nursing Board Licensed", "BLS / ACLS Certified"].map(lic => (
              <FormControlLabel key={lic} control={<Checkbox />} label={lic} />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Specialization / Department</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["ICU / Critical Care", "Pediatrics", "Emergency / Trauma", "OR / Surgical", "Obstetrics & Gynecology", "Cardiac Care", "Geriatrics", "Psychiatric Nursing", "Oncology"].map(dep => (
              <FormControlLabel key={dep} control={<Checkbox />} label={dep} />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const ApplicantRowCard = ({ applicant }) => {

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 2, p: 2 }}>
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={9} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "9px" }}>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {applicant.name}
          </Typography>

          <Typography variant="smallRegular" color="text.secondary" sx={{ mb: 1 }}>
            {applicant.experience} | {applicant.expectedSalary} | {applicant.noticePeriod}
          </Typography>

          <Typography variant="smallRegular">
            <b>Current:</b> {applicant.currentRole} at {applicant.hospital}
          </Typography>

          <Typography variant="smallRegular">
            <b>Education:</b> {applicant.education}
          </Typography>

          <Typography variant="smallRegular">
            <b>Pref. Locations:</b> {applicant.prefLocations?.join(", ")}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Typography variant="smallRegular" fontWeight={500}>Key Skills:</Typography>
            <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mt: 0.5 }}>
              {applicant.skills.map((s, i) => (
                <Chip key={i} label={s} size="small" variant="outlined" />
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={3} textAlign="center" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
          <Avatar src={applicant.avatar} sx={{ width: 64, height: 64, mx: "auto" }} />
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Applied on {dayjs(applicant.appliedDate).format("DD MMM YYYY")}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <ButtonComponent variant="outlined" size="small" startIcon={<MailOutlineIcon />}>Contact</ButtonComponent>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Bottom action bar */}
      <Stack direction="row" spacing={2}>
        <ButtonComponent variant="outlined" color="success" startIcon={<CheckCircleOutlineIcon />}>Shortlist</ButtonComponent>
        <ButtonComponent variant="outlined" color="warning" startIcon={<HelpOutlineIcon />}>Maybe</ButtonComponent>
        <ButtonComponent variant="outlined" color="error" startIcon={<CancelOutlinedIcon />}>Reject</ButtonComponent>
      </Stack>
    </Card>

  );
};

const ApplicantsPage = () => {
  const { jobId } = useParams();

  const [applicants] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/100?img=12",
      appliedDate: "2025-09-25",
      currentRole: "Registered Nurse - ICU",
      hospital: "NYU Langone Health",
      experience: "3y 6m",
      education: "B.Sc Nursing - NYU, 2019",
      noticePeriod: "0-15d",
      expectedSalary: "$42/hr",
      skills: ["Critical Care", "Patient Monitoring", "Medication Administration"],
      prefLocations: ["New York", "Boston"],
    },
    {
      id: 2,
      name: "Emily Carter",
      avatar: "https://i.pravatar.cc/100?img=12",
      appliedDate: "2025-09-24",
      currentRole: "Pediatric Nurse",
      hospital: "Mount Sinai Hospital",
      experience: "2y",
      education: "M.Sc Nursing - Columbia University, 2021",
      noticePeriod: "Serving notice",
      expectedSalary: "$38/hr",
      skills: ["Pediatric Care", "Family Counseling", "Child Emergency Response"],
      prefLocations: ["Boston", "New York", "Philadelphia"],
    },
  ]);

  return (
    <Grid container>
      <Grid item xs={3}>
        <FilterPanel />
      </Grid>

      <Grid item xs={9} sx={{ p: 3, mb:1 }}>
        <Typography variant="h2" gutterBottom>
          Applicants for Job #{jobId}
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="All" value="all" />
            <Tab label="Shortlisted" value="shortlisted" />
            <Tab label="Maybe" value="maybe" />
            <Tab label="Rejected" value="rejected" />
          </Tabs>
        </Box>

        {applicants.map((applicant) => (
          <ApplicantRowCard key={applicant.id} applicant={applicant} />
        ))}
      </Grid>
    </Grid>
  );
};

export default ApplicantsPage;
