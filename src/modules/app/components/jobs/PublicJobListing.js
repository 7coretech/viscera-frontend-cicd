import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Stack,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import InputComponent from "src/components/shared/Form/Input";
import InputSelect from "src/components/shared/Form/Select";
import theme, { palette } from "src/config/theme";
import JobCard from "./JobCard";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllJobsRequest,
  saveJobRequest,
  unsaveJobRequest,
} from "src/modules/app/store/appActions";

const locationOptions = [
  { label: "Mumbai", value: "Mumbai" },
  { label: "Delhi", value: "Delhi" },
  { label: "Bengaluru", value: "Bengaluru" },
  { label: "Pune", value: "Pune" },
  { label: "Chennai", value: "Chennai" },
  { label: "Hyderabad", value: "Hyderabad" },
];

const FEATURED_COMPANIES = [
  {
    id: 1,
    name: "Apollo Hospitals",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/Apollo_Hospitals_logo.svg",
    jobsOpen: 25,
    location: "Chennai",
  },
  {
    id: 2,
    name: "Fortis Healthcare",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Fortis_Healthcare_logo.svg",
    jobsOpen: 18,
    location: "Delhi NCR",
  },
  {
    id: 3,
    name: "Max Healthcare",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e4/Max_Healthcare_logo.svg",
    jobsOpen: 12,
    location: "Mumbai",
  },
  {
    id: 4,
    name: "Manipal Hospitals",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b1/Manipal_Hospitals_logo.svg",
    jobsOpen: 20,
    location: "Bengaluru",
  },
];

export default function PublicJobListing() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [filters, setFilters] = useState({ keyword: "", location: "" });
  const [tab, setTab] = useState("all");

  const loading = useSelector((state) => state.app?.isLoading);
  const error = useSelector((state) => state.app?.error);
  const allJobs = useSelector((state) => state.app?.alljobs || []);

  useEffect(() => {
  let employmentType = "";

  if (tab === "remote") employmentType = "Remote";
  else if (tab === "fulltime") employmentType = "Full-time";
  else if (tab === "parttime") employmentType = "";

  dispatch(fetchAllJobsRequest({ employmentType }));
}, [dispatch, tab]);

 const filteredJobs = useMemo(() => {
  let jobs = allJobs;

  if (tab === "remote") {
    jobs = jobs.filter((j) => j.employmentType === "Remote");
  } else if (tab === "fulltime") {
    jobs = jobs.filter((j) => j.employmentType === "Full-time");
  } else if (tab === "parttime") {
    jobs = jobs.filter(
      (j) =>
        j.employmentType === "Part-time" ||
        j.employmentType === "Contract"
    );
  }

  const keywordMatch = (job) =>
    filters.keyword
      ? `${job.title || ""} ${job.hospital || ""} ${job.description || ""}`
          .toLowerCase()
          .includes(filters.keyword.toLowerCase())
      : true;

  const locationMatch = (job) =>
    filters.location ? job.location === filters.location : true;

  return jobs.filter((job) => keywordMatch(job) && locationMatch(job));
}, [allJobs, filters, tab]);

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target ?? {};
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveToggle = async (job) => {
    enqueueSnackbar("Please login to save jobs", { variant: "info" });
  };

  const handleApplyClick = (job) => {
    enqueueSnackbar("Please login to apply for jobs", { variant: "warning" });
  };

  const handleShare = (job) => {
    const shareText = `Check out this job: ${job.title} at ${job.hospital}`;
    if (navigator.share) {
      navigator.share({
        title: "Job Opportunity",
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard?.writeText(`${shareText} - ${window.location.href}`);
      enqueueSnackbar("Job link copied to clipboard", { variant: "info" });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: theme.shadows[2] }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <InputComponent
              name="keyword"
              variant="outlined"
              placeholder="Search by role, hospital, or keyword"
              value={filters.keyword}
              onChange={(e) =>
                setFilters((p) => ({ ...p, keyword: e.target.value }))
              }
              fullWidth
              sx={{
                backgroundColor: palette.gery.white,
                boxShadow: theme.shadows[1],
                "& .MuiOutlinedInput-root": {
                  height: "52px",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <InputSelect
              name="location"
              variant="outlined"
              value={filters.location}
              onChange={handleFilterChange}
              options={locationOptions}
              fullWidth
              placeholder="Select location"
              sx={{
                backgroundColor: palette.gery.white,
                boxShadow: theme.shadows[1],
                "& .MuiOutlinedInput-root": {
                  height: "52px",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setFilters({ keyword: "", location: "" })}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{ mb: 2, borderBottom: `1px solid ${palette.gery.lightGray}` }}
      >
        <Tab value="all" label="All Jobs" />
        <Tab value="remote" label="Remote" />
        <Tab value="fulltime" label="Full-Time" />
        <Tab value="parttime" label="Part-Time" />
      </Tabs>

      {/* Job List */}
      <Box sx={{ mb: 6 }}>
        {loading ? (
          <Typography>Loading jobs...</Typography>
        ) : error ? (
          <Typography color="error">Error loading jobs</Typography>
        ) : filteredJobs.length === 0 ? (
          <Typography>No jobs found</Typography>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id || job.id}
              job={job}
              onSave={() => handleSaveToggle(job)}
              onApply={() => handleApplyClick(job)}
              onShare={() => handleShare(job)}
            />
          ))
        )}
      </Box>

      {/* Featured Companies */}
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ mb: 3, color: theme.palette.primary.main }}
        >
          Featured Companies Actively Hiring
        </Typography>

        <Grid container spacing={3}>
          {FEATURED_COMPANIES.map((company) => (
            <Grid item xs={12} sm={6} md={3} key={company.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: theme.shadows[2],
                  textAlign: "center",
                  p: 2,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                    transform: "translateY(-4px)",
                  },
                }}
                onClick={() => (window.location.href = "/nurse/login")}
              >
                <CardMedia
                  component="img"
                  image={company.logo}
                  alt={company.name}
                  sx={{ height: 60, objectFit: "contain", mb: 2 }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    {company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {company.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 1, fontWeight: 500 }}
                  >
                    {company.jobsOpen} Jobs Open
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
