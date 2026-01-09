
import { useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Provider, useSelector } from 'react-redux';
import AuthLayout from 'src/layout/AuthLayout';
import AppLayout from 'src/layout/AppLayout';
import AppLoader from 'src/layout/AppLoader';
import AppRouter from './router';
import 'src/assets/css/fonts.css';
import 'src/assets/css/app.css';
import Toast from './components/shared/Toast';

import theme from 'src/config/theme';
import { restoreSession } from 'src/modules/auth/store/authActions';
import { useLocation } from 'react-router-dom';
import toast from './utils/toast';

function App({ ...props }) {
  const location = useLocation();
  

  const loading = useSelector((state) => state.app.appLoading);
  const pathname = location.pathname;

  if (loading) return <AppLoader />;


 
  const authRoutes = [
  "/auth/nurse/login",
  "/auth/nurse/register",
  "/auth/recruiter/login",
  "/auth/recruiter/register"
 
];
let Layout = authRoutes.includes(pathname) ? AuthLayout : AppLayout;


  return (
    <ThemeProvider theme={theme}>
      <Toast>
        <Layout>
          <AppRouter />
        </Layout>
      </Toast>
    </ThemeProvider>
  );
}


export default App;
