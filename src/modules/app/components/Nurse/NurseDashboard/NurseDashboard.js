import React from 'react';
import { Box, Grid, Typography, LinearProgress, Button, Chip, Card, useTheme, Divider } from '@mui/material';
import theme from 'src/config/theme';
import { CardContainer, HorizontalContainer, VerticalContainer } from 'src/modules/app/utility/Styles';
import ButtonComponent from 'src/components/shared/Button';
import { useNavigate } from 'react-router-dom';
import useResponsive from 'src/components/hooks/useResponsive';
import ProfileCompletenessPie from './ProfileCompletenessPie ';
import MessageIcon from '@mui/icons-material/MailOutline'; 
import BookmarkIcon from '@mui/icons-material/BookmarkBorder'; 
import FileIcon from '@mui/icons-material/DescriptionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { useEffect, useState } from 'react';
import { getCompletionScore } from 'src/modules/auth/api/authApi';
import { useLocation } from 'react-router-dom';



const NurseDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const [completenessData, setCompletenessData] = useState([]);
const [loadingCompletion, setLoadingCompletion] = useState(true);

const location = useLocation();
useEffect(() => {
  fetchCompletionScore();
}, [location.pathname]);

const fetchCompletionScore = async () => {
  try {
    const res = await getCompletionScore();

   const d = res?.data?.data || {};

const normalizedData = [
  { title: "General Info", value: parseFloat(d.genralInfoPercentage) || 0, color: "#1e88e5" },
  { title: "Experience", value: parseFloat(d.experiencePercentage) || 0, color: "#43a047" },
  { title: "Skills", value: parseFloat(d.skillsPercentage) || 0, color: "#fb8c00" },
  { title: "Licenses", value: parseFloat(d.licensesPercentage) || 0, color: "#8e24aa" },
  { title: "Documents", value: parseFloat(d.documentPercentage) || 0, color: "#3949ab" },
  { title: "Resume", value: parseFloat(d.resumePercentage) || 0, color: "#f4511e" },
];

setCompletenessData(normalizedData);

  } catch (error) {
    console.error('Completion score API failed', error);
  } finally {
    setLoadingCompletion(false);
  }
};

    const handleClick = (label, value) => {
    if (value === 0) return; 

    if (label === "New Messages") {
      navigate("/nurse/chatList");
    } else if (label === "Saved Jobs") {
      navigate("/nurse/jobdashboard");
    } else if (label === "Applications") {
      navigate("/nurse/jobdashboard");
    }
  };
  return (
    <Box sx={{  m: isMobile || isTablet ? 2 : 3, height: '100vh', overflowY: 'auto', scrollbarWidth:'none' }}>
      <Typography sx={{ ...theme.typography.h1, mb: 3 }}>Nurse Dashboard</Typography>
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7.5}>
              <CardContainer onClick={() => navigate("/nurse/profile")} sx={{height:'100%'}}>
      <Typography sx={{ ...theme.typography.h3, fontWeight: 500 }}>
        Profile Completeness
      </Typography>

     <Box sx={{display:'flex', justifyContent:'center'}}>
        <ProfileCompletenessPie data={completenessData} />

     </Box>
     

      {/* <ButtonComponent variant="outlined">
        Complete Profile
      </ButtonComponent> */}
    </CardContainer>
          </Grid>

        <Grid item xs={12} md={4.5} >
   <CardContainer sx={{height:'100%'}}>
    <Typography sx={{ ...theme.typography.h3, fontWeight: '500', mb: 3 }}>Quick Stats</Typography>

    <Grid container direction="column">
        {[
            { value: 3, label: 'New Messages', icon: SmsOutlinedIcon },
            { value: 5, label: 'Saved Jobs', icon: BookmarkIcon },
            { value: 2, label: 'Applications', icon: FileIcon },
        ].map((item, i) => (
            <React.Fragment key={i}>
                <Grid item xs={12} onClick={() => handleClick(item.label, item.value)} sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <HorizontalContainer sx={{ alignItems: 'center', '&:hover': {color:theme.palette.primary.main }  }}>
                        <item.icon sx={{ color: 'primary.main', mr: 1.5, fontSize: 24 }} />
                        <Typography sx={{ ...theme.typography.smallRegular }}>
                            {item.label}
                        </Typography>
                    </HorizontalContainer>

                    <Typography
                        sx={{
                            ...theme.typography.h3,
                            color: 'primary.main',
                            fontWeight: 'bold',
                        }}
                    >
                        {item.value}
                    </Typography>
                </Grid>
                {i < 2 && <Divider sx={{ my: 2 }} />}
            </React.Fragment>
        ))}
    </Grid>
