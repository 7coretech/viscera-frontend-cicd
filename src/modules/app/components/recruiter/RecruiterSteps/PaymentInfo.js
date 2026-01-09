import React from 'react';
import { Box, Grid, TextField, Button, Typography, useTheme, Divider } from '@mui/material';
import { FormHeaderContainer, FormLabel } from 'src/modules/app/utility/Styles';
import InputComponent from 'src/components/shared/Form/Input';
export default function PaymentInformationForm() {
  const theme = useTheme();
  return (
    <>
      <Typography sx={{ ...theme.typography.h2, mb: 1 }}>Payment Information</Typography>
      <Typography
        sx={{
          ...theme.typography.smallRegular,
          color: theme.palette.gery.darkGray,
          mb: 1,
        }}
      >
        Provide your payment details securely to proceed.
      </Typography>
      <Divider sx={{mb:2}}/>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputComponent label="Card Number" fullWidth variant="outlined" />
        </Grid>

        {/* Expiry + CVV */}
        <Grid item xs={12} sm={6}>
          <InputComponent label="Expiry Date" fullWidth variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputComponent label="CVV" fullWidth variant="outlined" />
        </Grid>

        {/* Cardholder Name */}
        <Grid item xs={12}>
          <InputComponent label="Cardholder Name" fullWidth variant="outlined" />
        </Grid>
      </Grid>
    </>
  );
}
