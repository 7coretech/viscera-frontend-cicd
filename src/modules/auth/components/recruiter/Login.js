import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputComponent from "src/components/shared/Form/Input";
import ButtonComponent from "src/components/shared/Button";
import theme, { palette, shadows, typography } from "src/config/theme";
import toast from "src/utils/toast";
import { login } from "src/modules/auth/store/authActions";

function RecruiterLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const features = [
    "Post your healthcare job openings easily.",
    "Access a large pool of qualified nurses.",
    "Track applicants and manage your hiring process efficiently.",
    "Communicate directly with candidates through the platform.",
  ];

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      dispatch(
        login(
          { ...values, role: "recruiter" },
          (res) => {
            toast.success("Login Successful");
            navigate("/recruiter/dashboard");
            setLoading(false);
            resolve(res);
          },
          (err) => {
            toast.error(err?.message || "Login failed");
            setLoading(false);
            reject(err);
          }
        )
      );
    });
  };

  return (
    <Box
      sx={{
       display: 'flex',
        minHeight: '100vh',
        width: '100%',
        flex:1,
        overflowY:'auto',
      }}
    >
      {/* Left Info Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography sx={{ ...typography.h1, mb: 3, color: palette.gery.black }}>
            New to Viscera?
          </Typography>
          <List>
            {features.map((text, i) => (
              <ListItem key={i} disablePadding sx={{ mb: 1 }}>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: palette.primary.main }} />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{ sx: { ...typography.smallRegular } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Right Login Form Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: palette.gery.white,
            boxShadow: shadows[1],
            borderRadius: "16px",
            p: 4,
          }}
        >
          <Typography sx={{ ...typography.h2, mb: 3 }}>Recruiter Login</Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                {/* Email Field */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ ...typography.smallRegular, mb: 1 }}>Email</Typography>
                  <InputComponent
                    name="email"
                    variant="outlined"
                    placeholder="Enter Email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{
                      backgroundColor: palette.gery.white,
                      boxShadow: theme.shadows[1],
                      "& .MuiOutlinedInput-root": {
                        height: "52px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "12px",
                      },
                    }}
                  />
                </Box>

                {/* Password Field */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ ...typography.smallRegular, mb: 1 }}>Password</Typography>
                  <InputComponent
                    name="password"
                    variant="outlined"
                    placeholder="Enter Password"
                    type="password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{
                      backgroundColor: palette.gery.white,
                      boxShadow: theme.shadows[1],
                      "& .MuiOutlinedInput-root": {
                        height: "52px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "12px",
                      },
                    }}
                  />
                </Box>

                {/* Submit Button */}
                <ButtonComponent
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ height: "52px", borderRadius: "12px" }}
                >
                  Login
                </ButtonComponent>

                {/* Register Link */}
                <Typography
                  sx={{
                    mt: 3,
                    textAlign: "center",
                    ...typography.smallRegular,
                    color: palette.gery.darkGray,
                  }}
                >
                  New here?{" "}
                  <span
                    style={{ color: palette.primary.main, cursor: "pointer" }}
                    onClick={() => navigate("/auth/recruiter/register")}
                  >
                    Register as Recruiter
                  </span>
                </Typography>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default RecruiterLogin;
