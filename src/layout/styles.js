import { minHeight, padding, styled } from '@mui/system';
import images from 'src/config/images';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Box, alpha, Avatar } from '@mui/material';
import theme, { palette, shadows, typography } from 'src/config/theme';




// export const SidebarOnOffContainer = styled(Box)({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   position: 'absolute',
//   top: '56px',
//   left: '252px',
//   width: '56px',
//   height: '56px',
//   borderRadius: '40px',
//   padding: '10px',
//   backgroundColor: palette.primary.light3,
//   zIndex: '100000',
//   boxShadow: shadows[1],
// })
export const SidebarOnOffContainer = styled(Avatar)(({ isPermanentOpen }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: '56px',
  left: isPermanentOpen ? '252px' : '60px',
  width: '56px',
  height: '56px',
  borderRadius: '40px',
  padding: '10px',
  backgroundColor: palette.primary.light3,
  zIndex: '100000',
  boxShadow: shadows[1],
  transition: 'left 0.3s ease-in-out',
  color: palette.primary.main
}));

export const AuthContainer = styled(Box)({
  height:'100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
 minHeight: '100vh',
overflowX: 'hidden',

  

   [theme.breakpoints.down("md")]: {
    // overflowY: "auto",
    // alignItems: "center",  
    // minHeight:'100vh'
             overflowY:'auto'
  }
 
});

export const AuthBg = styled('div')({
  // marginTop: 60,
  flex: 1,
  borderRadius: 16,
  background: `url(${images.auth.authBg})`,
  minHeight: 'calc(100vh - 120px)',
  height: 'calc(100vh - 120px)',
  backgroundSize: 'cover',
  '& > .MuiGrid-root': {
    height: '100%',
  },
  // padding: 16,
});

export const Left = styled(Grid)({
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'space-around',
  // flexDirection: 'column',
  // position: 'relative',
   


});

export const Right = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AuthContent = styled(Box)({
  borderRadius: '0px',
  // backgroundColor:palette.gery.extraLight,
  width:'100%',
  overflow:'hidden',
  // padding: '50px',
  height:'100vh',
   [theme.breakpoints.down("md")]: {
    // padding: '20px',
    height:'100vh',
    overflowY:'auto'
   }
  
  
});

// export const Logo = styled('img')({});
// Logo.defaultProps = {
//   src: images.logoW,
//   width: '500px'
// };

export const Logo = styled('img')(({ theme }) => ({
  width: '500px',
  [theme.breakpoints.down('md')]: {
    width: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '200px',
  },
  // width: '100%',
  // maxWidth: '500px',
  // height: 'auto'

}));

Logo.defaultProps = {
  src: images.logoW,
};

export const Icon1 = styled('img')({
  position: 'absolute',
  bottom: '-10px',
  right: '00px',
});
Icon1.defaultProps = {
  src: images.auth.icon,
};

export const Icon2 = styled('img')({});
Icon2.defaultProps = {
  src: images.auth.login1,
};
