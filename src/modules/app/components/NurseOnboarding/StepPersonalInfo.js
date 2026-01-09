import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CameraAlt } from "@mui/icons-material";
import InputComponent from "src/components/shared/Form/Input";
import theme, { palette, typography } from "src/config/theme.js";

const UploadWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    width: 120,
    height: 120,
    marginBottom: theme.spacing(1),
}));

const UploadOverlay = styled("label")(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: palette.primary.main,
    color: "#fff",
    borderRadius: "50%",
    padding: 6,
    cursor: "pointer",
    boxShadow: theme.shadows[2],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export default function StepPersonalInfo({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
}) {
    return (
        <Box>
            <Typography sx={{ ...typography.h3, mb: 2 }}>
                Personal Information
            </Typography>

            <Box display="flex" flexDirection="column" alignItems="center">
                <UploadWrapper>
                    <Avatar
                        src={values.photo ? URL.createObjectURL(values.photo) : ""}
                        sx={{
                            width: 120,
                            height: 120,
                            border: `2px solid ${palette.primary.main}`,
                            boxShadow: theme.shadows[2],
                        }}
                    />

                    <UploadOverlay>
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                                setFieldValue("photo", event.currentTarget.files[0])
                            }
                        />
                        <CameraAlt fontSize="small" />
                    </UploadOverlay>
                </UploadWrapper>

                <Typography variant="body2" color="text.secondary">
                    {values.photo ? "Change Photo" : "Upload Profile Picture"}
                </Typography>
            </Box>

            <Typography sx={{ mb: 1, mt: 2 }}>Full Name</Typography>
            <InputComponent
                variant="outlined"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                fullWidth
                sx={{
                    backgroundColor: palette.gery.white,
                    boxShadow: theme.shadows[1],
                    "& .MuiOutlinedInput-root": {
                        height: "52px",
                        borderRadius: "12px",
                    },
                }}
            />

            <Typography sx={{ mt: 2, mb: 1 }}>Email</Typography>
            <InputComponent
                name="email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
                sx={{
                    backgroundColor: palette.gery.white,
                    boxShadow: theme.shadows[1],
                    "& .MuiOutlinedInput-root": {
                        height: "52px",
                        borderRadius: "12px",
                    },
                }}
            />

            <Typography sx={{ mt: 2, mb: 1 }}>Mobile</Typography>
            <InputComponent
                name="mobile"
                variant="outlined"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                fullWidth
                sx={{
                    backgroundColor: palette.gery.white,
                    boxShadow: theme.shadows[1],
                    "& .MuiOutlinedInput-root": {
                        height: "52px",
                        borderRadius: "12px",
                    },
                }}
            />

            <Typography sx={{ mt: 2, mb: 1 }}>Address</Typography>
            <InputComponent
                name="address"
                variant="outlined"
                multiline
                minRows={2}
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                fullWidth
                sx={{
                    backgroundColor: palette.gery.white,
                    boxShadow: theme.shadows[1],
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                    },
                }}
            />

            <Typography sx={{ mt: 2, mb: 1 }}>Emergency Contact</Typography>
            <InputComponent
                name="emergencyContact"
                variant="outlined"
                value={values.emergencyContact}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.emergencyContact && Boolean(errors.emergencyContact)}
                helperText={touched.emergencyContact && errors.emergencyContact}
                fullWidth
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
