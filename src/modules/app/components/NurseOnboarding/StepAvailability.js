import { Box, Typography } from "@mui/material";
import InputComponent from "src/components/shared/Form/Input";
import InputSelect from "src/components/shared/Form/Select";
import theme, { palette, typography } from "src/config/theme.js";

const shiftOptions = [
    { label: "Day Shift", value: "Day" },
    { label: "Night Shift", value: "Night" },
    { label: "Rotational", value: "Rotational" },
    { label: "12-Hour Shift", value: "12hr" },
];

export default function StepAvailability({ values, errors, touched, handleChange, handleBlur }) {
    return (
        <Box>
            <Typography sx={{ ...typography.h3, mb: 2 }}>
                Availability & Work Preferences
            </Typography>

            {/* Preferred Shift */}
            <Typography sx={{ mb: 1 }}>Preferred Shift</Typography>
            <InputSelect
                name="shiftTypes"
                variant="outlined"
                value={values.shiftTypes}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shiftTypes && Boolean(errors.shiftTypes)}
                helperText={touched.shiftTypes && errors.shiftTypes}
                fullWidth
                options={shiftOptions}
            />

            {/* Preferred Units */}
            <Typography sx={{ mt: 2, mb: 1 }}>
                Preferred Units (ICU, ER, Pediatrics, General Ward, etc.)
            </Typography>
            <InputComponent
                name="preferredUnits"
                value={values.preferredUnits}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.preferredUnits && Boolean(errors.preferredUnits)}
                helperText={touched.preferredUnits && errors.preferredUnits}
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

            {/* Preferred Locations */}
            <Typography sx={{ mt: 2, mb: 1 }}>Preferred Work Locations</Typography>
            <InputComponent
                name="preferredLocations"
                value={values.preferredLocations}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.preferredLocations && Boolean(errors.preferredLocations)}
                helperText={touched.preferredLocations && errors.preferredLocations}
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

            {/* Expected Pay */}
            <Typography sx={{ mt: 2, mb: 1 }}>Expected Pay (per hour)</Typography>
            <InputComponent
                name="payExpectation"
                value={values.payExpectation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.payExpectation && Boolean(errors.payExpectation)}
                helperText={touched.payExpectation && errors.payExpectation}
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

            {/* Work Authorization */}
            <Typography sx={{ mt: 2, mb: 1 }}>Work Authorization / Visa Status</Typography>
            <InputComponent
                name="visaStatus"
                value={values.visaStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.visaStatus && Boolean(errors.visaStatus)}
                helperText={touched.visaStatus && errors.visaStatus}
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
