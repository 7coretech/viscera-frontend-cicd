import React from "react";
import { Box, Typography, Button, Stack, Card } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Facebook, Twitter, LinkedIn, Link as LinkIcon, QrCode2 as QrCodeIcon } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { QRCodeCanvas } from "qrcode.react"; // ✅ add this package
import theme from "src/config/theme";

export default function JobShare() {
  const { enqueueSnackbar } = useSnackbar();
  const { search } = useLocation();
  const plan = new URLSearchParams(search).get("plan") || "basic";

  const jobURL = "https://visceraconnect.com/job/12345";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jobURL);
    enqueueSnackbar("Job link copied to clipboard!", { variant: "success" });
  };

  const handleShare = (platform) => {
    const encoded = encodeURIComponent(jobURL);
    const message = encodeURIComponent("Check out this nursing job opportunity!");
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      twitter: `https://twitter.com/intent/tweet?url=${encoded}&text=${message}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    };
    window.open(urls[platform], "_blank");
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ mb: 2, color: theme.palette.accent.main }}
      >
        Job Posted Successfully 🎉
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        You selected the <strong>{plan}</strong> plan. Share your job or scan the QR code below.
      </Typography>

      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          py: 3,
          borderRadius: 3,
          boxShadow: `0 0 0 2px ${theme.palette.accent.light}`,
          "&:hover": { boxShadow: `0 0 10px ${theme.palette.accent.main}33` },
          transition: "0.3s",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <QRCodeCanvas
            value={jobURL}
            size={180}
            bgColor="#ffffff"
            level="H"
            includeMargin
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Scan to view job details
          </Typography>
        </Box>

        <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Facebook />}
            onClick={() => handleShare("facebook")}
          >
            Facebook
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<LinkedIn />}
            onClick={() => handleShare("linkedin")}
          >
            LinkedIn
          </Button>
          <Button
            variant="contained"
            startIcon={<Twitter />}
            onClick={() => handleShare("twitter")}
            sx={{
              backgroundColor: "#000 !important",
              color: "#fff !important",
              border: "1px solid #000",
              "&:hover": {
                backgroundColor: "#000 !important",
                color: "#fff !important",
              },
            }}
          >
            X
          </Button>
          <Button
            variant="outlined"
            startIcon={<LinkIcon />}
            onClick={handleCopy}
            sx={{
              borderColor: theme.palette.accent.main,
              color: theme.palette.accent.main,
              "&:hover": {
                backgroundColor: theme.palette.accent.light,
                borderColor: theme.palette.accent.main,
              },
            }}
          >
            Copy URL
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
