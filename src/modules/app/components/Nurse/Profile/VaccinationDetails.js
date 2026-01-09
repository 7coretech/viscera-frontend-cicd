import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Divider,
  alpha,
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

const vaccinatedOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const doseOptions = [
  { label: '1 Dose', value: '1' },
  { label: '2 Doses', value: '2' },
  { label: 'Booster', value: 'Booster' },
];

const initialValues = {
  isVaccinated: '',
  vaccineName: '',
  doseCount: '',
  vaccinationDate: '',
  certificateFile: null,
};

const VaccinationSchema = Yup.object().shape({
  isVaccinated: Yup.string().required('Vaccination status is required'),
  vaccineName: Yup.string().when('isVaccinated', {
    is: 'Yes',
    then: (schema) => schema.required('Vaccine name is required'),
  }),
  doseCount: Yup.string().when('isVaccinated', {
    is: 'Yes',
    then: (schema) => schema.required('Dose count is required'),
  }),
  vaccinationDate: Yup.date().when('isVaccinated', {
    is: 'Yes',
    then: (schema) => schema.required('Vaccination date is required'),
  }),
  certificateFile: Yup.mixed().when('isVaccinated', {
    is: 'Yes',
    then: (schema) => schema.required('Certificate is required'),
  }),
});

const VaccinationFormFields = () => {
  const { values, handleBlur, errors, touched, setFieldValue } =
    useFormikContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormLabel>Are you vaccinated?</FormLabel>
        <InputSelect
         variant="outlined"
         fullWidth
          name="isVaccinated"
          options={vaccinatedOptions}
          value={values.isVaccinated || ''}
          onChange={(val) => setFieldValue('isVaccinated', val)}
          onBlur={handleBlur}
          error={touched.isVaccinated && Boolean(errors.isVaccinated)}
          helperText={touched.isVaccinated && errors.isVaccinated}
        />
      </Grid>

      {values.isVaccinated === 'Yes' && (
        <>
          <Grid item xs={12}>
            <FormLabel>Vaccine Name</FormLabel>
            <InputComponent
             variant="outlined"
             fullWidth
              name="vaccineName"
              placeholder="Enter vaccine name"
              error={touched.vaccineName && Boolean(errors.vaccineName)}
              helperText={touched.vaccineName && errors.vaccineName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormLabel>Dose Count</FormLabel>
            <InputSelect
             variant="outlined"
             fullWidth
              name="doseCount"
              options={doseOptions}
              value={values.doseCount || ''}
              onChange={(val) => setFieldValue('doseCount', val)}
              error={touched.doseCount && Boolean(errors.doseCount)}
              helperText={touched.doseCount && errors.doseCount}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormLabel>Vaccination Date</FormLabel>
            <InputComponent
             variant="outlined"
             fullWidth
              type="date"
              name="vaccinationDate"
              error={touched.vaccinationDate && Boolean(errors.vaccinationDate)}
              helperText={touched.vaccinationDate && errors.vaccinationDate}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel>Vaccination Certificate</FormLabel>
            <InputComponent
             variant="outlined"
            fullWidth
              type="file"
              inputProps={{ accept: '.pdf,.jpg,.jpeg' }}
              onChange={(e) =>
                setFieldValue('certificateFile', e.currentTarget.files[0])
              }
              error={touched.certificateFile && Boolean(errors.certificateFile)}
              helperText={touched.certificateFile && errors.certificateFile}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

const VaccinationDetails = () => {
  const [open, setOpen] = useState(false);
  const [vaccinationList, setVaccinationList] = useState([]);
  const theme = useTheme();
  const { isMobile, isTablet } = useResponsive();

  const handleRemove = (index) => {
    setVaccinationList(vaccinationList.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormHeaderContainer>
          <HeaderText>Vaccination Details</HeaderText>
          <SubHeader>Add your vaccination information</SubHeader>
        </FormHeaderContainer>

        {isMobile || isTablet ? (
          <ButtonComponent variant="contained" onClick={() => setOpen(true)}>
            <AddIcon />
          </ButtonComponent>
        ) : (
          <ButtonComponent
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Vaccination
          </ButtonComponent>
        )}
      </Box>

      <Box mt={4}>
        {vaccinationList.length === 0 ? (
          <Box textAlign="center" py={10}>
            <DescriptionIcon
              sx={{ fontSize: 120, color: alpha(theme.palette.text.secondary, 0.4) }}
            />
            <Typography sx={{ ...theme.typography.h4, fontWeight: 500 }}>
              No vaccination details added
            </Typography>
            <Typography
              mb={1}
              sx={{
                ...theme.typography.h5,
                color: alpha(theme.palette.gery.dark, 0.5),
              }}
            >
              Add your vaccination information
            </Typography>
            <ButtonComponent variant="contained" onClick={() => setOpen(true)}>
              Add Vaccination
            </ButtonComponent>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {vaccinationList.map((item, index) => (
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
                    onClick={() => handleRemove(index)}
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
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Text2 sx={{ fontWeight: 700, mb: 1 }}>
                          Vaccination Information
                        </Text2>
                      </Grid>

                      <Grid item xs={12} sx={{ pt: 0, pb: 0 }}>
                        <Divider sx={{ my: 0.5 }} />
                      </Grid>

                      {[
                        ['Status', 'isVaccinated'],
                        ['Vaccine', 'vaccineName'],
                        ['Doses', 'doseCount'],
                        ['Date', 'vaccinationDate'],
                      ].map(([label, key]) => (
                        <React.Fragment key={key}>
                          <Grid item xs={4}>
                            <Text1>{label}</Text1>
                          </Grid>
                          <Grid item xs={1}>
                            <Colon>:</Colon>
                          </Grid>
                          <Grid item xs={7}>
                            <Text2>{item[key] || '-'}</Text2>
                          </Grid>
                        </React.Fragment>
                      ))}

                      {item.certificateFile && (
                        <Grid
                          item
                          xs={12}
                          sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                          <AttachmentIcon
                            sx={{ fontSize: 16, color: theme.palette.primary.main }}
                          />
                          <Typography variant="body2" color="primary.main">
                            File Attached: {item.certificateFile.name}
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
          Add Vaccination Details
          <HighlightOffRoundedIcon
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </HeaderPart>

        <Formik
          initialValues={initialValues}
        //   validationSchema={VaccinationSchema}
          onSubmit={(values, { resetForm }) => {
            setVaccinationList([...vaccinationList, values]);
            resetForm();
            setOpen(false);
          }}
        >
          {() => (
            <Form style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <DialogContent
                sx={{
                  scrollbarWidth: 'none',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                }}
              >
                <VaccinationFormFields />
              </DialogContent>

              <FooterPart
                sx={{
                  display: 'flex',
                  justifyContent:
                    isMobile || isTablet ? 'space-between' : 'flex-end',
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

export default VaccinationDetails;