</CardContainer>
</Grid>

          <Grid item xs={12} md={7.5}>
            <CardContainer onClick={() => navigate(`/nurse/jobs`)} sx={{height:'100%'}}>
              <Typography sx={{ ...theme.typography.h3,fontWeight:'500', mb: 2 }}>Recommended Jobs</Typography>

              {[
                { role: 'ICU Nurse', place: 'City Hospital • New York, NY' },
                { role: 'ER Nurse', place: 'Memorial Medical • Boston, MA' },
                { role: 'Pediatric Nurse', place: "Children's Hospital • Chicago, IL" },
              ].map((job, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <HorizontalContainer>
                 <Box sx={{width:'8px',height:'8px',borderRadius:'50%',backgroundColor:'primary.main',mt:-2}} />
                 <VerticalContainer>
                   <Typography sx={{ ...theme.typography.small }}>{job.role}</Typography>
                   <Typography
                    sx={{
                      ...theme.typography.smallRegular,
                      color: 'text.secondary',
                    }}
                  >
                    {job.place}
                  </Typography>
                 </VerticalContainer>
                
                  </HorizontalContainer>
                
                </Box>
              ))}

              <ButtonComponent fullWidth variant="outlined" sx={{  mt: 2 }}>
                View All Jobs
              </ButtonComponent>
            </CardContainer>
          </Grid>

          <Grid item xs={12} md={4.5}>
            <CardContainer onClick={() => {
              navigate('/nurse/jobdashboard')
            }} sx={{height:'100%'}}>
              <Typography sx={{ ...theme.typography.h3,fontWeight:'500', mb: 2 }}>My Applications</Typography>

              <HorizontalContainer sx={{ mb: 2, justifyContent:'space-between' }}>
                <VerticalContainer>
                <Typography sx={{ ...theme.typography.small }}>ICU Nurse - City Hospital</Typography>
                <Typography
                  sx={{
                    ...theme.typography.smallRegular,
                    color: 'text.secondary',
                  }}
                >
                  2024-11-20
                </Typography>
                </VerticalContainer>
                <Chip label="viewed" size="small" sx={{ mt: 1,   bgcolor: theme.palette.action.blueLight,
    color: theme.palette.background.paper,
       borderRadius: '8px', 
       padding:'16px 10px' }} />
              </HorizontalContainer>

              <HorizontalContainer sx={{ mb: 3,justifyContent:'space-between' }}>
                <VerticalContainer>
  <Typography sx={{ ...theme.typography.small }}>
                  ER Nurse - Memorial Medical
                </Typography>
                <Typography
                  sx={{
                    ...theme.typography.smallRegular,
                    color: 'text.secondary',
                  }}
                >
                  2024-11-18
                </Typography>
                </VerticalContainer>
              
                <Chip
                  label="shortlisted"
                  size="small"
 sx={{
    mt: 1,
    bgcolor: theme.palette.action.green,
    color: theme.palette.background.paper,
       borderRadius: '8px', 
       padding:'16px 10px'
  }}                />
              </HorizontalContainer>

              <ButtonComponent fullWidth variant="outlined" >
                View All Applications
              </ButtonComponent>
            </CardContainer>
          </Grid>
        </Grid>
      </>
    </Box>
  );
};

export default NurseDashboard;
