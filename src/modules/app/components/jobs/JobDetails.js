import React, { useEffect, useMemo } from 'react';
import { Box, Paper, Typography, Grid, Chip, Button, Divider, Stack, Dialog, DialogContent, TextField } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useParams } from 'react-router-dom';
import theme, { palette, typography } from 'src/config/theme';
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderPart, FooterPart } from '../../utility/Styles';
import ButtonComponent from 'src/components/shared/Button';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import {
  fetchAllJobsRequest,
  unsaveJobRequest,
  saveJobRequest,
  fetchSaveJobsRequest,
  uploadResumeRequest,
  applyJobRequest,
} from 'src/modules/app/store/appActions';

export default function JobDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { alljobs: jobs = [], isLoading: loading, error } = useSelector((state) => state.app);
  const savedJobs = useSelector((s) => s.app?.savejobs?.payload || []);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [coverLetter, setCoverLetter] = React.useState('');
  const [selectedResume, setSelectedResume] = React.useState(null);
  const [resumes, setResumes] = React.useState([]);
const [certificates, setCertificates] = React.useState([]);
const [documents, setDocuments] = React.useState([]);


  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
    setCoverLetter(
      `Dear Hiring Manager,

I am excited to apply for the ${job.title} position at ${job.hospital}.
My nursing background and patient-care experience align well with your requirements.

Thank you for considering my application.

Sincerely,
Nurse`,
    );
  };
const handleFileChange = (e, setter) => {
  setter(Array.from(e.target.files));
};

