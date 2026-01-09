import React from "react";
import { Box, Card, Grid, Typography, Button, Stack, Divider } from "@mui/material";
import theme from "src/config/theme";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "src/components/shared/Button";

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
    <Box sx={{ textAlign: "left" }}>
      <Typography  sx={{...theme.typography.h2, mb: 1,}}
>
        No Active Credits Found
      </Typography>
      <Typography  sx={{
          ...theme.typography.smallRegular,
          color: theme.palette.gery.darkGray,
          mb: 1,
        }}>
        Please choose a plan below to post your job.
      </Typography>
<Divider sx={{mb:2}}/>
      <Grid container spacing={2} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                // boxShadow: theme.shadows[3],
                "&:hover": { boxShadow: theme.shadows[6], transform: "translateY(-3px)" },
                transition: "0.3s",
                border:`1px solid ${theme.palette.primary.light1}`,
                cursor:'pointer'
              }}
            >
              <Typography sx={{...theme.typography.h6}}>
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

              <ButtonComponent
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleSelect(plan.id)}
              >
                Select {plan.name}
              </ButtonComponent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
