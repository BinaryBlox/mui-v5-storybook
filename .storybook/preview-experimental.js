// .storybook/preview.js

import React from "react";
import { createTheme as createMuiTheme, MuiThemeProvider } from "@mui/material/styles";
import { Container, Grid, CssBaseline } from "@mui/material";

// import { StoryContext, StoryGetter, StoryWrapper } from "@storybook/addons";
// import { addDecorator } from "@storybook/react";
import { Provider } from "react-redux";
import { setConsoleOptions, withConsole } from "@storybook/addon-console";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";
 import { withThemes, getTheme, withThemeProvider } from "@react-theming/storybook-addon";
/** Commented out for v5 */
// import { SnackbarProvider } from "notistack";

// NOTE: Local components & logic
/** Commented out for v5 */
import { ConfirmationServiceProvider } from "../src/contexts/ConfirmationDialogContext";
import useSettings from "../src/hooks/useSettings";
import { SettingsProvider } from "../src/contexts/SettingsContext";
import store from "../src/store";

/** Commented out for v5 */
import {
  lightTheme,
  darkTheme
} from "../src/theme/index";

// IMPORTANT: For mocks to work
import "../src/__fake-api__";
/** Commented out for v5 */
// import "../src/__mocks__";

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "lightTheme",
    toolbar: {
      icon: "circlehollow",
      // array of plain string values or MenuItem shape (see below)
      items: [
        { value: "lightTheme", title: "Light Theme" }
      ],
    },
  },
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

/**
 *
 * Working version
 */

/*
const defaultTheme = createTheme(); // or your custom theme

const withThemeProvider = (Story, context) => {
  return (
    // <Provider store={store}>
      <SettingsProvider>
        <Emotion10ThemeProvider theme={defaultTheme}>
          <ThemeProvider theme={defaultTheme}>
            <ConfirmationServiceProvider>
              <Story {...context} />
            </ConfirmationServiceProvider>
          </ThemeProvider>
        </Emotion10ThemeProvider>
      </SettingsProvider>
    // </Provider>
  );
};

export const decorators = [withThemeProvider];
*/

/**
 *
 * OLD
 */
// const withProvider = (story) => (
//     <Provider store={store}>
//       { story() }
//     </Provider>
//   )

/** Commented out for v5 */

// Theme provider
const providerFn = ({ theme, children }) => {
  const { settings } = useSettings();

  // const muTheme = createCustomTheme({
  //   direction: settings.direction,
  //   responsiveFontSizes: settings.responsiveFontSizes,
  //   mode: settings.theme,
  // });

  console.log(JSON.stringify(theme))
  // const serialTheme = JSON.parse(JSON.stringify(theme));

  // const muTheme = createMuiTheme(serialTheme);

  return (
    // <Provider store={store}>
    //   <SettingsProvider>
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        {/* <SnackbarProvider dense maxSnack={3}> */}
        {/* <ConfirmationServiceProvider> */}
        <CssBaseline />
        {children}
        {/* </ConfirmationServiceProvider> */}
        {/* </SnackbarProvider> */}
      </ThemeProvider>
    </Emotion10ThemeProvider>
    //   </SettingsProvider>
    // </Provider>
  );
};

export const decorators = [
  // withThemeProvider,
  withThemes(null, [lightTheme], {
    providerFn,
  }),
  // withThemes(null, [], {
  //   providerFn,
  // }),
  (Story) => (
    <div
      style={{
        margin: 0,
        // margin: "1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Story />
          </Grid>
        </Grid>
      </Container>
    </div>
  ),
];

// addDecorator((storyFn, context) => withConsole()(storyFn)(context));

/**
 *
 * OLD
 */
//addDecorator(Story => <Story />); // This guy will re-render the story
