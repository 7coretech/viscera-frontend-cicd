import JobDashboard from "../../app/components/jobs/JobDashboard";
import JobDetails from "../../app/components/jobs/JobDetails";
import NurseJobsPage from "../../app/components/jobs/NurseJobsPage";
import PublicJobListing from "../../app/components/jobs/PublicJobListing";
import NurseOnboarding from "../components/NurseOnboarding/NurseOnboarding";
import NurseProfile from "../components/Nurse/Profile/NurseProfile";
import NurseDashboard from "../components/Nurse/NurseDashboard/NurseDashboard";
// import NurseProfile from "../components/recruiter/CandidateProfile ";
import ChatPage from "../components/Nurse/Chat/ChatPage";
import ChatListPage from "../components/Nurse/Chat/ChatListPage";
import RecruiterJobForm from '../../app/components/AddJob/AddJob';
import JobShare from '../../app/components/AddJob/JobShare';
import SelectPlan from '../../app/components/AddJob/SelectPlan';
import ApplicantsPage from '../components/recruiter/ApplicantsPage';
import CandidateProfile from '../components/recruiter/CandidateProfile ';
import ChatScreen from '../components/recruiter/ChatScreen';
import ManageJobs from '../container/ManageJobs';
import OrganizationForm from "../components/recruiter/Organization/OrganizationForm";
import PaymentInformationForm from "../components/recruiter/RecruiterSteps/PaymentInfo";
import RecruiterSteps from "../components/recruiter/RecruiterSteps/RecruiterSteps";
import GlobalSettings from "../components/recruiter/GlobalSetting/GlobalSettings";
import Settings from "../components/Nurse/Nurse_Settings/Settings";
import NurseChangePassword from "../components/Nurse/ChangePassword/NurseChangePassword";
import RecruiterSettings from "../components/recruiter/RecruiterSetting/RecruiterSettings";
import RecruiterChangePassword from "../components/recruiter/ChangePassword/RecruiterChangePassword";
import EditJob from "../components/recruiter/EditJobs/EditJob";
import ManageMFAPage from "../components/recruiter/ManageMFA/ManageMFAPage";
import PaymentInfoPage from "../components/recruiter/Billing&Payment/PaymentInfoPage";
import RecruiterDashboard from "../components/recruiter/RecruiterDashboard/RecruiterDashboard";
export default [
  // {
  //   title: 'onboarding',
  //   component: NurseOnboarding,
  //   url: '/nurse/onboarding',
  //   exact: true,
  //   auth: false,
  // },
  {
    title: 'nurseProfile',
    component: NurseProfile,
    url: '/nurse/profile',
    exact: true,
    auth: false,
  },
  {
    title: 'nurseProfileSection', 
    component: NurseProfile, 
    url: '/nurse/profile/:tabKey',       
    exact: true,
    auth: false,
  },
   {
    title: 'nurseDashboard',
    component: NurseDashboard,
    url: '/nurse/dashboard',
    exact: true,
    auth: false,
  },
   {
    title: 'nurseChatList',
    component: ChatListPage,
    url: '/nurse/chatList',
    exact: true,
    auth: false,
  },
  {
    title: 'nurseChat',
    component: ChatPage,
    url: 'nurse/chat/:id',
    exact: true,
    auth: false,
  },
  {
    title: 'jobdashboard',
    component: JobDashboard,
    url: '/nurse/jobdashboard',
    exact: true,
    auth: false,
  },
  {
    title: 'jobdetails',
    component: JobDetails,
    url: "/nurse/jobdetails/:id",
    exact: true,
    auth: false,
  },
  {
    title: 'jobs',
    component: NurseJobsPage,
    url: "/nurse/jobs",
    exact: true,
    auth: false,
  },
   {
    title: 'settings',
    component: Settings,
    url: "/nurse/settings",
    exact: true,
    auth: false,
  },
     {
    title: 'changePassword',
    component: NurseChangePassword,
    url: "/nurse/change-password",
    exact: true,
    auth: false,
  },
  {
    title: 'publicjobs',
    component: PublicJobListing,
    url: "/publicjobs",
    exact: true,
    auth: false,
  },
   {
    title: 'recruiter',
    component: ManageJobs,
    url: '/recruiter/manageJobs',
    exact: true,
    auth: false,
  },
     {
    title: 'recruiter',
    component: RecruiterDashboard,
    url: '/recruiter/dashboard',
    exact: true,
    auth: false,
  },
     {
    title: 'Recruiter',
    component: RecruiterSteps,
    url: '/recruiter/steps',
    exact: true,
    auth: false,
  },
   {
    title: 'organization',
    component: OrganizationForm,
    url: '/recruiter/organization',
    exact: true,
    auth: false,
  },
    {
    title: 'payment',
    component: PaymentInformationForm,
    url: '/recruiter/payment',
    exact: true,
    auth: false,
  },
   {
    title: 'jobform',
    component: RecruiterJobForm,
    url: '/recruiter/jobform',
    exact: true,
    auth: false,
  },
   {
    title: 'globalSettings',
    component: GlobalSettings,
    url: '/recruiter/globalsettings',
    exact: true,
    auth: false,
  },
   {
    title: 'plans',
    component: SelectPlan,
    url: '/recruiter/selectplan',
    exact: true,
    auth: false,
  },
   {
    title: 'shareJob',
    component: JobShare,
    url: '/recruiter/sharejob',
    exact: true,
    auth: false,
  },
  {
    title: 'applicants',
    component: ApplicantsPage,
    url: '/jobs/:jobId/applicants',
    exact: true,
    auth: false,
  },
    {
    title: 'editJob',
    component: EditJob,
    url: '/jobs/:jobId/edit',
    exact: true,
    auth: false,
  },
     {
    title: 'recruiterSetting',
    component: RecruiterSettings,
    url: "/recruiter/settings",
    exact: true,
    auth: false,
  },
     {
    title: 'recruiterChangePassWord',
    component: RecruiterChangePassword,
    url: "/recruiter/change-password",
    exact: true,
    auth: false,
  },

    {
    title: 'manageMFA',
    component: ManageMFAPage,
    url: "/recruiter/manage-mfa",
    exact: true,
    auth: false,
  },
   {
    title: 'Payment Info',
    component: PaymentInfoPage,
    url: "/recruiter/payments",
    exact: true,
    auth: false,
  },

  //   {
  //   title: 'candidate',
  //   component: CandidateProfile,
  //   url: '/jobs/:jobId/candidate',
  //   exact: true,
  //   auth: false,
  // },
  // {
  //   title: 'chat',
  //   component: ChatScreen,
  //   url: '/chat',
  //   exact: true,
  //   auth: false,
  // },
]





