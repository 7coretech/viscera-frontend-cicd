import { styled } from "@mui/material/styles";
import theme from "src/config/theme";
import { palette, shadows, typography } from "src/config/theme";
import { Avatar, Box, Chip, Typography, alpha } from "@mui/material";
import ButtonComponent from "src/components/shared/Button";
import AppMenu from "src/components/shared/Menu";



export const TabsContainer = styled(Box)({
    // backgroundColor: 'red',
    // height: '68px',
    padding: '0px 0px 0 0px',
    borderBottom: `1px solid ${alpha(palette.gery.black, 0.1)}`,
    boxShadow: shadows[3],
    backgroundColor: palette.gery.white,
    display: 'flex',
    alignItems: 'flex-end'
})
export const TabsData = styled(Box)({
    // backgroundColor: palette.gery.extraLightGray,
    padding: '0px 30px',
    overflowY: 'auto',
    height: '400px',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    [theme.breakpoints.down('md')]: {
        padding: '0',
    }
});

export const HeaderPart = styled(Box)({
    backgroundColor: theme.palette.primary.light3,
    color: theme.palette.gery.black,
    ...theme.typography.h3,
    borderBottom: `1px solid ${theme.palette.primary.light1} !important`,
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    [theme.breakpoints.down('md')]: {
        ...theme.mobileTypography.h4,
        height: '59px',
        padding: '20px 16px'
    }

})

export const BoxContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    height: '100px',
})
export const ProfileContainer = styled(Box)({
    width: '80px',
    height: '144px',
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flexStart',
    gap: '-16px',
    position: 'relative'
})

export const ProfileAvatar = styled(Avatar)({
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    padding: '10px',
    backgroundColor: theme.palette.primary.light3,
    fontSize: '44px',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
        width: '64px',
        height: '64px',
        borderRadius: '12px',
        padding: '10px',
        backgroundColor: palette.primary.light3,
        color: palette.primary.main,
        ...theme.mobileTypography.h1
    }
})

export const ProfileIcon = styled(Avatar)({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: `1.5px solid ${theme.palette.gery.white}  `,
    backgroundColor: theme.palette.primary.light3,
    color: theme.palette.primary.main,
    position: 'absolute',
    bottom: 45,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
        bottom: 55,
    }
})
export const FooterPart = styled(Box)({
    height: "100px",
    padding: '24px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px',
    borderTop: `1px solid ${theme.palette.primary.light1} !important`,
    [theme.breakpoints.down('md')]: {

        height: '80px !important',
        padding: '20px 16px'
    }
})

export const CancelButton = styled(ButtonComponent)({

})

export const SaveButton = styled(ButtonComponent)({
    width: '104px',
    height: '52px',
    borderRadius: '12px',
    padding: '10px 18px',
    backgroundColor: palette.primary.main,
    boxShadow: shadows[1],
    border: `1px solid ${alpha(palette.gery.black, 0.14)}`,
    color: palette.gery.white,
    '&:hover': { color: palette.primary.main },
    [theme.breakpoints.down('md')]: {
        ...theme.mobileTypography.h6,
        width: '78px',
        height: '40px',
        borderRadius: '8px',
        padding: '10px 12px'
    }
})


