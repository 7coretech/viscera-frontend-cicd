import React from 'react';
import { Box, Paper, Typography, Chip, Stack, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import theme, { palette, typography, shadows } from 'src/config/theme';
import { useNavigate } from 'react-router-dom';

export default function JobCard({ job, onSave, onApply, onOpen }) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 2,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        boxShadow: shadows[1],
        backgroundColor: palette.gery.white,
        border: `1.5px solid ${theme.palette.primary.light1}`,
        '&:hover': {
          boxShadow: theme.shadows[4],
          cursor: 'pointer',
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ ...typography.h5, color: palette.text.primary }}>
            {job.title}
          </Typography>
          <Chip
            label={job.type}
            size="small"
            sx={{
              borderRadius: 1,
              backgroundColor: palette.primary.light5,
              color: palette.primary.main,
              fontSize: '12px',
              fontWeight: 500,
            }}
          />
        </Box>

        <Typography
          sx={{
            ...typography.smallRegular,
            color: palette.text.secondary,
            mt: 0.5,
          }}
        >
          <strong>{job.hospital}</strong> • {job.location}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
          {job.tags?.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              sx={{
                borderRadius: 1,
                backgroundColor: palette.primary.light4,
                fontSize: '12px',
              }}
            />
          ))}
        </Stack>

        <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MonetizationOnIcon sx={{ fontSize: 18, color: palette.primary.main }} />
            <Typography sx={{ ...typography.smallRegular }}>
              {job.minSalary} - {job.maxSalary}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PlaceIcon sx={{ fontSize: 18, color: palette.action.purpleLight }} />
            <Typography sx={{ ...typography.smallRegular }}>{job.location}</Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            ...typography.smallRegular,
            color: palette.text.secondary,
            mt: 2,
            maxWidth: 600,
          }}
        >
          {job.summary}
        </Typography>
      </Box>

      <Stack spacing={1} sx={{ ml: 3, minWidth: 160 }}>
        <Button
          variant="contained"
          size="small"
          sx={{ borderRadius: 2 }}
          onClick={() => navigate(`/nurse/jobdetails/${job._id || job.id}`)}
        >
          View Details
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderRadius: 2 }}
          onClick={() => {
            onApply(job);
          }}
        >
          {job.applied ? 'Applied' : 'Apply Now'}
        </Button>
        <Button
          variant="text"
          size="small"
          sx={{
            borderRadius: 2,
            color: job.saved ? palette.action.purpleDark : palette.text.secondary,
            fontWeight: 500,
          }}
          onClick={() => onSave(job)}
        >
          {job.saved ? 'Saved' : 'Save'}
        </Button>
      </Stack>
    </Paper>
  );
}
