import Icon from 'src/components/App/Icon';
import { useTheme } from "@mui/material/styles";
import theme from 'src/config/theme';


export const menuItems = [
  {
    key: 'appointment',
    title: 'Appointment',
    link: '/appointment',
    icon: <Icon name="appointment" />,
  },
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: <Icon name="dashboard"
    />,
  },
  {
    key: 'recruiter',
    title: 'recruiter',
    link: '/recruiter',
    icon: <Icon name="dashboard" color="inherit" />,
  },

  {
    key: 'patients',
    title: 'Patients',
    link: '/patients',
    icon: <Icon name="patients" color="inherit" />,
  },
  {
    key: 'staff',
    title: 'Staff',
    link: '/staff',
    icon: <Icon name="staff" color="inherit" />,
  },
  {
    key: 'tasks',
    title: 'Tasks',
    link: '/tasks',
    icon: <Icon name="tasks" color="inherit" />,
  },
  {
    key: 'clinics',
    title: 'Clinics',
    link: '/clinics',
    icon: <Icon name="clinics" color="inherit" />,
  },
  // {
  //   key: 'settings',
  //   title: 'Settings',
  //   link: '/settings',
  //   icon: <Icon name="settings" color="inherit" />,
  // },
  {
    key: 'billing',
    title: 'Billing & payments',
    link: '/billing',
    icon: <Icon name="billing" color="inherit" />,
  },

];
