import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Autocomplete,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  CloudUpload as CloudUploadIcon,
  PictureAsPdf as PictureAsPdfIcon,
  InsertDriveFile as InsertDriveFileIcon,
} from '@mui/icons-material';
import InputComponent from 'src/components/shared/Form/Input';
import InputSelect from 'src/components/shared/Form/Select';
import theme, { palette } from 'src/config/theme';
import JobCard from './JobCard';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import {
  applyJobRequest,
  fetchAllJobsRequest,
  fetchMyResumesRequest,
  fetchSaveJobsRequest,
  saveJobRequest,
  unsaveJobRequest,
  uploadResumeRequest,
} from 'src/modules/app/store/appActions';
import ButtonComponent from 'src/components/shared/Button';
import { FooterPart, HeaderPart } from '../../utility/Styles';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useLocation } from 'react-router-dom';

const locationOptions = [
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Delhi', value: 'Delhi' },
  { label: 'Bengaluru', value: 'Bengaluru' },
];

const nurseTypeOptions = [
  'RN',
  'LPN / LVN',
  'NP',
  'APRN',
  'ICU Nurse',
  'ER Nurse',
  'Pediatric Nurse',
  'OR / Surgical Nurse',
  'NICU Nurse',
  'Telehealth Nurse',
];

export default function JobDashboard({ onOpenJob }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const loading = useSelector((state) => state.app?.isLoading);
  const error = useSelector((state) => state.app?.error);

  const [filters, setFilters] = useState({ keyword: '', location: '', nurseType: [] });
  const location = useLocation();
  const initialTab = new URLSearchParams(location.search).get('tab') || 'applied';
  const [tab, setTab] = useState(initialTab);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);

  const uploadedResumes = useSelector((state) => {
    const resumes = state.app?.myresumes;
    if (Array.isArray(resumes)) return resumes;
    if (resumes?.payload && Array.isArray(resumes.payload.resumes)) return resumes.payload.resumes;
    if (resumes?.resumes && Array.isArray(resumes.resumes)) return resumes.resumes;
    return [];
  });

  const allJobs = useSelector((s) => s.app?.alljobs || []);
  const savedJobs = useSelector((s) => s.app?.savejobs || []);

  useEffect(() => {
  dispatch(fetchAllJobsRequest(filters));
}, [dispatch, filters]);

