import { Box, Typography, Divider, Avatar, Paper, Grid } from "@mui/material";
import { typography, palette } from "src/config/theme";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function StepPreview({ values }) {
  return (
    <Box>
      <Typography sx={{ ...typography.h3, mb: 3 }}>Profile Preview</Typography>

      <Paper
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 3,
          mb: 3,
          borderRadius: 3,
          bgcolor: palette.gery.light5,
        }}
      >
        <Avatar
          src={values.photo ? URL.createObjectURL(values.photo) : ""}
          sx={{ width: 90, height: 90, mr: 3 }}
        />
        <Box>
          <Typography sx={{ ...typography.h4 }}>{values.fullName}</Typography>
          <Typography variant="body2" color="text.secondary">{values.email}</Typography>
          <Typography variant="body2" color="text.secondary">{values.mobile}</Typography>
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <WorkOutlineIcon color="primary" sx={{ mr: 1 }} />
          <Typography sx={{ ...typography.h5 }}>Experience & Specialties</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Years:</strong> {values.experienceYears || "—"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Skills:</strong> {values.skills || "—"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Certifications:</strong> {values.certifications || "—"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Specializations:</strong> {values.specializations || "—"}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <SchoolIcon color="primary" sx={{ mr: 1 }} />
          <Typography sx={{ ...typography.h5 }}>Education & Credentials</Typography>
        </Box>
        <Typography variant="body2">{values.education || "—"}</Typography>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
          <Typography sx={{ ...typography.h5 }}>Availability & Preferences</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Shift:</strong> {values.shiftTypes || "—"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Preferred Locations:</strong> {values.preferredLocations || "—"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Expected Pay:</strong> {values.payExpectation || "—"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Work Status:</strong> {values.workStatus || "—"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2"><strong>Visa:</strong> {values.visaStatus || "—"}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
