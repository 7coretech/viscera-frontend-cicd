import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useParams } from "react-router-dom";

export default function ChatPage() {
  const theme = useTheme();
  const { state: userState } = useLocation();
  const { id } = useParams();

  const fallbackUser = { id, name: `User ${id}` };
  const user = userState || fallbackUser;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, type: "received", text: "Hello, good morning!", time: "10:00 AM" },
    { id: 2, type: "sent", text: "Good morning! How can I help you?", time: "10:01 AM" },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "sent",
        text: input,
        time: "Now",
      },
    ]);

    setInput("");
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // prevents page scroll
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: 0,
        }}
      >
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          {user?.name?.charAt(0)}
        </Avatar>

        <Typography sx={{ ...theme.typography.h3 }}>{user?.name}</Typography>
      </Paper>

      {/* Scrollable Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </Box>

      {/* Send Box */}
      <Paper
        elevation={3}
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: 0,
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: theme.palette.background.paper,
            },
          }}
        />

        <IconButton
          sx={{
            height: 45,
            width: 45,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.gery.white,
            "&:hover": { bgcolor: theme.palette.action.blueDark },
          }}
          onClick={sendMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

/* Message Bubble */
const MessageBubble = ({ msg }) => {
  const theme = useTheme();
  const isSent = msg.type === "sent";

  return (
    <Stack direction="column" alignItems={isSent ? "flex-end" : "flex-start"}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          maxWidth: "70%",
          borderRadius: 2,
          bgcolor: isSent
            ? theme.palette.primary.main
            : theme.palette.primary.light4,
          color: isSent ? theme.palette.gery.white : theme.palette.text.primary,
          border: !isSent && `2px solid ${theme.palette.primary.light2}`,
        }}
      >
        <Typography sx={{ ...theme.typography.body1 }}>{msg.text}</Typography>
      </Box>

      <Typography
        sx={{
          ...theme.typography.smallRegular,
          mt: 0.5,
          color: theme.palette.text.secondary,
        }}
      >
        {msg.time}
      </Typography>
    </Stack>
  );
};
