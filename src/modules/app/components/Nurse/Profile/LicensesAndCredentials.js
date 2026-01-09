import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Grid,
  Card,
  CardContent,
  alpha,
  Divider,
} from '@mui/material';
import {
  FormHeaderContainer,
  HeaderText,
  SubHeader,
  Text1,
  Text2,
  Colon,
  HeaderPart,
  FooterPart,
  FormLabel,
} from 'src/modules/app/utility/Styles';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ButtonComponent from 'src/components/shared/Button';
import InputComponent from 'src/components/shared/Form/Input';
import InputSelect from 'src/components/shared/Form/Select';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material';
import useResponsive from 'src/components/hooks/useResponsive';

const nursingLicenseTypeOptions = [
  { label: 'Registered Nurse (RN)', value: 'RN' },
  { label: 'Licensed Practical Nurse (LPN)', value: 'LPN' },
  { label: 'Licensed Vocational Nurse (LVN)', value: 'LVN' },
  { label: 'Nurse Practitioner (NP)', value: 'NP' },
  { label: 'Advanced Practice Registered Nurse (APRN)', value: 'APRN' },
];

const stateOptions = [
  { label: 'California', value: 'CA' },
  { label: 'Texas', value: 'TX' },
  { label: 'New York', value: 'NY' },
  { label: 'Florida', value: 'FL' },
]; // Add all relevant states

const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const specialtyOptions = [
  { label: 'Intensive Care Unit (ICU)', value: 'ICU' },
  { label: 'Emergency Room (ER)', value: 'ER' },
  { label: 'Pediatric', value: 'Pediatric' },
  { label: 'Surgical', value: 'Surgical' },
  { label: 'Oncology', value: 'Oncology' },
  { label: 'Telehealth', value: 'Telehealth' },
  { label: 'Trauma', value: 'Trauma' },
  { label: 'Operating Room (OR)', value: 'OR' },
];

const initialValues = {
  nursingLicenseType: '',
  licenseState: '',
  licenseNumber: '',
  expiryDate: '',
  multiStateLicense: '',
  specialtyCertifications: [],
  credentialUploads: null,
};

const LicenseSchema = Yup.object().shape({
  nursingLicenseType: Yup.string().required('License type is required'),
  licenseState: Yup.string().required('License state is required'),
  licenseNumber: Yup.string().required('License number is required'),
  expiryDate: Yup.date().nullable().required('Expiry date is required'),
  multiStateLicense: Yup.string().required('Multi-state license status is required'),
  specialtyCertifications: Yup.array().min(0),
  credentialUploads: Yup.mixed().optional(),
});

