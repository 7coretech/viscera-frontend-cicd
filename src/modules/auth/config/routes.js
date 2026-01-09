import Login from "../../auth/components/nurse/Login";
import Register from "../../auth/components/nurse/Registration";
import RecruiterLogin from "../../auth/components/recruiter/Login";
import RecruiterRegister from "../../auth/components/recruiter/Registration";

export default [
  {
    title: 'login',
    component: Login,
    url: '/auth/nurse/login',
    exact: true,
    auth: false,
  },
  {
    title: 'register',
    component: Register,
    url: '/auth/nurse/register',
    exact: true,
    auth: false,
  },
  {
    title: 'login',
    component: RecruiterLogin,
    url: '/auth/recruiter/login',
    exact: true,
    auth: false,
  },
  {
    title: 'register',
    component: RecruiterRegister,
    url: '/auth/recruiter/register',
    exact: true,
    auth: false,
  },
]

