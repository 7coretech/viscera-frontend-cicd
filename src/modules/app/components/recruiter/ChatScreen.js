import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  Avatar,
  Stack,
  Button,
  TextField,
  Badge,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import theme from "src/config/theme";

const ChatScreen = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messageInput, setMessageInput] = useState("");

  // Mock data
  const conversations = [
    {
      id: 1,
      nurseName: "Sarah Johnson",
      lastMessage: "Looking forward to hearing from you!",
      nurseAvatar: "https://i.pravatar.cc/100?img=47",
      specialization: "ICU Nurse",
      experience: "3 years",
      unread: 2,
      jobContext: "ICU Nurse - NYU Langone",
      messages: [
        {
          id: 1,
          sender: "nurse",
          text: "Hello, I applied for the ICU Nurse role.",
          timestamp: "10:20 AM",
        },
        {
          id: 2,
          sender: "employer",
          text: "Hi Sarah, thanks for applying! Can you confirm availability?",
          timestamp: "10:22 AM",
        },
        {
          id: 3,
          sender: "nurse",
          text: "Yes, I’m available to join in 15 days.",
          timestamp: "10:24 AM",
        },
      ],
    },
    {
      id: 2,
      nurseName: "David Lee",
      lastMessage: "Can join from next month.",
      nurseAvatar: "https://i.pravatar.cc/100?img=12",
      specialization: "ER Nurse",
      experience: "5 years",
      unread: 0,
      jobContext: "ER Nurse - City Hospital",
      messages: [
        {
          id: 1,
          sender: "nurse",
          text: "I saw the ER Nurse job post, is it still open?",
          timestamp: "09:45 AM",
        },
        {
          id: 2,
          sender: "employer",
          text: "Yes, David. Can you share your joining timeline?",
          timestamp: "09:47 AM",
        },
        {
          id: 3,
          sender: "nurse",
          text: "I can join from 1st of next month.",
          timestamp: "09:49 AM",
        },
      ],
    },
  ];

  const nurse = conversations[selectedConversation];

  const handleSend = () => {
    if (!messageInput.trim()) return;
    // placeholder: integrate with API/socket later
    // for now just clear input
    setMessageInput("");
  };

  return (
    <Grid
      container
      sx={{
        height: "85vh",
        border: `1px solid ${theme.palette.gery.mediumGray}`,
        borderRadius: 2,
        background: theme.palette.background.default,
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Grid item xs={3} sx={{ borderRight: `1px solid ${theme.palette.gery.lightGray}` }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Conversations
          </Typography>
        </Box>
        <Divider />
        <Stack>
          {conversations.map((conv, index) => (
            <Box
              key={conv.id}
              onClick={() => setSelectedConversation(index)}
              sx={{
                p: 2,
                cursor: "pointer",
                "&:hover": { background: theme.palette.primary.light5 },
                backgroundColor: index === selectedConversation ? theme.palette.primary.light3 : "transparent",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Badge
                  color="primary"
                  badgeContent={conv.unread}
                  invisible={!conv.unread}
                  sx={{ "& .MuiBadge-badge": { fontSize: 11, minWidth: 18, height: 18 } }}
                >
                  <Avatar src={conv.nurseAvatar} />
                </Badge>

                <Box sx={{ overflow: "hidden" }}>
                  <Typography variant="small" sx={{ fontWeight: 600, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                    {conv.nurseName}
                  </Typography>
                  <Typography variant="smallRegular" color="text.secondary" sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                    {conv.lastMessage}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {conv.jobContext}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Grid>

      {/* Chat Window */}
      <Grid item xs={6}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.gery.lightGray}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{nurse.nurseName}</Typography>
              <Typography variant="smallRegular" color="text.secondary">
                {nurse.specialization} • {nurse.experience} • {nurse.jobContext}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip label="Applied" size="small" sx={{ borderRadius: 1 }} />
              <Chip label="Message" size="small" sx={{ borderRadius: 1 }} />
            </Stack>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: theme.palette.background.default }}>
            {nurse.messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "employer" ? "flex-end" : "flex-start",
                  mb: 1.25,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    backgroundColor: msg.sender === "employer" ? theme.palette.primary.light1 : theme.palette.gery.extraLightGray,
                    color: msg.sender === "employer" ? theme.palette.primary.main : theme.palette.text.primary,
                    maxWidth: "72%",
                    borderRadius: 2,
                    boxShadow: theme.shadows[0],
                  }}
                >
                  <Typography variant="smallRegular" sx={{ whiteSpace: "pre-wrap" }}>{msg.text}</Typography>
                  <Typography variant="caption" sx={{ display: "block", mt: 0.5, color: theme.palette.gery.darkGray }}>
                    {msg.timestamp}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Quick replies */}
          <Box sx={{ px: 2, pb: 1 }}>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" onClick={() => setMessageInput("Available for interview")}>
                Quick: Available
              </Button>
              <Button variant="outlined" size="small" onClick={() => setMessageInput("Can join in 15 days")}>
                Quick: Join in 15d
              </Button>
              <Button variant="outlined" size="small" onClick={() => setMessageInput("Can we schedule an interview?")}>
                Quick: Schedule
              </Button>
            </Stack>
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.gery.lightGray}`, display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Type a message..."
              size="small"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              InputProps={{ sx: { borderRadius: 1 } }}
            />
            <Button variant="contained" sx={{ bgcolor: theme.palette.primary.main }} onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Right Sidebar */}
      <Grid item xs={3} sx={{ borderLeft: `1px solid ${theme.palette.gery.lightGray}`, p: 2 }}>
        <Avatar src={nurse.nurseAvatar} sx={{ width: 64, height: 64, mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{nurse.nurseName}</Typography>
        <Typography variant="smallRegular" color="text.secondary">{nurse.specialization}</Typography>
        <Typography variant="smallRegular" color="text.secondary">{nurse.experience} experience</Typography>

        <Divider sx={{ my: 2, borderColor: theme.palette.gery.mediumGray }} />

        <Stack spacing={1}>
          <Button variant="outlined" startIcon={<VisibilityIcon />}>
            View Resume
          </Button>
          <Button variant="outlined" color="success" startIcon={<CheckCircleOutlineIcon />}>
            Shortlist
          </Button>
          <Button variant="outlined" color="error" startIcon={<CancelOutlinedIcon />}>
            Reject
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="smallRegular" sx={{ mb: 1, fontWeight: 600 }}>Job context</Typography>
        <Typography variant="smallRegular" color="text.secondary">{nurse.jobContext}</Typography>
      </Grid>
    </Grid>
  );
};

export default ChatScreen;
