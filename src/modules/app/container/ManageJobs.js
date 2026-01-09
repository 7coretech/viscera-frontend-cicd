import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "src/components/App/AppGrid/CustomTable/CustomTable";
import {
  Box,
  Chip,
  Typography,
  Tabs,
  Tab,
  Drawer,
  Card,
  CardContent,
  Divider,
  Stack,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { LocationOn, LocalHospital } from "@mui/icons-material";
import theme from "src/config/theme";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Welcome from "src/modules/app/components/welcome/Welcome";
import { fetchJobsRequest, publishJobRequest } from "src/modules/app/store/appActions";
import { ReactComponent as Close } from "src/assets/images/close-circle.svg";
import ButtonComponent from "src/components/shared/Button";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

const columns = [
  { id: "title", label: "Job Title" },
  { id: "hospital", label: "Hospital" },
  { id: "location", label: "Location" },
  { id: "pay", label: "Pay Range" },
  { id: "status", label: "Status" },
  { id: "posted", label: "Posted Date" },
];

const JobContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs = [], loading, error } = useSelector((state) => state.app);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
const [jobToClose, setJobToClose] = useState(null);
const [publishDialogOpen, setPublishDialogOpen] = useState(false);
const [jobToPublish, setJobToPublish] = useState(null);


  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("all");

  const [selectedJob, setSelectedJob] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobsRequest());
  }, [dispatch]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const lower = searchQuery.toLowerCase();
      const matchesSearch =
        job.title?.toLowerCase().includes(lower) ||
        job.specialty?.toLowerCase().includes(lower) ||
        job.location?.toLowerCase().includes(lower);

      const matchesTab =
        tab === "all" ? true : tab === "draft" ? job.status === "Draft" : true;

      return matchesSearch && matchesTab;
    });
  }, [jobs, searchQuery, tab]);

  const data = filteredJobs.map((job) => ({
    jobId: job._id,
    title: job.title,
    hospital: job.hospital,
    location: job.location,
    pay: `₹${job.minSalary} - ₹${job.maxSalary}`,
    status: (
      <Chip
        label={job.status}
        sx={{
          background:
            job.status === "Active"
              ? "linear-gradient(0deg, rgba(57,150,57,0.18), rgba(57,150,57,0.18))"
              : "linear-gradient(0deg, rgba(200,200,200,0.18), rgba(200,200,200,0.18))",
          color:
            job.status === "Active"
              ? theme.palette.action.green
              : theme.palette.gery.black,
          borderRadius: "100px",
          padding: "6px 12px",
        }}
      />
    ),
    posted: dayjs(job.createdAt).format("DD-MM-YYYY"),
  }));

  const handleViewDetails = (row) => {
    const jobItem = jobs.find((j) => j._id === row.jobId);
    setSelectedJob(jobItem);
    setDrawerOpen(true);
  };