const LicenseFormFields = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } = useFormikContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <FormLabel>Nursing License Type</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          name="nursingLicenseType"
          options={nursingLicenseTypeOptions}
          value={values.nursingLicenseType || ''}
          onChange={(val) => setFieldValue('nursingLicenseType', val)}
          onBlur={handleBlur}
          error={touched.nursingLicenseType && Boolean(errors.nursingLicenseType)}
          helperText={touched.nursingLicenseType && errors.nursingLicenseType}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormLabel>License State(s)</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          name="licenseState"
          options={stateOptions}
          value={values.licenseState || ''}
          onChange={(val) => setFieldValue('licenseState', val)}
          onBlur={handleBlur}
          error={touched.licenseState && Boolean(errors.licenseState)}
          helperText={touched.licenseState && errors.licenseState}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>License Number</FormLabel>
        <InputComponent
          placeholder="Enter License Number"
          variant="outlined"
          fullWidth
          name="licenseNumber"
          value={values.licenseNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.licenseNumber && Boolean(errors.licenseNumber)}
          helperText={touched.licenseNumber && errors.licenseNumber}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>Expiry Date</FormLabel>
        <InputComponent
          variant="outlined"
          name="expiryDate"
          type="date"
          placeholder="dd-mm-yyyy"
          value={values.expiryDate || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.expiryDate && Boolean(errors.expiryDate)}
          helperText={touched.expiryDate && errors.expiryDate}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormLabel>Multi-State License</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          name="multiStateLicense"
          options={yesNoOptions}
          value={values.multiStateLicense || ''}
          onChange={(val) => setFieldValue('multiStateLicense', val)}
          onBlur={handleBlur}
          error={touched.multiStateLicense && Boolean(errors.multiStateLicense)}
          helperText={touched.multiStateLicense && errors.multiStateLicense}
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>Specialty Certifications</FormLabel>
        <InputSelect
          variant="outlined"
          fullWidth
          multiple
          name="specialtyCertifications"
          options={specialtyOptions}
          value={values.specialtyCertifications || []}
          onChange={(val) => setFieldValue('specialtyCertifications', val)}
          onBlur={handleBlur}
          placeholder="Select Certifications (e.g., ICU, ER)"
        />
      </Grid>
      <Grid item xs={12}>
        <FormLabel>Credential Uploads (PDF/JPG)</FormLabel>
        <InputComponent
          variant="outlined"
          fullWidth
          name="credentialUploads"
          type="file"
          inputProps={{ accept: '.pdf,.jpg,.jpeg' }}
          onChange={(event) => {
            setFieldValue('credentialUploads', event.currentTarget.files[0]);
          }}
          onBlur={handleBlur}
          error={touched.credentialUploads && Boolean(errors.credentialUploads)}
          helperText={touched.credentialUploads && errors.credentialUploads}
        />
        {values.credentialUploads && (
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            File selected: {values.credentialUploads.name}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

const LicensesAndCredentials = () => {
  const [open, setOpen] = useState(false);
  const [licenseList, setLicenseList] = useState([]);
  const theme = useTheme();
    const { isMobile, isTablet} = useResponsive();
  

  const handleRemoveLicense = (indexToRemove) => {
    setLicenseList(licenseList.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormHeaderContainer>
          <HeaderText>Licenses & Certifications</HeaderText>
          <SubHeader>Add your nursing licenses and certifications</SubHeader>
        </FormHeaderContainer>
{isMobile || isTablet ? (
  <ButtonComponent  variant="contained"  onClick={() => setOpen(true)}>
    <AddIcon />
  </ButtonComponent>

) : (
<ButtonComponent variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add License
        </ButtonComponent>
)}
        
      </Box>

      <Box mt={4}>
        {licenseList.length === 0 ? (
          <Box textAlign="center" py={10}>
            <DescriptionIcon
              sx={{ fontSize: 120, color: alpha(theme.palette.text.secondary, 0.4) }}
            />
            <Typography sx={{ ...theme.typography.h4, fontWeight: 500 }}>No licenses added</Typography>
            <Typography
              mb={1}
              sx={{
                ...theme.typography.h5,
                color: alpha(theme.palette.gery.dark, 0.5),
              }}
            >
              Add your nursing licenses and certifications
            </Typography>
            <ButtonComponent variant="contained" onClick={() => setOpen(true)}>
              Add License
            </ButtonComponent>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {licenseList.map((license, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    minHeight: 220,
                    border: `1px solid ${theme.palette.gery.medium}`,
                    borderRadius: '12px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-5px)',
                      backgroundColor: alpha(theme.palette.primary.light, 0.05),
                    },
                  }}
                >
                  <HighlightOffRoundedIcon
                    onClick={() => handleRemoveLicense(index)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      cursor: 'pointer',
                      color: theme.palette.gery[500],
                      '&:hover': { color: theme.palette.error.main },
                    }}
                  />
                  <CardContent>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12}>
                        <Text2 sx={{ fontWeight: 700, mb: 1 }}>{license.nursingLicenseType || '-'}</Text2>
                      </Grid>

                      <Grid item xs={12} sx={{ pt: '0 !important', pb: '0 !important' }}>
                        <Divider sx={{ my: 0.5 }} />
                      </Grid>

                      {[
                        ['State', 'licenseState'],
                        ['Number', 'licenseNumber'],
                        ['Expires', 'expiryDate'],
                        ['Multi-State', 'multiStateLicense'],
                        ['Certifications', 'specialtyCertifications'],
                      ].map(([label, key]) => (
                        <React.Fragment key={key}>
                          <Grid item xs={4}>
                            <Text1>{label}</Text1>
                          </Grid>
                          <Grid item xs={1}>
                            <Colon>:</Colon>
                          </Grid>
                          <Grid item xs={7}>
                            <Text2>
                              {key === 'specialtyCertifications'
                                ? (license[key] && license[key].length > 0 ? license[key].join(', ') : 'N/A')
                                : license[key] || '-'}
                            </Text2>
                          </Grid>
                        </React.Fragment>
                      ))}

                      {license.credentialUploads && (
                        <Grid item xs={12} sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AttachmentIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                          <Typography variant="body2" color="primary.main">
                            File Attached: {license.credentialUploads.name}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <HeaderPart>
          Add License & Certification
          <HighlightOffRoundedIcon
            width={24}
            height={24}
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </HeaderPart>

        <Formik
          initialValues={initialValues}
          validationSchema={LicenseSchema}
          onSubmit={(values, { resetForm }) => {
            setLicenseList([...licenseList, values]);
            resetForm();
            setOpen(false);
          }}
        >
          {({ handleSubmit }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <DialogContent
                sx={{
                  scrollbarWidth: 'none',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  // paddingBottom: 0,
                }}
              >
                <LicenseFormFields />
              </DialogContent>

              <FooterPart
                sx={{
                  display: 'flex',
                  justifyContent:isMobile || isTablet ?'space-between' : 'flex-end',
                  gap: 2,
                  padding: '16px',
                  borderTop: `1px solid ${alpha(theme.palette.gery.medium, 0.3)}`,
                }}
              >
                <ButtonComponent
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  sx={{ minWidth: '106px' }}
                >
                  Cancel
                </ButtonComponent>
                <ButtonComponent
                  variant="contained"
                  type="submit"
                  sx={{ minWidth: '106px' }}
                >
                  Save
                </ButtonComponent>
              </FooterPart>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default LicensesAndCredentials;