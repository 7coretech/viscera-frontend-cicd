import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Success from './Success';
import Error from './Error';
import Info from './Info';
import Warning from './Warning';

function SnackbarCloseButton({ snackbarKey }) {
    const { closeSnackbar } = useSnackbar();

    return (
        <IconButton onClick={() => closeSnackbar(snackbarKey)}>
            <CloseIcon />
        </IconButton>
    );
}

const Toast = (props) => {
    return (
        <SnackbarProvider
            maxSnack={4}
            dense
            autoHideDuration={2500}
            action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
            Components={{
                success: Success,
                error: Error,
                info: Info,
                warning: Warning,
            }}
        >
            {props.children}
        </SnackbarProvider>
    );
};

export default Toast;