const handleApplySubmit = async () => {
  if (!selectedJob) return;

  try {
    const uploadFiles = async (files, key) => {
      if (!files.length) return [];

      const formData = new FormData();
      files.forEach((file) => formData.append(key, file));

      return await new Promise((resolve, reject) =>
        dispatch(uploadResumeRequest(formData, resolve, reject)),
      );
    };

    const uploadedResumes = await uploadFiles(resumes, 'resumes');
    const uploadedCertificates = await uploadFiles(certificates, 'certificates');
    const uploadedDocuments = await uploadFiles(documents, 'documents');

    await new Promise((resolve, reject) =>
      dispatch(
        applyJobRequest(
          selectedJob._id,
          {
            coverLetter,
            resumes: uploadedResumes.map((r) => r.path),
            certificates: uploadedCertificates.map((c) => c.path),
            documents: uploadedDocuments.map((d) => d.path),
          },
          resolve,
          reject,
        ),
      ),
    );

    setOpenDialog(false);
    setCoverLetter('');
    setResumes([]);
    setCertificates([]);
    setDocuments([]);
  } catch (err) {
    console.log(err);
  }
};


  const job = useMemo(() => {
    const found = jobs.find((j) => j._id === id);
    if (!found) return null;
    return {
      ...found,
      saved: savedJobs.some((sj) => sj.jobId?._id === found._id),
    };
  }, [jobs, id, savedJobs]);

  const recommendedJobs = useMemo(
    () =>
      jobs
        .filter(
          (j) =>
            j._id !== job?._id &&
            (j.location === job?.location || j.tags?.some((t) => job?.tags?.includes(t))),
        )
        .slice(0, 3),
    [jobs, job],
  );

  const benefits = job?.benefits
    ? job.benefits.split(',').map((b) => b.trim())
    : ['Accommodation near hospital', 'Overtime pay', 'PF & ESI', 'Health insurance'];

  if (loading) return <Typography sx={{ p: 4, textAlign: 'center' }}>Loading job...</Typography>;

  if (error)
    return <Typography sx={{ p: 4, textAlign: 'center', color: 'red' }}>{error}</Typography>;

  if (!job) return <Typography sx={{ p: 4 }}>Job not found</Typography>;

  const handleSaveToggle = async (job) => {
    try {
      if (job.saved) {
        await new Promise((resolve, reject) =>
          dispatch(unsaveJobRequest(job._id, resolve, reject)),
        );
      } else {
        await new Promise((resolve, reject) => dispatch(saveJobRequest(job._id, resolve, reject)));
      }
      dispatch(fetchSaveJobsRequest());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    
    <Box sx={{ p: 4, backgroundColor: palette.gery.light5, minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: theme.shadows[2],
              border: `1.5px solid ${theme.palette.primary.light1}`,
            }}
          >
            <Typography sx={{ ...typography.h3, mb: 1 }}>{job.title}</Typography>
            <Typography sx={{ ...typography.smallRegular, color: palette.text.secondary }}>
              <strong>{job.hospital}</strong> • {job.location}
            </Typography>

            <Stack direction="row" spacing={3} alignItems="center" sx={{ mt: 2, flexWrap: 'wrap' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <MonetizationOnIcon sx={{ color: palette.primary.main }} />
                <Typography sx={{ ...typography.smallRegular }}>
                  {job.minSalary && job.maxSalary
                    ? `$${job.minSalary} - $${job.maxSalary}/hr`
                    : 'Salary not specified'}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon sx={{ color: palette.action.purpleLight }} />
                <Typography sx={{ ...typography.smallRegular }}>
                  {job.shift || 'Day / Night Shifts'}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <LocalHospitalIcon sx={{ color: palette.text.secondary }} />
                <Typography sx={{ ...typography.smallRegular }}>
                  {job.specialty || 'General Ward'}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ ...typography.h5, mb: 1 }}>Nurse Type Required</Typography>
              <Typography sx={{ ...typography.smallRegular, color: palette.text.secondary }}>
                {job.nurseType
                  ? Array.isArray(job.nurseType)
                    ? job.nurseType.join(', ')
                    : job.nurseType
                  : 'Not Specified'}
              </Typography>
            </Box>

            {job.appliedDetails && (
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ ...typography.h6, mb: 1 }}>Your Application</Typography>

                <Typography sx={{ ...typography.smallRegular }}>
                  <strong>Resume:</strong> {job.appliedDetails.resumeName || 'NN/A'}
                </Typography>

                <Typography sx={{ ...typography.smallRegular, mt: 1 }}>
                  <strong>Cover Letter:</strong>{' '}
                  {job.appliedDetails.coverLetter ? 'Attached' : 'N/A'}
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ ...typography.h5, mb: 1 }}>Job Description</Typography>
              <Typography sx={{ ...typography.smallRegular, color: palette.text.secondary }}>
                {job.description ||
                  'Provide patient care, administer medications, monitor vitals, and assist doctors.'}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography sx={{ ...typography.h5, mb: 1 }}>Requirements</Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {(
                  job.requirements || [
                    'Valid nursing license',
                    'BLS / ACLS certification',
                    '1–3 years hospital experience',
                  ]
                ).map((r, i) => (
                  <li key={i}>
                    <Typography sx={{ ...typography.smallRegular }}>{r}</Typography>
                  </li>
                ))}
              </ul>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography sx={{ ...typography.h5, mb: 1 }}>Benefits</Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {benefits.map((b, i) => (
                  <li key={i}>
                    <Typography sx={{ ...typography.smallRegular }}>{b}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Paper>

          <Box sx={{ mt: 5 }}>
            <Typography sx={{ ...typography.h4, mb: 2 }}>Recommended Jobs</Typography>
            {recommendedJobs.length > 0 ? (
              recommendedJobs.map((j) => (
                <JobCard
                  key={j._id}
                  job={{
                    ...j,
                    id: j._id,
                    saved: savedJobs.some((sj) => sj.jobId?._id === j._id),
                  }}
                  onApply={() => handleApplyClick(j)}
                  onSave={() => handleSaveToggle(j)}
                />
              ))
            ) : (
              <Typography sx={{ color: palette.text.secondary }}>
                No recommended jobs found.
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: theme.shadows[1],
              backgroundColor: palette.gery.white,
              border: `1.5px solid ${theme.palette.primary.light1}`,
            }}
          >
            <Typography sx={{ ...typography.h6, mb: 1 }}>Hospital Info</Typography>
            <Typography sx={{ ...typography.smallRegular, color: palette.text.secondary }}>
              {job.hospital || 'ABC Multispeciality Hospital'}
            </Typography>
            <Typography sx={{ ...typography.smallRegular, mt: 0.5, color: palette.text.secondary }}>
              {job.hospitalDetails || '500+ bed capacity, NABH accredited'}
            </Typography>

            <Typography sx={{ ...typography.h6, mt: 3, mb: 1 }}>Specialties</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {(job.tags || ['ICU', 'Emergency', 'Cardiology']).map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    backgroundColor: palette.primary.light5,
                    color: palette.primary.main,
                  }}
                />
              ))}
            </Box>

            {job.visa && (
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ ...typography.h6, mb: 1 }}>Visa / Relocation</Typography>
                <Typography sx={{ ...typography.smallRegular, color: palette.text.secondary }}>
                  {job.visa}
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ borderRadius: 2 }}
                onClick={() => handleApplyClick(job)}
              >
                {job.applied ? 'Applied' : 'Apply Now'}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                sx={{ borderRadius: 2, mt: 1 }}
                onClick={() => handleSaveToggle(job)}
              >
                {savedJobs.some((sj) => sj.jobId?._id === job._id) ? 'Saved' : 'Save Job'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
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
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
    />

    {/* Resume Upload */}
    <Box sx={{ mt: 2 }}>
      <Typography>Resume(s)</Typography>
      <Button component="label" variant="outlined" size="small">
        Upload Resume
        <input hidden type="file" multiple onChange={(e) => handleFileChange(e, setResumes)} />
      </Button>
      {resumes.length > 0 && (
        <Typography sx={{ fontSize: 12, mt: 0.5 }}>
          {resumes.length} file(s) selected
        </Typography>
      )}
    </Box>

    {/* Certificates Upload */}
    <Box sx={{ mt: 2 }}>
      <Typography>Certificates</Typography>
      <Button component="label" variant="outlined" size="small">
        Upload Certificate
        <input hidden type="file" multiple onChange={(e) => handleFileChange(e, setCertificates)} />
      </Button>
      {certificates.length > 0 && (
        <Typography sx={{ fontSize: 12, mt: 0.5 }}>
          {certificates.length} file(s) selected
        </Typography>
      )}
    </Box>

    {/* Documents Upload */}
    <Box sx={{ mt: 2 }}>
      <Typography>Other Documents</Typography>
      <Button component="label" variant="outlined" size="small">
        Upload Document
        <input hidden type="file" multiple onChange={(e) => handleFileChange(e, setDocuments)} />
      </Button>
      {documents.length > 0 && (
        <Typography sx={{ fontSize: 12, mt: 0.5 }}>
          {documents.length} file(s) selected
        </Typography>
      )}
    </Box>
  </Box>
</DialogContent>


  <FooterPart>
    <ButtonComponent variant="outlined" onClick={() => setOpenDialog(false)}>
      Cancel
    </ButtonComponent>
    <ButtonComponent variant="contained" onClick={handleApplySubmit}>
      Submit
    </ButtonComponent>
  </FooterPart>
</Dialog>

    </>
  );
}
