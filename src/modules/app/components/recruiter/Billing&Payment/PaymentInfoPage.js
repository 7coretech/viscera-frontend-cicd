import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Chip,
  Divider,
  useTheme,
  IconButton,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ButtonComponent from "src/components/shared/Button";

const PaymentInfoPage = () => {
  const theme = useTheme();
  const [balance, setBalance] = useState(3);

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "$29",
      credits: 1,
      desc: "Post 1 job, valid for 15 days",
      features: ["1 job listing", "Basic visibility", "Email support"],
    },
    {
      id: "standard",
      name: "Standard Plan",
      price: "$59",
      credits: 3,
      desc: "Post up to 3 jobs, valid for 30 days",
      features: ["3 job listings", "Priority visibility", "Email + Chat support"],
      featured: true
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "$99",
      credits: 10,
      desc: "Unlimited postings, valid for 60 days",
      features: ["Unlimited jobs", "Top visibility", "Dedicated account manager"],
    },
  ];

  const transactionHistory = [
    { id: 'INV-2025-001', date: 'Oct 24, 2025', item: 'Standard Plan', amount: '$59.00', status: 'Paid' },
    { id: 'INV-2025-002', date: 'Sep 12, 2025', item: 'Basic Plan', amount: '$29.00', status: 'Paid' },
    { id: 'INV-2025-003', date: 'Aug 05, 2025', item: 'Standard Plan', amount: '$59.00', status: 'Paid' },
  ];

  const handlePurchase = (plan) => {
    setBalance(prev => prev + plan.credits);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      
      {/* SECTION 1: Header & Quick Stats */}
      <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <Typography sx={{ ...theme.typography.h1, color: theme.palette.primary.main, mb: 0.5 }}>
            Billing & Payments
          </Typography>
          <Typography sx={{ ...theme.typography.body1, color: theme.palette.text.secondary }}>
            Manage your job posting credits and view your secure transaction history.
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
            <Paper sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', borderRadius: 2, boxShadow: theme.shadows[1], border: `1px solid ${theme.palette.primary.light1}` }}>
              <AccountBalanceWalletIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
              <Box>
                <Typography sx={{ ...theme.typography.smallRegular, color: theme.palette.text.secondary, fontSize: '12px' }}>AVAILABLE CREDITS</Typography>
                <Typography sx={{ ...theme.typography.h3, lineHeight: 1 }}>{balance} Credits</Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* SECTION 2: Pricing Plans */}
      <Box sx={{ mb: 6 }}>
        <Typography sx={{ ...theme.typography.h3, mb: 3 }}>Available Job Posting Packages</Typography>
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  position: 'relative',
                  border: plan.featured ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.gery.light}`,
                  boxShadow: plan.featured ? theme.shadows[4] : theme.shadows[1],
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows[4] }
                }}
              >
                {plan.featured && (
                  <Chip 
                    label="MOST POPULAR" 
                    color="primary" 
                    sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontWeight: 700, fontSize: '10px' }} 
                  />
                )}
                <Typography sx={{ ...theme.typography.h5, color: theme.palette.text.secondary, mb: 1 }}>{plan.name}</Typography>
                <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 2 }}>
                  <Typography sx={{ ...theme.typography.h1, fontSize: '36px', color: theme.palette.primary.main }}>{plan.price}</Typography>
                  <Typography sx={{ ...theme.typography.smallRegular, color: theme.palette.gery.dark }}>/ package</Typography>
                </Stack>
                <Typography sx={{ ...theme.typography.smallRegular, mb: 3, color: theme.palette.gery.dark }}>{plan.desc}</Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                <Stack spacing={2} sx={{ mb: 4, flexGrow: 1 }}>
                  {plan.features.map((feature, i) => (
                    <Stack key={i} direction="row" spacing={1} alignItems="center">
                      <CheckCircleIcon sx={{ fontSize: 18, color: theme.palette.action.green }} />
                      <Typography sx={{ ...theme.typography.smallRegular }}>{feature}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <ButtonComponent
                  variant={plan.featured ? "contained" : "outlined"}
                  fullWidth
                  onClick={() => handlePurchase(plan)}
                >
                  Purchase Credits
                </ButtonComponent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={3}>
    
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 2, height: '100%', border: `1px solid ${theme.palette.primary.light1}` }}>
            <Stack spacing={3}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <PaymentIcon color="primary" />
                  <Typography sx={{ ...theme.typography.h5 }}>Payment Method</Typography>
                </Stack>
                <Typography sx={{ ...theme.typography.smallRegular, color: theme.palette.gery.dark }}>
                  Update your credit card details and billing address securely through our Stripe portal.
                </Typography>
              </Box>
              <ButtonComponent 
                variant="outlined" 
                fullWidth 
                // onClick={() => window.open('https://billing.stripe.com', '_blank')}
                sx={{ borderColor: theme.palette.primary.light1 }}
              >
                Manage on Stripe <OpenInNewIcon sx={{ ml: 1, fontSize: 16 }} />
              </ButtonComponent>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, border: `1px solid ${theme.palette.primary.light1}`, overflow: 'hidden' }}>
            <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.palette.primary.light5 }}>
              <Typography sx={{ ...theme.typography.h5 }}>Transaction History</Typography>
              <Typography sx={{ ...theme.typography.small, color: theme.palette.primary.main, fontWeight: 600, cursor: 'pointer' }}>
                Download All (CSV)
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.primary.light4 }}>
                    <TableCell sx={{ ...theme.typography.body2, py: 1.5 }}>Invoice</TableCell>
                    <TableCell sx={{ ...theme.typography.body2 }}>Date</TableCell>
                    <TableCell sx={{ ...theme.typography.body2 }}>Plan</TableCell>
                    <TableCell sx={{ ...theme.typography.body2 }}>Amount</TableCell>
                    <TableCell sx={{ ...theme.typography.body2 }}>Status</TableCell>
                    <TableCell align="right" sx={{ ...theme.typography.body2 }}>Receipt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionHistory.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell sx={{ ...theme.typography.smallRegular, fontWeight: 500 }}>{row.id}</TableCell>
                      <TableCell sx={{ ...theme.typography.smallRegular }}>{row.date}</TableCell>
                      <TableCell sx={{ ...theme.typography.smallRegular }}>{row.item}</TableCell>
                      <TableCell sx={{ ...theme.typography.smallRegular, fontWeight: 600 }}>{row.amount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          size="small" 
                          sx={{ backgroundColor: theme.palette.actionLight.green, color: theme.palette.action.green, fontWeight: 700, borderRadius: 2 }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => alert('Opening Invoice PDF...')}>
                          <ReceiptLongIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentInfoPage;