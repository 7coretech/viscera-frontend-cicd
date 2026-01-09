import { Avatar, Box, Typography, alpha } from '@mui/material';
import React from 'react';
import { ReactComponent as Danger } from '../../../../assets/images/danger.svg';
import theme from 'src/config/theme';
import ButtonComponent from 'src/components/shared/Button';
import { ReactComponent as Add } from '../../../../assets/images/add-square.svg';
import useResponsive from 'src/components/hooks/useResponsive';

const NoDataFound = ({

    title = "No Appointments Found!",
    buttonText = "Add Appointment",
    showButton = true,
    onClick = () => { },
    buttonSx = {},
    description = (
        <>
            No Data to Showcase <br />
            <span style={{ color: theme.palette.gery.black }}>Click “Add”</span> Button to Add Data!
        </>
    ),
    disabled = false

}) => {
    const { isMobile, isDesktop, isTablet } = useResponsive();
    return (
        <Box
            sx={{
                width: '279px',
                height: '264px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: isMobile || isTablet ? '10px' : '17px',
                flexShrink: 0,
                flexDirection: 'column'
            }}
        >

            <Avatar sx={{
                width: 56,
                height: 56,
                bgcolor: theme.palette.primary.light3,
                border: `1px solid ${theme.palette.primary.light1}`,
                boxShadow: theme.shadows[1], color: theme.palette.primary.main,
                [theme.breakpoints.down('md')]: {
                    width: '64px',
                    height: '64px'
                },
            }}>
                <Danger width="28px" height="28px" />
            </Avatar>


            <Typography variant='h2' sx={{
                color: theme.palette.gery.black,
                textAlign: 'center',
                [theme.breakpoints.down('md')]: {
                    ...theme.mobileTypography.h2
                },
            }}>
                {title}
            </Typography>

            {/* Static Description */}
            {/* <Typography variant='h6' sx={{ color: alpha(theme.palette.gery.black, 0.70), textAlign: 'center' }}>
                No Data to Showcase <br />
                <span style={{ color: theme.palette.gery.black }}>Click “Add”</span> Button to Add Data!
            </Typography> */}
            <Typography variant='h6' sx={{
                color: alpha(theme.palette.gery.black, 0.70),
                textAlign: 'center',
                [theme.breakpoints.down('md')]: {
                    ...theme.mobileTypography.body1
                },
            }}>
                {description}
            </Typography>

            {showButton && (
                <ButtonComponent
                 disabled={disabled}
                    variant="outlined"
                    startIcon={<Add width={isMobile || isTablet ? 18 : 24}
                        height={isMobile || isTablet ? 18 : 24}

                        sx={{
                            color: theme.palette.primary.main,

                        }} />}
                    sx={{
                        borderRadius: '12px',
                        boxShadow: theme.shadows[1],
                        bgcolor: theme.palette.gery.white,
                        padding: '10px 18px',
                        ...((isMobile || isTablet) ? theme.mobileTypography.h6 : theme.typography.h5),
                        ...buttonSx,

                    }}
                    onClick={onClick}
                >
                    {buttonText}
                </ButtonComponent>
            )}


        </Box>
    );
};

export default NoDataFound;
