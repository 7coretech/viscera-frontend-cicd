import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputBase,
  Tooltip,
} from '@mui/material';
import {
  FormHeaderContainer,
  HeaderText,
  SubHeader,
} from 'src/modules/app/utility/Styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import ButtonComponent from 'src/components/shared/Button';
import { useTheme } from '@mui/material';
import useResponsive from 'src/components/hooks/useResponsive';
import { postResume } from 'src/modules/auth/api/authApi';
import { getResumes } from 'src/modules/auth/api/authApi';
const ResumeManager = () => {
  const [resumeList, setResumeList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getResumes();
        const base = res && typeof res === 'object' ? res : {};
        const list = Array.isArray(base?.data) ? base.data : Array.isArray(base) ? base : [];
        const mapped = list.map((item, idx) => {
          const fileName = item?.originalFileName || '';
          const ext =
            fileName && fileName.includes('.')
              ? fileName.split('.').pop().toLowerCase()
              : (item?.mimeType || '').split('/').pop().toLowerCase();
          const nameWithoutExt = fileName ? fileName.replace(/\.[^/.]+$/, '') : 'Resume';
          return {
            id: item?.id || idx,
            fileName,
            displayName: nameWithoutExt,
            extension: ext || 'pdf',
            isPrimary: Boolean(item?.isPrimary),
            categoryLabel: `Resume ${idx + 1}`,
            fileKey: item?.fileKey || '',
          };
        });
        setResumeList(mapped);
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load resumes');
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);
  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <PictureAsPdfIcon sx={{ color: '#f44336' }} />;
    return <InsertDriveFileIcon sx={{ color: theme.palette.primary.main }} />;
  };

  const handleUploadResumeClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append('resume', file); // ✅ backend expects "resume"

    // Call your backend API
    await postResume(formData);

    // Update frontend state
    const fileName = file.name;
    const newResume = {
      id: Date.now(),
      fileName,
      displayName: fileName.split('.')[0],
      extension: fileName.split('.').pop(),
      isPrimary: resumeList.length === 0,
      categoryLabel: resumeList.length === 0 ? 'Primary Resume' : `Resume ${resumeList.length + 1}`,
    };

    setResumeList([...resumeList, newResume]);
    setEditingId(newResume.id);
    event.target.value = null;
  } catch (error) {
    console.error('Failed to upload resume:', error);
    alert('Failed to upload resume. Please try again.');
  }
};


  const handleRename = (id, newName) => {
    setResumeList(
      resumeList.map((res) =>
        res.id === id ? { ...res, displayName: newName } : res
      )
    );
  };

  const ResumeTips = () => (
    <Box
      mt={4}
      pt={2}
      sx={{
        backgroundColor: alpha(theme.palette.gery.medium, 0.1),
        borderRadius: '8px',
        padding: '12px',
      }}
    >
      <Typography
        sx={{ ...theme.typography.body2, color: theme.palette.text.secondary }}
        mb={1}
      >
        Tips:
      </Typography>
      <List disablePadding>
        {[
          'You can upload up to 5 resumes',
          'Set one resume as primary - it will be auto-selected when applying',
          'Accepted formats: PDF, DOC, DOCX (Max 5MB)',
        ].map((text) => (
          <ListItem key={text} disableGutters sx={{ py: 0.2 }}>
            <ListItemIcon
              sx={{ minWidth: '30px', color: theme.palette.primary.main }}
            >
              <CheckCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                variant: 'body2',
                color: alpha(theme.palette.text.secondary, 0.7),
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx"
        style={{ display: 'none' }}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormHeaderContainer>
          <HeaderText>Resume Manager</HeaderText>
          <SubHeader>Upload and manage your resumes</SubHeader>
        </FormHeaderContainer>

        {isMobile || isTablet ? (
          <ButtonComponent variant="contained" onClick={handleUploadResumeClick} disabled={loading}>
            <UploadFileIcon />
          </ButtonComponent>
        ) : (
          <ButtonComponent
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={handleUploadResumeClick}
            sx={{ minWidth: '150px' }}
            disabled={loading}
          >
            Upload Resume
          </ButtonComponent>
        )}
      </Box>

      {error && (
        <Typography sx={{ color: theme.palette.error.main, mt: 2 }}>
          {error}
        </Typography>
      )}
      {resumeList.length === 0 ? (
        <Box mt={4} textAlign="center" py={10}>
          <DescriptionIcon
            sx={{ fontSize: 120, color: alpha(theme.palette.text.secondary, 0.4) }}
          />
          <Typography sx={{ ...theme.typography.h4, fontWeight: 500, mt: 2 }}>
            No resumes uploaded
          </Typography>
          <Typography
            mb={3}
            sx={{
              ...theme.typography.h5,
              color: alpha(theme.palette.text.secondary, 0.5),
            }}
          >
            Upload your resume to apply for jobs quickly
          </Typography>
          <ButtonComponent variant="contained" onClick={handleUploadResumeClick}>
            Upload Resume
          </ButtonComponent>
        </Box>
      ) : (
        <Box mt={4} py={4}>
          <Grid container spacing={2}>
            {resumeList.map((resume) => (
              <Grid item xs={12} key={resume.id}>
                <Box
                  display="flex"
                  alignItems="center"
                  p={2}
                  sx={{
                    border: `1px solid ${editingId === resume.id ? theme.palette.primary.main : alpha(theme.palette.divider, 0.4)}`,
                    borderRadius: '8px',
                    backgroundColor: alpha(theme.palette.gery.medium, 0.05),
                    transition: 'border 0.2s ease',
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex' }}>{getFileIcon(resume.fileName)}</Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" fontWeight={600} color="primary" sx={{ display: 'block', mb: 0.5 }}>
                      {resume.categoryLabel}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      {editingId === resume.id ? (
                        <InputBase
                          autoFocus
                          value={resume.displayName}
                          onChange={(e) => handleRename(resume.id, e.target.value)}
                          onBlur={() => setEditingId(null)}
                          onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                          sx={{
                            ...theme.typography.body2,
                            fontWeight: 600,
                            borderBottom: `1px solid ${theme.palette.primary.main}`,
                            width: '100%',
                            maxWidth: '350px'
                          }}
                        />
                      ) : (
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          onClick={() => setEditingId(resume.id)}
                          sx={{ cursor: 'pointer' }}
                        >
                          {resume.displayName}
                          <Typography component="span" variant="caption" sx={{ opacity: 0.6 }}>
                            .{resume.extension}
                          </Typography>
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: alpha(theme.palette.text.secondary, 0.7), display: 'block', mt: 0.5 }}
                    >
                      Original: {resume.fileName}
                    </Typography>
                  </Box>

                  <Tooltip title={editingId === resume.id ? "Save Name" : "Rename"}>
                    <IconButton
                      size="small"
                      onClick={() => setEditingId(editingId === resume.id ? null : resume.id)}
                    >
                      {editingId === resume.id ?
                        <CheckIcon fontSize="small" sx={{ color: theme.palette.success.main }} /> :
                        <EditIcon fontSize="small" />
                      }
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <ResumeTips />
    </Box>
  );
};

export default ResumeManager;
