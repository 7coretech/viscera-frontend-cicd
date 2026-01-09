import { Box, Typography, Paper, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import InputComponent from "src/components/shared/Form/Input";
import theme, { palette, typography } from "src/config/theme";

const DropZone = ({
  label,
  name,
  accept,
  multiple = false,
  values,
  setFieldValue,
  touched,
  errors,
}) => {
  return (
    <Box
      component="label"
      sx={{
        border: `1.5px dashed ${palette.primary.main}`,
        borderRadius: "12px",
        p: 3,
        mt: 1,
        cursor: "pointer",
        display: "block",
        textAlign: "center",
        backgroundColor: palette.gery.white,
        boxShadow: theme.shadows[1],
        "&:hover": { backgroundColor: alpha(palette.primary.main, 0.05) },
      }}
    >
      <input
        type="file"
        hidden
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={(event) => {
          const files = multiple
            ? Array.from(event.currentTarget.files || [])
            : event.currentTarget.files?.[0];
          setFieldValue(name, files);
        }}
      />

      {!values[name] || (Array.isArray(values[name]) && values[name].length === 0) ? (
        <>
          <Typography variant="body1" color={palette.gery.black}>
            Drag & Drop File Here or{" "}
            <span
              style={{
                ...typography.h6,
                color: palette.primary.main,
                cursor: "pointer",
                borderBottom: `1px solid ${palette.primary.main}`,
                marginLeft: 4,
              }}
            >
              Browse File
            </span>
          </Typography>
          <Typography variant="body2" color={alpha(palette.gery.black, 0.7)}>
            (max size: 25MB, types: {accept})
          </Typography>
        </>
      ) : (
        <>
          {Array.isArray(values[name])
            ? values[name].map((file, idx) => (
                <Typography key={idx} variant="body2" fontWeight="bold" mt={1}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </Typography>
              ))
            : (
              <Typography variant="body2" fontWeight="bold" mt={1}>
                {values[name].name} ({(values[name].size / 1024).toFixed(2)} KB)
              </Typography>
            )}
        </>
      )}

      {touched[name] && errors[name] && (
        <Typography color="error" variant="caption" display="block" mt={1}>
          {errors[name]}
        </Typography>
      )}
    </Box>
  );
};

export default function StepEducation({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  return (
    <Box>
      <Typography sx={{ ...typography.h3, mb: 3 }}>
        Education & Credentials
      </Typography>

      <Paper sx={{ p: 3, mb: 3, borderRadius: "16px", boxShadow: theme.shadows[2] }}>
        <Typography sx={{ ...typography.h5, mb: 2, color: palette.primary.main }}>
          Academic Qualification
        </Typography>
        <Typography sx={{ mb: 1 }}>Education</Typography>
        <InputComponent
          name="education"
          placeholder="e.g. B.Sc Nursing, M.Sc Nursing"
          value={values.education}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.education && Boolean(errors.education)}
          helperText={touched.education && errors.education}
          fullWidth
          variant="outlined"
          sx={{
            backgroundColor: palette.gery.white,
            "& .MuiOutlinedInput-root": {
              height: "52px",
              borderRadius: "12px",
            },
          }}
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: "16px", boxShadow: theme.shadows[2] }}>
        <Typography sx={{ ...typography.h5, mb: 2, color: palette.primary.main }}>
          Nursing License
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ mb: 1 }}>License Number</Typography>
            <InputComponent
              name="licenseNumber"
              placeholder="Enter License Number"
              value={values.licenseNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.licenseNumber && Boolean(errors.licenseNumber)}
              helperText={touched.licenseNumber && errors.licenseNumber}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: palette.gery.white,
                "& .MuiOutlinedInput-root": {
                  height: "52px",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ mb: 1 }}>Expiry Date</Typography>
            <InputComponent
              type="date"
              name="licenseExpiry"
              value={values.licenseExpiry}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.licenseExpiry && Boolean(errors.licenseExpiry)}
              helperText={touched.licenseExpiry && errors.licenseExpiry}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: palette.gery.white,
                "& .MuiOutlinedInput-root": {
                  height: "52px",
                  borderRadius: "12px",
                },
              }}
            />
          </Grid>
        </Grid>
        <Typography sx={{ mt: 3, mb: 1 }}>Upload License File</Typography>
        <DropZone
          label="Upload License"
          name="license"
          accept=".pdf,.jpg,.png"
          values={values}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
        />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: "16px", boxShadow: theme.shadows[2] }}>
        <Typography sx={{ ...typography.h5, mb: 2, color: palette.primary.main }}>
          Resume (Optional)
        </Typography>
        <Typography sx={{ mb: 1 }}>Upload Resume</Typography>
        <DropZone
          label="Resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          values={values}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
        />
      </Paper>
    </Box>
  );
}
