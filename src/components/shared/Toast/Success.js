import React, { useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const useStyles = makeStyles(({ palette }) => ({
    root: {
        '@media (min-width:600px)': {
            minWidth: '344px !important',
        },
    },
    card: {
        width: '100%',
        backgroundColor: palette.mode === 'light' ? '#EAF2EA' : '#082036',
        padding: '0px 4px',
        border: '1px solid #2E7D3225',
    },
}));

const Success = ({ id, ...props }, ref) => {
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
        closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
        <SnackbarContent ref={ref} className={classes.root}>
            <Card disabled className={classes.card} elevation={0}>
                <CardActions>
                    <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                            <CheckCircleIcon sx={{ fill: '#2E7D32' }} />
                            <Typography color="textSecondary" variant="body2">
                                {props.message}
                            </Typography>
                        </Stack>
                        <IconButton size="small" className={classes.expand} onClick={handleDismiss}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </CardActions>
            </Card>
        </SnackbarContent>
    );
};

export default React.forwardRef(Success);