import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { palette, shadows, typography } from "src/config/theme";
import { Avatar, Typography, alpha } from "@mui/material";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import theme from 'src/config/theme';

export const StyledBox = styled(Box)({
  backgroundColor: palette.gery.white,
  height: '108px',
  padding: '0 32px',
  borderBottom: `1px solid ${alpha(palette.gery.black, 0.102)}`,
  boxShadow: shadows[3],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    height: '80px',
    padding: '0 20px',
  },
});
export const GreetingBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '323px',
  // height: '68px',
});

export const GreetingBoxTypography1 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h1,
  color: theme.palette.gery.black,
  [theme.breakpoints.down('md')]: {
    ...theme.mobileTypography?.h2,
  },
}));

export const GreetingBoxTypography2 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  color: alpha(theme.palette.gery.black, 0.7),
  [theme.breakpoints.down('md')]: {
    ...theme.mobileTypography?.body2,
  },
}));


export const ThreeContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  // width: '699px',
  height: '52px'
})
export const Box1 = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '28px',
  // width: '332px',
  height: '52px'
})
export const FilterIconContainer = styled(Avatar)({
  backgroundColor: palette.primary.light3,
  width: '40px',
  height: '40px',
  borderRadius: '30px',
  border: `1px solid ${palette.primary.light1}`,
  cursor: 'pointer',

})
export const FilterIcon = styled(Avatar)({
  position: 'relative',
  width: '24px',
  height: '24px',
})
export const SearchBox = styled(Box)({
  padding: '10px 18px',
  border: `1px solid ${alpha(palette.gery.black, 0.14)}`,
  borderRadius: '12px',
  width: '280px',
  height: '52px',
  backgroundColor: palette.gery.white,
  boxShadow: shadows[1],
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
})
export const SearchIcon = styled(Avatar)({
  position: 'relative',
  width: '24px',
  height: '24px',
})


export const Box2 = styled(Box)({
  display: 'flex',
  gap: '16px',
  // width: '327px',
  height: '52px',
  alignItems: 'center'
})
export const ToggleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '104px',
  height: '52px',
  borderRadius: '12px',
  backgroundColor: palette.gery.white,
  boxShadow: shadows[1],
})
export const ToggleBox1 = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCardView',
})(({ theme, isCardView }) => ({
  width: '52px',
  height: '52px',
  backgroundColor: isCardView ? theme.palette.gery.white : theme.palette.primary.light3,
  border: `1px solid ${theme.palette.primary.light1}`,
  borderRight: '0px',
  borderTopLeftRadius: '12px',
  borderBottomLeftRadius: '12px',
  padding: '12px 14px',
  cursor: 'pointer',
}));

export const ToggleBox2 = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCardView',
})(({ theme, isCardView }) => ({
  width: '52px',
  height: '52px',
  backgroundColor: isCardView ? theme.palette.primary.light3 : theme.palette.gery.white,
  border: `1px solid ${theme.palette.primary.light1}`,
  borderLeft: "0px",
  borderTopRightRadius: '12px',
  borderBottomRightRadius: '12px',
  padding: '12px 14px 12px 14px',
  cursor: 'pointer'
}));

export const TableViewIcon = styled(Avatar)({
  width: '24px',
  height: '24px',
  color: theme.palette.primary.main
})
export const CardViewIcon = styled(Avatar)({
  width: '24px',
  height: '24px',
})
export const SwitchContainer = styled(Box)({
  // display: 'flex',
  // alignItems: 'center',
  // width: '30%',
  // height: '46.74px',
  // position: 'relative',
  // left: '65%',
  // bottom: 60,
  // border: '2px solid #ffffff',
  // borderRadius: '4px',
});

export const CloseTypography = styled(Typography)({
  // color: '#ffffff',

  // position: 'relative',
  // left: '10%'
});

export const OpenTypography = styled(Typography)({
  // color: '#ffffff',
  // marginRight: '10%',
  // position: 'relative',
  // left: '40%'
});
//PatientInfo.js

export const PatientName = styled(Typography)({
  color: palette.primary.main,
  marginLeft: '10%',
  position: 'relative',
  top: -20,
  fontWeight: 'bold',



})
export const AddressName = styled(Typography)({
  color: '#B7B7B7',
  marginLeft: '10%',
  position: 'relative',
  bottom: 20

})

export const OpdBox = styled(Box)({
  border: '2px solid #0957DE',
  height: '7%',
  width: '35%',
  marginLeft: '60%',
  borderRadius: 5,
  position: 'relative',
  bottom: 60

})
export const OpdName = styled(Typography)({
  color: '#0957DE',
  marginLeft: '5%',
  position: 'relative',
  top: '25%'
})

export const OPdPerfomance = styled(Typography)({
  color: '#0957DE',
  marginLeft: '45%',
  position: 'relative',
  bottom: 67,
})

// Notes.js

export const NotesBox = styled(Box)({
  width: '79.5%',
  borderRadius: '16px 0px 0px 0px',
  padding: '16px',
  gap: '8px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const StyledNotificationsIcon = styled(NotificationsActiveOutlinedIcon)({
  marginRight: '8px',
  color: palette.primary.main,
  position: 'relative', bottom: 10, left: 10

});
//  Action .js

export const StylesBox = styled(Box)({
  border: `2px solid ${theme.palette.gray}`,
  borderRadius: 8,
  width: '90%',
  height: '75%'
});

export const StylesTypography = styled(Typography)({
  fontSize: '20px',
  fontWeight: '400',
  position: 'relative',
  bottom: 30,
  left: '20%'
});
export const StyleTypography = styled(Typography)({

  position: 'relative',
  bottom: 30,
  left: "20%"
});

//Allpatient.js

// export const PatientBox = styled(Box)({

//   backgroundColor: palette.white,
//   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
//   height: '117%',
//   width: '30%',
//   borderRadius: '16px', 
//   position: 'relative',
// bottom:684,
// left:'85%' 
// });

// export const PatientItem = styled(Box)({
//   display: 'flex',
//   alignItems: 'center', 
//   backgroundColor: palette.grey,
//   borderRadius: '8px',
//   padding: '4px',
//   marginBottom: '8px', 
// });

// export const PatientAvatar = styled(Avatar)({
//   width: '30px',
//   height: '30px',
//   borderRadius:'50%',
//   marginRight: '16px'
// })
//  Inafomation.js

export const PatientInfoBox = styled(Box)({
  backgroundColor: palette.white,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  height: '15vh',
  width: '82%',
  borderRadius: '16px',
  position: 'relative',
  top: 20

})

export const InfoTypography = styled(Typography)({
  marginBottom: 10,
  color: palette.primary.main
})


export const DataTypography = styled(Typography)({

  color: '#B7B7B7',
  marginTop: 40
})

export const ButtonAvatar = styled(Avatar)({
  width: '40px',
  height: '40px',
  backgroundColor: palette.primary.main,
  cursor: 'pointer',
})