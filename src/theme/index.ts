import type { Direction, Theme } from "@mui/material/styles";
import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { baseThemeOptions } from "./BaseThemeOptions";
import { darkThemeOptions } from "./DarkThemeOptions";
import { lightThemeOptions } from "./LightThemeOptions";

// import { darkTheme } from "./darkTheme";
// import { lightTheme } from "./lightTheme";

interface Neutral {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    neutral?: Neutral;
  }

  interface PaletteOptions {
    neutral?: Neutral;
  }
}


export interface ThemeConfig {
  direction?: Direction;
  responsiveFontSizes?: boolean;
  mode: "light" | "dark";
}

export const createTheme = (config: ThemeConfig): Theme => {
  let theme = createMuiTheme(
    baseThemeOptions,
    config.mode === "dark" ? darkThemeOptions : lightThemeOptions,
    {
      direction: config.direction,
    }
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};

export const createCustomTheme = (config: ThemeConfig): Theme => {
  let theme = createMuiTheme(
    baseThemeOptions,
    config.mode === "dark" ? darkThemeOptions : lightThemeOptions,
    {
      direction: config.direction,
    }
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
}; 

// export const createCustomTheme = (config: ThemeConfig = {}): Theme => {
//   let themeOptions = themesOptions[config.theme];

//   if (!themeOptions) {
//     console.warn(new Error(`The theme ${config.theme} is not valid`));
//     themeOptions = themesOptions[THEMES.LIGHT];
//   }

//   let theme = createTheme(
//     merge(
//       {},
//       baseOptions,
//       themeOptions,
//       {
//         ...(
//           config.roundedCorners && {
//             shape: {
//               borderRadius: 16
//             }
//           }
//         )
//       },
//       {
//         direction: config.direction
//       }
//     )
//   );

//   if (config.responsiveFontSizes) {
//     theme = responsiveFontSizes(theme);
//   }

//   return theme;
// };