const getActionsForRow = (row) => {
    if (!row || !row.jobId) return [];

    const job = jobs.find((j) => j._id === row.jobId);
    if (!job) return [];

   
    if (job.status === "Draft") {
      return [
        {
          label: "Publish Job",
        onClick: () => {
    setJobToPublish(row.jobId);
    setPublishDialogOpen(true);
  },
        },
        { 
          label: "Edit Job", 
          onClick: () => navigate(`/jobs/${row.jobId}/edit`) 
        },
      ];
    }

    return [
      { 
        label: "View Applicants", 
        onClick: () => navigate(`/jobs/${row.jobId}/applicants`) 
      },
      { 
        label: "View Job Detail", 
        onClick: () => handleViewDetails(row) 
      },
      {
        label: "Close Job",
        onClick: () => {
          setJobToClose(row.jobId);
          setCloseDialogOpen(true);
        },
      },
    ];
  };

  const handleConfirmPublish = async () => {
  if (!jobToPublish) return;

  await new Promise((resolve, reject) =>
    dispatch(publishJobRequest(jobToPublish, resolve, reject))
  )
    .then(() => {
      setPublishDialogOpen(false);
    })
    .catch((err) => alert("Failed to publish job: " + err.message));
};
  return (
    <>
      <Welcome category="recruiter" handleSearch={setSearchQuery} />

      <Box sx={{ mb: 16 }} />

      <Box sx={{ m: 2 }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab value="all" label="All Jobs" />
          <Tab value="draft" label="Draft" />
        </Tabs>
      </Box>

      <Box sx={{ m: 2, background: theme.palette.gery.white, borderRadius: "10px", boxShadow: theme.shadows[1] }}>
        {loading ? (
          <Typography sx={{ p: 4, textAlign: "center" }}>Loading jobs...</Typography>
        ) : error ? (
          <Typography sx={{ p: 4, color: "red", textAlign: "center" }}>{error}</Typography>
        ) : (
          <CustomTable
            columns={columns}
            data={data}
            actions={getActionsForRow}
            page={page}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={(newPerPage) => {
              setPerPage(newPerPage);
              setPage(0);
            }}
            totalCount={filteredJobs.length}
          />
        )}
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 400 } }}
        key={selectedJob?._id}
      >
        <Box sx={{
          height: "84px",
          backgroundColor: theme.palette.primary.light3,
          border: `1px solid ${theme.palette.primary.light1}`,
          display: "flex",
          justifyContent: "center",    
          alignItems: "center",
        }}>
          <Box sx={{ width: "332px", display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3">Job Details</Typography>
            <Close width={24} height={24} onClick={() => setDrawerOpen(false)} style={{ cursor: "pointer" }} />
          </Box>
        </Box>

        {selectedJob && (
          <Box sx={{ p: 2 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{selectedJob.title}</Typography>

                <Typography variant="subtitle1" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                  <LocalHospital fontSize="small" sx={{ mr: 1 }} />
                  {selectedJob.hospital}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                  {selectedJob.location}
                </Typography>

                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip label={selectedJob.shiftType} color="primary" variant="outlined" />
                  <Chip label={selectedJob.specialty} color="secondary" variant="outlined" />
                  <Chip
                    label={selectedJob.status}
                    color={selectedJob.status === "Active" ? "success" : "default"}
                  />
                </Box>

                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ₹{selectedJob.minSalary} – ₹{selectedJob.maxSalary}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Posted: {dayjs(selectedJob.createdAt).format("DD MMM YYYY")}
                </Typography>
              </CardContent>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ background: "#f9f9f9", p: 2, borderRadius: 2, m: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">Job Summary</Typography>
                <Stack spacing={1}>
                  <Typography variant="smallRegular">Experience: {selectedJob.minExp} - {selectedJob.maxExp} yrs</Typography>
                  <Typography variant="smallRegular">Employment Type: {selectedJob.employmentType}</Typography>
                  <Typography variant="smallRegular">Education: {selectedJob.education}</Typography>
                  <Typography variant="smallRegular">License: {selectedJob.license}</Typography>
                  <Typography variant="smallRegular">Contract Duration: {selectedJob.contractDuration}</Typography>
                  <Typography variant="smallRegular">Benefits: {selectedJob.benefits}</Typography>
                </Stack>
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">Job Description</Typography>
                <Typography variant="smallRegular" color="text.secondary" sx={{ whiteSpace: "pre-line", mt: 1 }}>
                  {selectedJob.description}
                </Typography>
              </Box>
            </Card>
          </Box>
        )}
      </Drawer>
      <Dialog open={closeDialogOpen} onClose={() => setCloseDialogOpen(false)}>
  
<Box sx={{p:2}}>


  <DialogContent sx={{textAlign:'center'}}>
    <WarningAmberOutlinedIcon sx={{color:'#ffd180',fontSize:'60px'}}/>
    <Typography variant="h2" sx={{my:1, }}>Confirm</Typography>
    <Typography variant="smallRegular">
      Are you sure you want to close this job?
    </Typography>
  </DialogContent>

  <Box sx={{display:'flex', gap:'10px'}}>
    <ButtonComponent variant="outlined" fullWidth onClick={() => setCloseDialogOpen(false)}>
      Cancel
    </ButtonComponent>

    <ButtonComponent
    fullWidth
      variant="contained"
    
      onClick={() => {
        setCloseDialogOpen(false);
      }}
    >
      Close Job
    </ButtonComponent>
  </Box>
  </Box>
</Dialog>

<Dialog open={publishDialogOpen} onClose={() => setPublishDialogOpen(false)}>
  <Box sx={{ p: 2, width: '350px' }}>
    <DialogContent sx={{ textAlign: 'center' }}>
      <WarningAmberOutlinedIcon sx={{ color: '#ffd180', fontSize: '60px' }} />
      <Typography variant="h2" sx={{ my: 1 }}>Confirm</Typography>
      <Typography variant="smallRegular">
        Are you sure you want to publish this job?
      </Typography>
    </DialogContent>
    <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
      <ButtonComponent variant="outlined" fullWidth onClick={() => setPublishDialogOpen(false)}>
        Cancel
      </ButtonComponent>
      <ButtonComponent variant="contained" fullWidth onClick={handleConfirmPublish}>
        Publish Job
      </ButtonComponent>
    </Box>
  </Box>
</Dialog>

    </>
  );
};

export default JobContainer;
