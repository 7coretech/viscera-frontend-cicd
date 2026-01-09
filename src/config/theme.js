import { createTheme } from '@mui/material/styles';

export const colors = {
  // Primary Colors
  // primaryMain: '#254287',
  primaryMain:'#0141C5',
  // primaryMain:'#3ACBE8',
  primaryLight1: '#DBE1F4',
  primaryLight2: '#E3E7F7',
  primaryLight3: '#EFF1FB',
  primaryLight4: '#F6F7FC',
  primaryLight5: '#F8F9FD',

  // Accent (Red - used sparingly)
  accentRed: '#E31E24',
  accentLightRed: '#FDE9EA',

  // Action Colors (Refined and minimal)
  actionBlueDark: '#1E3A75',
  actionBlueLight: '#3E5DB3',
  actionGreen: '#007A4D',
  actionRed: '#E31E24',

  // Action Light Colors
  actionLightBlue: '#E6EBFA',
  actionLightGreen: '#E6F4EA',
  actionLightRed: '#FDE9EA',

  // Neutral / Gray Colors
  black: '#000000',
  darkGray: '#4D4D4D',
  mediumGray: '#CFCFCF',
  lightGray: '#E6E6E6',
  extraLightGray: '#FAFAFA',
  white: '#FFFFFF',
};

export const typography = {
  fontFamily: 'Google Sans, Arial, sans-serif',

  h1: { fontSize: '26px', lineHeight: '33px', fontWeight: 500 },
  h2: { fontSize: '24px', lineHeight: '31px', fontWeight: 500 },
  h3: { fontSize: '18px', lineHeight: '23px', fontWeight: 700 },
  h4: { fontSize: '18px', lineHeight: '23px', fontWeight: 400 },
  h5: { fontSize: '17px', lineHeight: '22px', fontWeight: 500 },
  h6: { fontSize: '17px', lineHeight: '27px', fontWeight: 500 },
  body1: { fontSize: '17px', lineHeight: '22px', fontWeight: 400 },
  body2: { fontSize: '16px', lineHeight: '20px', fontWeight: 700 },
  small: { fontSize: '16px', lineHeight: '20px', fontWeight: 500 },
  smallRegular: { fontSize: '16px', lineHeight: '20px', fontWeight: 400 },
};

export const mobileTypography = {
  fontFamily: 'Google Sans, Arial, sans-serif',

  h1: { fontSize: '20px', lineHeight: '25px', fontWeight: 500 },
  h2: { fontSize: '18px', lineHeight: '22.9px', fontWeight: 500 },
  h3: { fontSize: '16px', lineHeight: '20.4px', fontWeight: 500 },
  h4: { fontSize: '15px', lineHeight: '19.1px', fontWeight: 700 },
  h5: { fontSize: '15px', lineHeight: '19.1px', fontWeight: 500 },
  h6: { fontSize: '14px', lineHeight: '17.8px', fontWeight: 500 },
  body1: { fontSize: '14px', lineHeight: '21px', fontWeight: 500 },
  body2: { fontSize: '14px', lineHeight: '17.8px', fontWeight: 400 },
  small: { fontSize: '14px', lineHeight: '21px', fontWeight: 400 },
  smallRegular: { fontSize: '13px', lineHeight: '16.5px', fontWeight: 400 },
};

export const shadows = [
  'none',
  '0px 0px 26px 0px #00000008',
  '4px 0px 20px 0px #00000005',
  '0px 4px 20px 0px #00000005',
  '0px 0px 40px 0px #00000029',
];

export const palette = {
  mode: 'light',

  primary: {
    main: colors.primaryMain,
    light1: colors.primaryLight1,
    light2: colors.primaryLight2,
    light3: colors.primaryLight3,
    light4: colors.primaryLight4,
    light5: colors.primaryLight5,
  },

  accent: {
    main: colors.accentRed,
    light: colors.accentLightRed,
  },

  action: {
    blueDark: colors.actionBlueDark,
    blueLight: colors.actionBlueLight,
    green: colors.actionGreen,
    red: colors.actionRed, // used only for delete/error actions
  },

  actionLight: {
    blue: colors.actionLightBlue,
    green: colors.actionLightGreen,
    red: colors.actionLightRed,
  },

  gery: {
    black: colors.black,
    dark: colors.darkGray,
    medium: colors.mediumGray,
    light: colors.lightGray,
    extraLight: colors.extraLightGray,
    white: colors.white,
  },

  text: {
    primary: colors.black,
    secondary: colors.darkGray,
  },

  background: {
    default: colors.extraLightGray,
    paper: colors.white,
  },
};

export const breakPoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
  xxs: 443,
};

export const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
        fontWeight: 500,
        '&.MuiButton-containedPrimary': {
          backgroundColor: colors.primaryMain,
          color: colors.white,
          '&:hover': {
            backgroundColor: colors.actionBlueDark,
          },
        },
        '&.MuiButton-containedError': {
          backgroundColor: colors.accentRed,
          color: colors.white,
          '&:hover': {
            backgroundColor: '#C4161B',
          },
        },
      },
    },
  },
};

const theme = createTheme({
  palette,
  typography,
  mobileTypography,
  components,
  shadows,
  breakpoints: { values: breakPoints },
});

export default theme;

export const drawerWidth = 280;
