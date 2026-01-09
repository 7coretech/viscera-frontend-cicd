import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import OrganizationForm from './OrganizationForm';
import AddJobs from './AddJobs';
import SelectPlan from './SelectPlan';
import PaymentInformationForm from './PaymentInfo';
import GlobalSettingStep from './GlobalSettingStep';
import JobShare from '../../AddJob/JobShare';
import ButtonComponent from 'src/components/shared/Button';
import { useNavigate } from 'react-router-dom';

const RecruiterSteps = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const steps = [
    { label: 'Add Job', component: <AddJobs /> },
    { label: 'Subscription Plan', component: <SelectPlan /> },
    { label: 'Payment Info', component: <PaymentInformationForm /> },
    { label: 'Global Settings', component: <GlobalSettingStep /> },
    { label: 'Organization Details', component: <OrganizationForm /> },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setIsFinished(true);
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSkip = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSaveDraft = () => {
    setIsFinished(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: 'calc(100vh - 120px)',
        justifyContent: 'center',
        alignItems: 'center',
        my: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: activeStep === 1 ? 1000 : 700,
          flex: 1,
          bgcolor: theme.palette.gery.white,
          p: 4,
          boxShadow: theme.shadows[1],
          borderRadius: '12px',
          border: `1.5px solid ${theme.palette.primary.light1}`,
        }}
      >
        {isFinished ? <JobShare /> : steps[activeStep].component}

        {!isFinished && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: activeStep === 0 ? 'flex-end' : 'space-between',
              alignItems: 'center',
              mt: 2.5,
            }}
          >
            {activeStep > 0 && (
              <ButtonComponent
                variant="outlined"
                onClick={handleBack}
                sx={{ minWidth: '100px' }}
              >
                Back
              </ButtonComponent>
            )}

            <Box sx={{ display: 'flex', gap: '10px' }}>
              {activeStep < steps.length - 1 && (
                <ButtonComponent
                  variant="text"
                  color="primary"
                  onClick={handleSkip}
                >
                  Skip
                </ButtonComponent>
              )}

              {activeStep === steps.length - 1 && (
                <ButtonComponent
                  variant="outlined"
                  color="secondary"
                  onClick={handleSaveDraft}
                >
                  Save as Draft
                </ButtonComponent>
              )}

              <ButtonComponent
                variant="contained"
                onClick={handleNext}
                sx={{ minWidth: '100px' }}
              >
                {activeStep === steps.length - 1 ? 'Confirm & Publish' : 'Next'}
              </ButtonComponent>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecruiterSteps;