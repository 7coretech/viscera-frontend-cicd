
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';


export const FormLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.smallRegular,
  marginBottom:'4px'
}));


