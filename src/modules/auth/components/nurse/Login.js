import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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
import logo from "../../../../assets/images/Viscera_Logo.svg";

function NurseLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const features = [
    "One click apply using your nursing profile.",
    "Get relevant nursing job recommendations.",
    "Showcase your profile to top hospitals and healthcare agencies.",
    "Track application status on applied nursing jobs.",
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
    setLoading(true);
    dispatch(
      login(
        values,
        () => {
          toast.success("Login successful");
          navigate("/nurse/dashboard");
          setLoading(false);
        },
        (err) => {
          toast.error(err?.message || "Login failed");
          setLoading(false);
        }
      )
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* LEFT INFO SECTION */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <img
            src={logo}
            alt="Viscera Logo"
            style={{ height: 50, width: 180, marginBottom: 32 }}
          />

          <Typography sx={{ ...typography.h1, mb: 3 }}>
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
                  primaryTypographyProps={{
                    sx: typography.smallRegular,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* RIGHT LOGIN CARD */}
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
          <Typography sx={{ ...typography.h2, mb: 3 }}>
            Nurse Login
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                {/* EMAIL */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ ...typography.smallRegular, mb: 1 }}>
                    Email
                  </Typography>
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
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  />
                </Box>

                {/* PASSWORD */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ ...typography.smallRegular, mb: 1 }}>
                    Password
                  </Typography>
                  <InputComponent
                    name="password"
                    type="password"
                    variant="outlined"
                    placeholder="Enter Password"
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
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  />
                </Box>

                {/* BUTTON */}
                <ButtonComponent
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ height: "52px", borderRadius: "12px" }}
                >
                  Login
                </ButtonComponent>

                {/* REGISTER LINK */}
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
                    onClick={() => navigate("/auth/nurse/register")}
                  >
                    Register as Nurse
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

export default NurseLogin;
