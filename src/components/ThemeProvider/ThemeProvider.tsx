import React from "react";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";

const StyledTextField = styled(MuiTextField)`
  width: 288px;
`;

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "serif",
      fontSize: "12px",
    },
  },
});

const ThemeProviderMine = () => (
  <ThemeProvider theme={theme}>
    <span>xxx</span>
    <StyledTextField placeholder="Foobar" />
  </ThemeProvider>
);

export default ThemeProviderMine;
