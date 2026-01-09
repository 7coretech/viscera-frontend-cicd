import React, { useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles(({ palette }) => ({
    root: {
        '@media (min-width:600px)': {
            minWidth: '344px !important',
        },
    },
    card: {
        width: '100%',
        // backgroundColor: '#D3EAFD',
        backgroundColor: palette.mode === 'light' ? '#D3EAFD' : '#082036',
        padding: '0px 4px',
        border: '1px solid #2196F325',
    },
}));

const Info = ({ id, ...props }, ref) => {
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
                            <InfoIcon sx={{ fill: '#2196F3' }} />
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

export default React.forwardRef(Info);