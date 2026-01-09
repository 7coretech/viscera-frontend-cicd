import { Stack, Typography } from '@mui/material';
import React from 'react';

const NotAccessible = () => {
    return (
        <Stack alignItems="center" justifyContent="center">
            <Typography variant="h4" fontWeight={600}>
                Oops! You don't have permission to access this page.
            </Typography>
        </Stack>
    );
};

export default NotAccessible;