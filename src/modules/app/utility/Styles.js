import { styled } from '@mui/material/styles';
import { Box, Typography, Card,alpha } from '@mui/material';
import theme from 'src/config/theme';
export const FormLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.smallRegular,
  marginBottom: '4px',
}));

export const FormHeaderContainer = styled(Box)({
  // margin: '20px 0px',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection:'column'
});

export const HeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  pb: 0.5,
  color: theme.palette.text.primary,
}));

export const SubHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color:alpha(theme.palette.gery.dark,0.5),
  fontWeight:400,
  marginTop:'6px'
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  padding: '24px',
  borderRadius: '12px',
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  border: `3px solid ${theme.palette.primary.light1}`,
  transition: 'all 0.3s ease',
  cursor:'pointer',
  '&:hover': {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-4px)',
    backgroundColor: theme.palette.primary.light4 ,
  },
}));

export const HorizontalContainer = styled(Box)({
  display:'flex',
  alignItems:'center', 
  gap:'10px'
});
export const VerticalContainer = styled(Box)({
  display:'flex',
  flexDirection:'column',
  // gap:'12px'
});

export const Text1 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color:alpha(theme.palette.gery.dark,0.5),
  fontWeight:400,
}));
export const Colon = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color:alpha(theme.palette.gery.dark,0.5),
  fontWeight:400,
  wordWrap:'break-word'
}));

export const Text2 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color:theme.palette.text.primary,
    wordWrap:'break-word'


}));

export const FooterPart = styled(Box)({
    height: "100px",
    padding: '24px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
    borderTop: `1px solid ${theme.palette.primary.light1} !important`,
    [theme.breakpoints.down('md')]: {
        height: '80px',
        padding: '20px 16px'
    }
})


export const HeaderPart = styled(Box)({
    backgroundColor: theme.palette.primary.light3,
    color: theme.palette.gery.black,
    ...theme.typography.h3,
    borderBottom: `1px solid ${theme.palette.primary.light1} !important`,
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    [theme.breakpoints.down('md')]: {
        ...theme.mobileTypography.h4,
        height: '59px',
        padding: '20px 16px'
    },
})