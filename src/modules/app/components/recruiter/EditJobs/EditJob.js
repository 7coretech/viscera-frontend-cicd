import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import theme from "src/config/theme";
import { fetchJobsRequest } from "src/modules/app/store/appActions";
import InputComponent from "src/components/shared/Form/Input";
import { FormLabel } from "src/modules/app/utility/Styles";
import useResponsive from "src/components/hooks/useResponsive";
import ButtonComponent from "src/components/shared/Button";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.app);
    const { isMobile, isTablet } = useResponsive();
  

  const [form, setForm] = useState({
    title: "",
    hospital: "",
    location: "",
    shiftType: "",
    specialty: "",
    minSalary: "",
    maxSalary: "",
    minExp: "",
    maxExp: "",
    employmentType: "",
    education: "",
    license: "",
    contractDuration: "",
    benefits: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchJobsRequest());
  }, [dispatch]);

  useEffect(() => {
    const job = jobs.find((j) => j._id === jobId);
    if (job) {
      setForm({
        title: job.title || "",
        hospital: job.hospital || "",
        location: job.location || "",
        shiftType: job.shiftType || "",
        specialty: job.specialty || "",
        minSalary: job.minSalary || "",
        maxSalary: job.maxSalary || "",
        minExp: job.minExp || "",
        maxExp: job.maxExp || "",
        employmentType: job.employmentType || "",
        education: job.education || "",
        license: job.license || "",
        contractDuration: job.contractDuration || "",
        benefits: job.benefits || "",
        description: job.description || "",
      });
    }
  }, [jobs, jobId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{  m: isMobile || isTablet ? 2 : 3,
        // height: '100vh',
        // overflowY: 'auto',
        scrollbarWidth: 'none', }}>
          <Typography variant="h2" sx={{ mb: 1, color: theme.palette.text.primary }}>
            Edit Job
          </Typography>
      <Box  sx={{
          backgroundColor: theme.palette.background.paper,
          p: 2,
          border: `1px solid ${theme.palette.primary.light1}`,
          borderRadius: 3,
        }} >
      
       

          <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormLabel>Job Title</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="title" value={form.title} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Hospital</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="hospital" value={form.hospital} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Location</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="location" value={form.location} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Shift Type</FormLabel>
              <InputComponent variant="outlined" select fullWidth  name="shiftType" value={form.shiftType} onChange={handleChange}>
                <MenuItem value="Day">Day</MenuItem>
                <MenuItem value="Night">Night</MenuItem>
                <MenuItem value="Rotational">Rotational</MenuItem>
              </InputComponent >
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Specialty</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="specialty" value={form.specialty} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Min Salary</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="minSalary" value={form.minSalary} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Max Salary</FormLabel>
              <InputComponent variant="outlined" fullWidth name="maxSalary" value={form.maxSalary} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Min Experience (yrs)</FormLabel>
              <InputComponent variant="outlined" fullWidth name="minExp" value={form.minExp} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Max Experience (yrs)</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="maxExp" value={form.maxExp} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Employment Type</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="employmentType" value={form.employmentType} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Education</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="education" value={form.education} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>License</FormLabel>
              <InputComponent variant="outlined" fullWidth name="license" value={form.license} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={6}>
                 <FormLabel>Contract Duration</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="contractDuration" value={form.contractDuration} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
                 <FormLabel>Benefits</FormLabel>
              <InputComponent variant="outlined" fullWidth  name="benefits" value={form.benefits} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
                 <FormLabel>Job Description</FormLabel>
              <TextField variant="outlined" fullWidth multiline minRows={4}  name="description" value={form.description} onChange={handleChange}    sx={{
          
              '& .MuiOutlinedInput-root': {
            borderRadius:'12px',

              }
          }}/>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex",justifyContent:'flex-end', gap: 2, mt: 2 }}>
                  <ButtonComponent variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </ButtonComponent>
              <ButtonComponent variant="contained" onClick={() => navigate(-1)}>
                Save Changes
              </ButtonComponent>
            
            </Grid>
          </Grid>
      </Box>
    </Box>
  );
};

export default EditJob;
