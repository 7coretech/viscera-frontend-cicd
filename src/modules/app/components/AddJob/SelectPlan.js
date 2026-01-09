import React from "react";
import { Box, Card, Grid, Typography, Button, Stack } from "@mui/material";
import theme from "src/config/theme";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "$29",
    desc: "Post 1 job, valid for 15 days",
    features: ["1 job listing", "Basic visibility", "Email support"],
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: "$59",
    desc: "Post up to 3 jobs, valid for 30 days",
    features: ["3 job listings", "Priority visibility", "Email + Chat support"],
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "$99",
    desc: "Unlimited postings, valid for 60 days",
    features: ["Unlimited jobs", "Top visibility", "Dedicated account manager"],
  },
];

export default function SelectPlan() {
  const navigate = useNavigate();

  const handleSelect = (planId) => {
    navigate('/recruiter/jobform');
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={600} sx={{ mb: 1, color: theme.palette.error.main }}
>
        No Active Credits Found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Please choose a plan below to post your job.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: theme.shadows[3],
                "&:hover": { boxShadow: theme.shadows[6], transform: "translateY(-3px)" },
                transition: "0.3s",
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                {plan.name}
              </Typography>
              <Typography variant="h3" color="primary" sx={{ my: 2 }}>
                {plan.price}
              </Typography>
              <Typography variant="smallRegular" sx={{ mb: 2 }}>
                {plan.desc}
              </Typography>
              <Stack spacing={1} sx={{ mb: 3 }}>
                {plan.features.map((f, i) => (
                  <Typography key={i} variant="smallRegular">
                    • {f}
                  </Typography>
                ))}
              </Stack>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleSelect(plan.id)}
              >
                Select {plan.name}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
