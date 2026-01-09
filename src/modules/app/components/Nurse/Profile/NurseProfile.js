import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import theme, { shadows } from "src/config/theme";

import PersonalDetails from "./PersonalDetails";
import LicensesAndCredentials from "./LicensesAndCredentials";
import Preferences from "./Preferences";
import ExperienceAndWork from "./ExperienceAndWork";
import Availability from "./Availability";
import TravelPreferences from "./TravelPreferences";
import SkillsAndSpecialties from "./SkillsAndSpecialties";
import Compensation from "./Compensation";
import DocumentsPage from "./DocumentsPage";
import ResumeManager from "./ResumeManager";
import ComplianceAndLanguage from "./ComplianceAndLanguage";
import JobPreference from "./JobPreference";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import useResponsive from "src/components/hooks/useResponsive";
import VaccinationDetails from "./VaccinationDetails";
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
const sections = [
  { key: "general", label: "General Info", icon: <PersonOutlineOutlinedIcon />, Component: PersonalDetails },
  { key: "preferences", label: "My Preferences", icon: <TuneIcon />, Component: Preferences },
  { key: "experience", label: "Experience", icon: <WorkHistoryOutlinedIcon />, Component: ExperienceAndWork },
  { key: "skills", label: "Skills", icon: <EmojiEventsOutlinedIcon />, Component: SkillsAndSpecialties },
  { key: "licenses", label: "Licenses & Certifications", icon: <VerifiedUserOutlinedIcon />, Component: LicensesAndCredentials },
  { key: "availability", label: "Availability", icon: <AccessTimeIcon />, Component: Availability },
  { key: "compensation", label: "Compensation", icon: <AttachMoneyIcon />, Component: Compensation },
  { key: "travel", label: "Travel Preferences", icon: <FlightTakeoffIcon />, Component: TravelPreferences },
  { key: "documents", label: "Documents", icon: <DescriptionOutlinedIcon />, Component: DocumentsPage },
  { key: "resume", label: "Resume Manager", icon: <FolderOpenIcon />, Component: ResumeManager },
  { key: "Vaccination", label:"Vaccination", icon:  <VaccinesOutlinedIcon />, Component: VaccinationDetails}
];

const componentMap = sections.reduce((acc, s) => {
  acc[s.key] = s.Component;
  return acc;
}, {});

export default function NurseProfileSidebarLayout() {
  const { tabKey } = useParams();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();

  const activeKey = sections.some((s) => s.key === tabKey) ? tabKey : "general";
  const CurrentComponent = componentMap[activeKey];

  const handleSidebarClick = (key) => navigate(`/nurse/profile/${key}`);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        height: "100vh",
       m: isMobile || isTablet ? 2 : 3,
        gap: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: 320,
          flexShrink: 0,
          borderRadius: "12px",
          border: `1.5px solid ${theme.palette.primary.light1}`,
          bgcolor: "white",
          display: { xs: "none", md: "block" },
        
          py: 1,
        }}
      >
        <Box sx={{height: "100%", overflowY: "auto"}}>
        {sections.map((section) => {
          const isActive = activeKey === section.key;
          return (
            <Box
              key={section.key}
              onClick={() => handleSidebarClick(section.key)}
              sx={{
                px: 3,
                py: 1.8,
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                borderLeft: isActive
                  ? `4px solid ${theme.palette.primary.main}`
                  : "4px solid transparent",
                backgroundColor: isActive ? theme.palette.primary.light3 : "transparent",
                transition: "0.25s",
                "&:hover": { backgroundColor: theme.palette.grey[100] },
              }}
            >
              <Box sx={{ color: isActive ? theme.palette.primary.main : theme.palette.grey[700] }}>
                {section.icon}
              </Box>

              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? theme.palette.primary.main : theme.palette.grey[800],
                }}
              >
                {section.label}
              </Typography>
            </Box>
          );
        })}
        </Box>
      </Box>

      {/* Mobile Horizontal Sidebar */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 1,
          borderRadius: "12px",
          border: `1.5px solid ${theme.palette.primary.light3}`,
          bgcolor:theme.palette.background.paper,
          p: 1,
        minHeight: "auto",
height: "fit-content",
          // pb:5,
          // pt:2
          
        }}
      >
        {sections.map((section) => {
          const isActive = activeKey === section.key;
          return (
            <Box
              key={section.key}
              onClick={() => handleSidebarClick(section.key)}
              sx={{
                px: 2,
                py: 1.4,
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                borderBottom: isActive
                  ? `3px solid ${theme.palette.primary.main}`
                  : "3px solid transparent",
                transition: "0.25s",
              }}
            >
              <Box sx={{ color: isActive ? theme.palette.primary.main : theme.palette.grey[700] }}>
                {section.icon}
              </Box>
              <Typography sx={{ fontSize: "14px", fontWeight: isActive ? 600 : 500 }}>
                {section.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ flex:1, width: "100%",height:'100%', scrollbarWidth:'none',  overflowY: "auto", }}>
        <Box sx={{  borderRadius: "12px",
          border: `1.5px solid ${theme.palette.primary.light1}`,
          bgcolor:theme.palette.background.paper, p:3,boxShadow:shadows[1],
          height: "100%", 
    overflowY: "auto",
    scrollbarWidth:'none'
     }}>
          {CurrentComponent ? <CurrentComponent /> : <Typography>404: Profile Section Not Found</Typography>}
        </Box>
      </Box>
    </Box>
  );
}
