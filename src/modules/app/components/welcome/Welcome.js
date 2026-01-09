import React, { useState } from 'react';
import { Container } from '@mui/system';
import {
  StyledBox, GreetingTypography, ClinicTypography, SwitchContainer, CloseTypography, FilterIcon,
  OpenTypography, GreetingBox, GreetingBoxTypography1, GreetingBoxTypography2, ThreeContent,
  Box1, Box2, SearchBox, SearchIcon, FilterIconContainer, ButtonAvatar
} from './styles';

import Filter from '../../../../assets/images/filter 2.svg';
import Search from '../../../../assets/images/search-normal.svg';
import theme, { palette } from 'src/config/theme';
import {
  Divider, Dialog, Typography, alpha,
  TextField
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import InputComponent from 'src/components/shared/Form/Input';
import ButtonComponent from 'src/components/shared/Button';
import { ReactComponent as AddIcon } from '../../../../assets/images/add-square.svg';
import storage from 'src/utils/storageUtils';
import { Box, Menu, MenuItem } from '@mui/material';
import { ReactComponent as Calendar } from '../../../../assets/images/calendar.svg';
import { ReactComponent as More } from '../../../../assets/images/more.svg'
import { shadows } from 'src/config/theme';
import DialogBox from 'src/components/shared/Dialog/DialogBox';
import useResponsive from 'src/components/hooks/useResponsive';
import ClearIcon from '@mui/icons-material/Clear';
import AddJob from '../AddJob/AddJob';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const Welcome = ({ category = '', handleSearch, selectedDate, setSelectedDate, selectedStatus, setSelectedStatus }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);

const user = useSelector((state) => state.auth.user);
  const userName = user?.fullName || "User";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const message = { recruiter: 'Here are list of jobs post by you' };
  const btnTxt = { recruiter: 'Add Job' };
  const greetingSubMessage = message[category] || 'Welcome!';
  const AddBtn = btnTxt[category] || 'Add Data';
  const formComponents = { recruiter: <AddJob onClose={handleClose} /> };

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenMenu = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  const settings = [
    { label: 'Date', icon: <Calendar width={22} />, action: (e) => handleOpenMenu(e, 'date') },
    { label: 'Record Status', icon: <More width={22} />, action: (e) => handleOpenMenu(e, 'status') },
  ];

  const isPermanentOpen = storage.get('IsPermanentOpen') === 'true';

  return (
    <Container maxWidth="xxl" disableGutters >
      <StyledBox
        sx={{
          position: 'fixed',
          top: isMobile || isTablet ? '72px' : '84px',
          zIndex: 1100,
          width: '100%',
        }}
      >
        <GreetingBox isMobile={isMobile} isTablet={isTablet}>
          <GreetingBoxTypography1>Hey! {userName} 👋</GreetingBoxTypography1>
          <GreetingBoxTypography2>{greetingSubMessage}</GreetingBoxTypography2>
        </GreetingBox>

        <ThreeContent>
          <Box1>
            {setSelectedDate && setSelectedStatus && (
              <FilterIconContainer onClick={handleOpenUserMenu}>
                <FilterIcon src={Filter} />
              </FilterIconContainer>
            )}

            {handleSearch && isDesktop && (
              <SearchBox>
                <SearchIcon src={Search} />
                <TextField
                  placeholder="Search"
                  variant="outlined"
                  onChange={(e) => handleSearch(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none", width: 'auto' },
                      "& input": { paddingLeft: 0, paddingRight: 0 },
                    },
                  }}
                />
              </SearchBox>
            )}
          </Box1>

          {isDesktop && <Divider orientation='vertical' />}

          <Box2>
            {(isMobile || isTablet) ? (
              <ButtonAvatar onClick={handleOpen}>
                <AddIcon width={20} height={20} />
              </ButtonAvatar>
            ) : (
              <ButtonComponent
                variant="outlined"
                startIcon={<AddIcon width={24} height={24} />}
                sx={{
                  width: '207px',
                  height: '52px',
                  borderRadius: '12px',
                  padding: '10px 18px',
                  bgcolor: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.light1}`,
                  color: theme.palette.gery.white,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    boxShadow: theme.shadows[1],
                  },
                }}
                onClick={() => navigate('/recruiter/selectplan')}
              >
                {AddBtn}
              </ButtonComponent>
            )}
          </Box2>
        </ThreeContent>
      </StyledBox>

      <DialogBox open={open}>
        {formComponents[category] || (
          <Typography variant="body1">
            No form available for this category.
          </Typography>
        )}
      </DialogBox>

      <Menu
        PaperProps={{
          sx: {
            backgroundColor: palette.gery.white,
            boxShadow: shadows[4],
            borderRadius: '12px',
            border: `1px solid ${alpha(theme.palette.gery.black, 0.14)}`,
          },
        }}
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.label} onClick={setting.action}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {setting.icon}
              {setting.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            backgroundColor: palette.gery.white,
            boxShadow: shadows[4],
            borderRadius: '12px',
            border: `1px solid ${alpha(theme.palette.gery.black, 0.14)}`,
          },
        }}
        sx={{
          mt: isMobile ? '10px' : '-20px',
          marginLeft: isMobile ? '10px' : '140px',
        }}
      >
        {menuType === 'date' && (
          <>
            <MenuItem sx={{ '&:hover': { backgroundColor: 'transparent !important' } }}>
              <Typography>Date Picker here</Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </Container>
  );
};

export default Welcome;
