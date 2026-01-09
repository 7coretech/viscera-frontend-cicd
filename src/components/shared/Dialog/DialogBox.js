import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ReactComponent as CloseIcon } from '../../../../src/assets/images/close-circle.svg';
import { ReactComponent as AddIcon } from '../../../../src/assets/images/add-square.svg';
import ButtonComponent from 'src/components/shared/Button';

import { useTheme } from "@mui/material/styles";

const DialogBox = ({ open, onClose, title, children, PaperProps, handleSubmit }) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose}
            PaperProps={{
                sx: {
                    ...PaperProps?.sx,
                    borderRadius: '12px',
                    margin: '10px',

                    "& .MuiDialog-paper": {
                        borderRadius: "12px",

                    },
                },
            }}
        >
            {/* <DialogTitle sx={{
                backgroundColor: theme.palette.primary.light3,
                color: theme.palette.gery.black,
                ...theme.typography.h3,
                border: `1px solid ${alpha(theme.palette.primary.light1)}`,
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '64px',
            }}>
                {title}
                <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
            </DialogTitle> */}


            <DialogContent dividers sx={{ padding: 0 }}>

                {children}

            </DialogContent>

            {/* <DialogActions sx={{
                height: "100px",
                padding: '24px 20px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '16px'
            }}>
                <ButtonComponent
                    variant="none"
                    startIcon={<CloseIcon sx={{ color: theme.palette.primary.main }} />}
                    onClick={onClose}
                >
                    Cancel
                </ButtonComponent>
                <ButtonComponent
                   type="submit"
                    variant="outlined"
                    startIcon={<AddIcon sx={{ color: theme.palette.primary.main }} />}
                    sx={{
                        width: '104px',
                        height: '52px',
                        borderRadius: '12px',
                        padding: '10px 18px',
                        bgcolor: theme.palette.primary.main,
                        boxShadow: theme.shadows[1],
                        border: `1px solid ${alpha(theme.palette.gery.black, 0.14)}`,
                        color: theme.palette.gery.white,
                        '&:hover': { color: theme.palette.primary.main },
                    }}
                    onClick={handleSubmit ? () => handleSubmit() : null}
                >
                    Save
                </ButtonComponent>
            </DialogActions> */}

        </Dialog>
    );
};

export default DialogBox;
