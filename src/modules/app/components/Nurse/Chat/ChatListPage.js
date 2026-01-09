import React from "react";
import { Box, Paper, Avatar, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ChatListPage() {
  const theme = useTheme();
  const navigate = useNavigate();

const users = [
  {
    id: 1,
    name: "Alex Johnson",
    lastMessage: "Hello, good morning!",
    time: "10:00 AM",
  },
  {
    id: 2,
    name: "Priya Sharma",
    lastMessage: "Are you available tomorrow?",
    time: "09:45 AM",
  },
  {
    id: 3,
    name: "Rahul Verma",
    lastMessage: "Thanks, that helps!",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Maya Patel",
    lastMessage: "Let me check and update.",
    time: "08:22 AM",
  },
  {
    id: 5,
    name: "John Carter",
    lastMessage: "Sending the details now.",
    time: "Yesterday",
  },
  {
    id: 6,
    name: "Sneha Reddy",
    lastMessage: "Sure, will do.",
    time: "Sunday",
  },
  {
    id: 7,
    name: "Aarav Mehta",
    lastMessage: "Call me when you're free.",
    time: "11:30 AM",
  },
  {
    id: 8,
    name: "Emily Davis",
    lastMessage: "Thank you so much!",
    time: "08:10 PM",
  },
  {
    id: 9,
    name: "Kabir Singh",
    lastMessage: "Where should we meet?",
    time: "Yesterday",
  },
  {
    id: 10,
    name: "Zara Khan",
    lastMessage: "I'll join in 5 minutes.",
    time: "4:45 PM",
  },
  {
    id: 11,
    name: "David Miller",
    lastMessage: "Noted. Thanks!",
    time: "2:00 PM",
  },
  {
    id: 12,
    name: "Ananya Gupta",
    lastMessage: "Perfect, let's finalize.",
    time: "Monday",
  },
];


  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {users.map((user) => (
        <Paper
          key={user.id}
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            "&:hover": { bgcolor: theme.palette.primary.light5 },
          }}
          onClick={() =>
            navigate(`/nurse/chat/${user.id}`, { state: user })
          }
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {user.name.charAt(0)}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ ...theme.typography.h4 }}>
              {user.name}
            </Typography>

            <Typography
              sx={{
                ...theme.typography.smallRegular,
                color: theme.palette.text.secondary,
                mt: 0.5,
              }}
            >
              {user.lastMessage}
            </Typography>
          </Box>

          <Typography
            sx={{
              ...theme.typography.smallRegular,
              color: theme.palette.text.secondary,
            }}
          >
            {user.time}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
