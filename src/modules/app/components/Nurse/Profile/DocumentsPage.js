import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  alpha,
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
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ButtonComponent from 'src/components/shared/Button';
import { useTheme } from '@mui/material';
import useResponsive from 'src/components/hooks/useResponsive';

const AcceptedFileTypes = () => {
  const theme = useTheme();
  return (
    <Box
      mt={4}
      pt={2}
      sx={{
        backgroundColor: alpha(theme.palette.gery.medium, 0.1),
        borderRadius: '8px',
        padding: '12px',
      }}
    >
      <Typography sx={{ ...theme.typography.body2, color: theme.palette.text.secondary }}>
        Accepted file types:
      </Typography>
      <Typography
        sx={{
          ...theme.typography.h5,
          mt: 0.2,
          color: alpha(theme.palette.text.primary, 0.3),
        }}
      >
        PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB per file)
      </Typography>
    </Box>
  );
};

const DocumentsPage = () => {
  const [documentList, setDocumentList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const theme = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const fileInputRef = useRef(null);

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <PictureAsPdfIcon sx={{ color: '#f44336' }} />;
    if (['jpg', 'jpeg', 'png'].includes(ext)) return   <InsertDriveFileIcon
                    sx={{ color: theme.palette.primary.main, mr: 2 }}
                  />;
    return <InsertDriveFileIcon sx={{ color: theme.palette.primary.main }} />;
  };

  const handleUploadDocument = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const fileName = files[0].name;
      const newDocument = {
        id: Date.now(),
        fileName: fileName,
        displayName: fileName.split('.')[0],
        extension: fileName.split('.').pop(),
        categoryLabel: documentList.length === 0 ? 'Primary Document' : `Document ${documentList.length + 1}`,
      };

      setDocumentList([...documentList, newDocument]);
      event.target.value = null;
      setEditingId(newDocument.id);
    }
  };

  const handleRename = (id, newName) => {
    setDocumentList(
      documentList.map((doc) =>
        doc.id === id ? { ...doc, displayName: newName } : doc
      )
    );
  };

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormHeaderContainer>
          <HeaderText>Documents</HeaderText>
          <SubHeader>Upload certifications, ID, and other documents</SubHeader>
        </FormHeaderContainer>

        {isMobile || isTablet ? (
          <ButtonComponent variant="contained" onClick={handleUploadDocument}>
            <UploadFileIcon />
          </ButtonComponent>
        ) : (
          <ButtonComponent
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={handleUploadDocument}
            sx={{ minWidth: '150px' }}
          >
            Upload Document
          </ButtonComponent>
        )}
      </Box>

      {documentList.length === 0 ? (
        <Box mt={4} textAlign="center" py={10}>
          <DescriptionIcon sx={{ fontSize: 120, color: alpha(theme.palette.text.secondary, 0.2) }} />
          <Typography sx={{ ...theme.typography.h4, fontWeight: 500, mt: 2 }}>
            No documents uploaded
          </Typography>
          <Typography
            mb={3}
            sx={{
              ...theme.typography.h5,
              color: alpha(theme.palette.text.secondary, 0.5),
            }}
          >
            Upload your certifications, ID, and other important documents
          </Typography>
          <ButtonComponent variant="contained" onClick={handleUploadDocument}>
            Upload Document
          </ButtonComponent>
        </Box>
      ) : (
        <Box mt={4} py={4}>
          <Grid container spacing={2}>
            {documentList.map((doc) => (
              <Grid item xs={12} key={doc.id}>
                <Box
                  display="flex"
                  alignItems="center"
                  p={2}
                  sx={{
                    border: `1px solid ${editingId === doc.id ? theme.palette.primary.main : alpha(theme.palette.divider, 0.4)}`,
                    borderRadius: '8px',
                    backgroundColor: alpha(theme.palette.gery.medium, 0.05),
                    transition: 'border 0.2s ease',
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex' }}>{getFileIcon(doc.fileName)}</Box>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" fontWeight={600} color="primary" sx={{ display: 'block', mb: 0.5 }}>
                      {doc.categoryLabel}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      {editingId === doc.id ? (
                        <InputBase
                          autoFocus
                          value={doc.displayName}
                          onChange={(e) => handleRename(doc.id, e.target.value)}
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
                          onClick={() => setEditingId(doc.id)}
                          sx={{ cursor: 'pointer' }}
                        >
                          {doc.displayName}
                          <Typography component="span" variant="caption" sx={{ opacity: 0.6 }}>
                            .{doc.extension}
                          </Typography>
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: alpha(theme.palette.text.secondary, 0.7), display: 'block', mt: 0.5 }}
                    >
                      Original: {doc.fileName}
                    </Typography>
                  </Box>

                  <Tooltip title={editingId === doc.id ? "Save Name" : "Rename"}>
                    <IconButton 
                      size="small" 
                      onClick={() => setEditingId(editingId === doc.id ? null : doc.id)}
                    >
                      {editingId === doc.id ? 
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

      <AcceptedFileTypes />
    </Box>
  );
};

export default DocumentsPage;