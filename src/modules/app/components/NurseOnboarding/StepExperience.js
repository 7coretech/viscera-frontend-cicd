import { Box, Typography } from "@mui/material";
import InputComponent from "src/components/shared/Form/Input";
import theme, { palette, typography } from "src/config/theme.js";

export default function StepExperience({ values, errors, touched, handleChange, handleBlur }) {
    return (
        <Box>
            <Typography sx={{ ...typography.h3, mb: 2 }}>
                Nursing Experience & Credentials
            </Typography>

            {/* Years of Nursing Experience */}
            <Typography sx={{ mb: 1 }}>Total Years of Nursing Experience</Typography>
            <InputComponent
                name="experienceYears"
                value={values.experienceYears}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.experienceYears && Boolean(errors.experienceYears)}
                helperText={touched.experienceYears && errors.experienceYears}
                fullWidth
                variant="outlined"
                sx={{
                    backgroundColor: palette.gery.white,
                    boxShadow: theme.shadows[1],
                    "& .MuiOutlinedInput-root": {
                        height: "52px",
                        borderRadius: "12px",
                    },
                }}
            />

            {/* Nursing License Number */}
            <Typography sx={{ mt: 2, mb: 1 }}>Nursing License Number</Typography>
            <InputComponent
                name="licenseNumber"
                value={values.licenseNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.licenseNumber && Boolean(errors.licenseNumber)}
                helperText={touched.licenseNumber && errors.licenseNumber}
                fullWidth
                variant="outlined"
                sx={{
                    backgroundColor: palette.gery.white,
                    boxShadow: theme.shadows[1],
                    "& .MuiOutlinedInput-root": {
                        height: "52px",
                        borderRadius: "12px",
                    },
                }}
            />

            {/* Specialties */}
            <Typography sx={{ mt: 2, mb: 1 }}>Specialties (e.g. ICU, Pediatrics, Oncology)</Typography>
            <InputComponent
                name="specializations"
                value={values.specializations}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.specializations && Boolean(errors.specializations)}
                helperText={touched.specializations && errors.specializations}
                fullWidth
                variant="outlined"
                sx={{
                    backgroundColor: palette.gery.white,
                    boxShadow: theme.shadows[1],
                    "& .MuiOutlinedInput-root": {
                        height: "52px",
                        borderRadius: "12px",
                    },
                }}
            />

            {/* Certifications */}
            <Typography sx={{ mt: 2, mb: 1 }}>Certifications (e.g. BLS, ACLS, PALS)</Typography>
            <InputComponent
                name="certifications"
                value={values.certifications}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.certifications && Boolean(errors.certifications)}
                helperText={touched.certifications && errors.certifications}
                fullWidth
                variant="outlined"
                sx={{
                    backgroundColor: palette.gery.white,
                    boxShadow: theme.shadows[1],
                    "& .MuiOutlinedInput-root": {
                        height: "52px",
                        borderRadius: "12px",
                    },
                }}
            />
        </Box>
    );
}
