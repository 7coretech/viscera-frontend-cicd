import React from "react";
import Grid from "@mui/material/Grid";
import {
  Left,
  Right,
  Logo,
  Icon2,
  AuthContent,
  AuthContainer,
} from "./styles";
import useResponsive from "src/components/hooks/useResponsive";
function AuthLayout({ children, ...props }) {
  const { isDesktop } = useResponsive();

  return (
    <AuthContainer maxWidth="xl" >

      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          {/* <Logo /> */}
          <AuthContent>
            <div>{children}</div>
          </AuthContent>
        </Grid>
        {/* {isDesktop && (
          <Right item xs={6}>
            <Icon2 />
          </Right>
        )} */}

      </Grid>
    </AuthContainer>
  );
}

export default AuthLayout;
