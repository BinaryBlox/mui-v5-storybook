// .storybook/preview.js

import React from "react";
import { CssBaseline, Container, Grid } from "@mui/material";
import { Provider } from "react-redux";
import { setConsoleOptions, withConsole } from "@storybook/addon-console";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";

// NOTE: Local components & logic
import { ConfirmationServiceProvider } from "../src/contexts/ConfirmationDialogContext";
import { SettingsProvider } from "../src/contexts/SettingsContext";
import { createCustomTheme } from "../src/theme/index";
// import { useSettings } from "../src/hooks/useSettings";
import store from "../src/store";

// IMPORTANT: For mocks to work
import "../src/__fake-api__";
 
const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", right: "🇺🇸", title: "English" },
        { value: "es", right: "🇪🇸", title: "Español" },
      ],
    },
  },
};

console.log(process.env.REACT_STORYBOOK_THEME)
 
// const defaultTheme = createTheme(); // or your custom theme
const defaultTheme = createCustomTheme({
  direction: "rtl",
  responsiveFontSizes: true,
  mode: process.env.REACT_STORYBOOK_THEME,
});
 
/**
 * 
 * @param {*} Story 
 * @param {*} context 
 * @returns 
 */
const withThemeProvider = (Story, context) => {
  return (
    <Provider store={store}>
      <SettingsProvider>
        <Emotion10ThemeProvider theme={defaultTheme}>
          <ThemeProvider theme={defaultTheme}>
            <ConfirmationServiceProvider>
              <CssBaseline />
              <Story {...context} />
            </ConfirmationServiceProvider>
          </ThemeProvider>
        </Emotion10ThemeProvider>
      </SettingsProvider>
    </Provider>
  );
};

/**
 * Custom decorator for theme provider
 */
export const decorators = [withThemeProvider,
  // (Story) => (
  //   <div
  //     style={{
  //       margin: 0,
  //       // margin: "1em",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   > 
  //     <Container maxWidth="lg" >
  //       <Grid container spacing={1}>
  //         <Grid item xs={12}>
  //           <Story />
  //         </Grid>
  //       </Grid>
  //     </Container>
  //   </div>
  // ),
]; 