useEffect(() => {
  if (tab === 'saved') {
    dispatch(fetchSaveJobsRequest());
  }
}, [tab, dispatch]);


  const savedTabJobs =
  savedJobs && savedJobs.length > 0
    ? savedJobs.map((item) => {
        const jobObj = item?.jobId; // backend sends jobId object
        return {
          ...jobObj,
          saved: true,
        };
      })

      : allJobs
          .filter((j) => j.saved)
          .map((j) => ({ ...j, id: j._id || j.id, saved: true }));

  const jobs =
  tab === 'saved'
    ? savedTabJobs
    : allJobs.map((j) => ({
        ...j,

         saved: savedJobs?.some((sj) => sj.jobId?.id === j.id) || j.saved || false,

          applied: tab === 'applied' ? true : (j.applied || false),
        }));

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      if (filters.keyword) {
        const hay = `${j.title || ''} ${j.hospital || ''} ${j.description || ''}`.toLowerCase();
        if (!hay.includes(filters.keyword.toLowerCase())) return false;
      }
      if (filters.location && j.location !== filters.location) return false;
      if (filters.nurseType.length > 0) {
        const jobType = j.nurseType || j.type || '';
        if (!filters.nurseType.includes(jobType)) return false;
      }

      return true;
    });
  }, [jobs, filters]);

  const handleSaveToggle = async (job) => {
  try {
    if (!job?.id) {
      console.error('❌ INVALID JOB ID', job);
      throw new Error('Invalid job id');
    }

    console.log('✅ Saving job with ID:', job.id);

    if (job.saved) {
      await new Promise((resolve, reject) =>
        dispatch(unsaveJobRequest(job.id, resolve, reject))
      );
      enqueueSnackbar('Job removed from saved list', { variant: 'info' });
    } else {
      await new Promise((resolve, reject) =>
        
        dispatch(saveJobRequest(job.id, resolve, reject))
        
      
      );
      enqueueSnackbar('Job saved successfully!', { variant: 'success' });
    }

    dispatch(fetchSaveJobsRequest());
  } catch (error) {
    enqueueSnackbar(error?.message || 'Action failed', { variant: 'error' });
  }
};

  const handleApplyClick = async (job) => {
    try {
      await new Promise((resolve, reject) =>
        dispatch(applyJobRequest(job._id || job.id, {}, resolve, reject))
      );
      enqueueSnackbar('Applied successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error?.message || 'Apply failed', { variant: 'error' });
    }
  };

  const handleApplySubmit = async () => {
    if (!selectedJob || !selectedResume) return;

    try {
      let resumeLink = selectedResume?.path;

      if (selectedResume?.id === 'new' && selectedResume?.file) {
        const formData = new FormData();
        formData.append('resumes', selectedResume.file);

        const uploadedResumes = await new Promise((resolve, reject) =>
          dispatch(uploadResumeRequest(formData, resolve, reject)),
        );

        if (!uploadedResumes?.length) throw new Error('Resume upload failed');
        resumeLink = uploadedResumes[0].path;
        setSelectedResume(uploadedResumes[0]); // optional: replace with uploaded
        dispatch(fetchMyResumesRequest());
      }

      await new Promise((resolve, reject) =>
        dispatch(
          applyJobRequest(selectedJob._id, { coverLetter, resume: resumeLink }, resolve, reject),
        ),
      );

      enqueueSnackbar('Job applied successfully!', { variant: 'success' });
      setOpenDialog(false);
      setCoverLetter('');
      setSelectedResume(null);
      dispatch(fetchMyResumesRequest());
    } catch (error) {
      enqueueSnackbar(error.message || 'Something went wrong', { variant: 'error' });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target ?? {};
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleShare = (job) => {
    const shareText = `Check out this job: ${job.title} at ${job.hospital}`;
    if (navigator.share) {
      navigator.share({ title: 'Job Opportunity', text: shareText, url: window.location.href });
    } else {
      window.navigator.clipboard?.writeText(`${shareText} - ${window.location.href}`);
      enqueueSnackbar('Job link copied to clipboard', { variant: 'info' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Filters */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          boxShadow: theme.shadows[2],
          border: `1.5px solid ${theme.palette.primary.light1}`,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={12}>
            <Autocomplete
              multiple
              options={nurseTypeOptions}
              value={filters.nurseType}
              onChange={(e, newValue) => setFilters((prev) => ({ ...prev, nurseType: newValue }))}
              renderInput={(params) => (
                <TextField {...params} placeholder="Nurse Type" variant="outlined" />
              )}
              sx={{
                backgroundColor: palette.gery.white,
                boxShadow: theme.shadows[1],
                '& .MuiOutlinedInput-root': {
                  minHeight: '52px',
                  borderRadius: '12px',
                  paddingTop: '6px !important',
                  paddingBottom: '6px !important',
                },
                '& .MuiChip-root': {
                  margin: '2px',
                  background: theme.palette.primary.light2,
                  color: theme.palette.primary.main,
                  borderRadius: '8px',
                  ...theme.typography.smallRegular,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={4.5}>
            <InputComponent
              name="keyword"
              variant="outlined"
              placeholder="Keyword / Hospital / Designation"
              value={filters.keyword}
              onChange={(e) => setFilters((p) => ({ ...p, keyword: e.target.value }))}
              fullWidth
              sx={{
                backgroundColor: palette.gery.white,
                boxShadow: theme.shadows[1],
                '& .MuiOutlinedInput-root': {
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '12px',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={4.5}>
            <InputSelect
              name="location"
              variant="outlined"
              value={filters.location}
              onChange={handleFilterChange}
              options={locationOptions}
              fullWidth
              placeholder="Location"
              sx={{
                backgroundColor: palette.gery.white,
                boxShadow: theme.shadows[1],
                '& .MuiOutlinedInput-root': {
                  height: '52px',
                  borderRadius: '12px',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <ButtonComponent
              fullWidth
              variant="contained"
              onClick={() => setFilters({ keyword: '', location: '', nurseType: [] })}
              sx={{
                height: '52px',
                padding: '0px !important',
              }}
            >
              Reset
            </ButtonComponent>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{ mb: 2, borderBottom: `1px solid ${palette.gery.lightGray}` }}
      >
        <Tab value="applied" label="Applied" />
        <Tab value="recommended" label="Recommended" />
        <Tab value="saved" label="Saved Jobs" />
      </Tabs>

      {/* Job Cards */}
      <Box>
        {loading ? (
          <Typography>Loading jobs...</Typography>
        ) : error ? (
          <Typography color="error">{typeof error === 'string' ? error : (error?.message || 'Error loading jobs')}</Typography>
        ) : filteredJobs.length === 0 ? (
          <Typography>No jobs found</Typography>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}

              job={job}
              onSave={() => handleSaveToggle(job)}
              onApply={() => handleApplyClick(job)}
              onShare={() => handleShare(job)}
              onOpen={(j) => onOpenJob?.(j)}
            />
          ))
        )}
      </Box>

      {/* Apply Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <HeaderPart>
          Apply for {selectedJob?.title}
          <HighlightOffRoundedIcon
            width={24}
            height={24}
            onClick={() => setOpenDialog(false)}
            style={{ cursor: 'pointer' }}
          />
        </HeaderPart>

        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ mb: 1 }}>Cover Letter</Typography>
            <TextField
              name="coverLetter"
              multiline
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: palette.gery.white,
                boxShadow: theme.shadows[1],
                '& .MuiOutlinedInput-root': { borderRadius: '12px' },
              }}
            />

            <Typography sx={{ mt: 2, mb: 1, ...theme.typography.h5 }}>
              Select or Upload Resume
            </Typography>

            <Stack spacing={2}>
              {/* EXISTING UPLOADED RESUMES */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {uploadedResumes.map((res) => {
                  const isSelected = selectedResume?._id === res._id;
                  const fileName = res.fileName || res.name || '';
                  const ext = fileName.split('.').pop()?.toLowerCase();

                  let FileIcon = InsertDriveFileIcon;
                  let iconColor = theme.palette.text.secondary;

                  if (ext === 'pdf') {
                    FileIcon = PictureAsPdfIcon;
                    iconColor = '#E53935';
                  } else if (['doc', 'docx'].includes(ext)) {
                    FileIcon = DescriptionIcon;
                    iconColor = '#1565C0';
                  }

                  return (
                    <Paper
                      key={res._id || res.id}
                      onClick={() => setSelectedResume(res)}
                      elevation={isSelected ? 3 : 1}
                      sx={{
                        p: 2,
                        width: '100%',
                        // maxWidth: 400,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        border: isSelected
                          ? `2px solid ${theme.palette.primary.main}`
                          : `1px solid ${theme.palette.gery.light}`,
                        boxShadow: isSelected ? theme.shadows[3] : theme.shadows[1],
                        backgroundColor: isSelected
                          ? theme.palette.primary.light5
                          : theme.palette.background.paper,
                        cursor: 'pointer',
                      }}
                    >
                      <FileIcon sx={{ fontSize: 34, color: iconColor }} />
                      <Box>
                        <Typography sx={{ ...theme.typography.h6 }}>
                          {fileName || 'Resume'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          Uploaded on {new Date(res.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Paper>
                  );
                })}
              </Box>

              {/* FILE PICKER */}
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  mt: 1,
                  borderRadius: 2,
                  border: `1px dashed ${theme.palette.gery.medium}`,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.light5,
                  },
                }}
                onClick={() => document.getElementById('resume-upload').click()}
              >
                <CloudUploadIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mb: 1 }} />
                <Typography sx={{ ...theme.typography.h6 }}>Upload New Resume</Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  PDF, DOC, or DOCX (max 5 MB)
                </Typography>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedResume({ id: 'new', name: file.name, file });
                    }
                  }}
                />
              </Paper>

              {/* ✅ Upload button beside selected resume */}
              {selectedResume && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.primary.main,
                      fontStyle: 'italic',
                      flex: 1,
                    }}
                  >
                    Selected: {selectedResume.name}
                  </Typography>
                  {selectedResume?.id === 'new' && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={async () => {
                        try {
                          const formData = new FormData();
                          formData.append('resumes', selectedResume.file);
                          const uploaded = await new Promise((resolve, reject) =>
                            dispatch(uploadResumeRequest(formData, resolve, reject)),
                          );

                          if (uploaded?.[0]) {
                            enqueueSnackbar('Resume uploaded successfully!', {
                              variant: 'success',
                            });
                            setSelectedResume(uploaded[0]); // replace new resume with uploaded
                            dispatch(fetchMyResumesRequest());
                          } else {
                            throw new Error('Upload failed');
                          }
                        } catch (err) {
                          enqueueSnackbar(err.message || 'Upload failed', { variant: 'error' });
                        }
                      }}
                    >
                      Upload Resume
                    </Button>
                  )}
                </Box>
              )}
            </Stack>
          </Box>
        </DialogContent>

        <FooterPart>
          <ButtonComponent
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            sx={{ minWidth: '106px' }}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent variant="contained" onClick={handleApplySubmit} sx={{ minWidth: '106px' }}>
            Submit
          </ButtonComponent>
        </FooterPart>
      </Dialog>
    </Box>
  );
}
