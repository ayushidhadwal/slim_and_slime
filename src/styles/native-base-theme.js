import { extendTheme } from "native-base";

export const nativeBaseTheme = extendTheme({
  fontConfig: {
    OpenSans: {
      100: {
        normal: "OpenSans-Light",
        italic: "OpenSans-LightItalic",
      },
      200: {
        normal: "OpenSans-Light",
        italic: "OpenSans-LightItalic",
      },
      300: {
        normal: "OpenSans-Light",
        italic: "OpenSans-LightItalic",
      },
      400: {
        normal: "OpenSans-Regular",
        italic: "OpenSans-Italic",
      },
      500: {
        normal: "OpenSans-Medium",
      },
      600: {
        normal: "OpenSans-Medium",
        italic: "OpenSans-MediumItalic",
      },
      700: {
        normal: "OpenSans-SemiBold",
        italic: "OpenSans-SemiBoldItalic",
      },
      800: {
        normal: "OpenSans-Bold",
        italic: "OpenSans-BoldItalic",
      },
      900: {
        normal: "OpenSans-ExtraBold",
        italic: "OpenSans-ExtraBoldItalic",
      },
    },
  },
  fonts: {
    heading: "OpenSans",
    body: "OpenSans",
    mono: "OpenSans",
  },
  colors: {
    primary: {
      50: "#d1e3f0",
      100: "#bcd7e9",
      200: "#a5c8e2",
      300: "#8bb9d9",
      400: "#6ca6cf",
      500: "#468fc3",
      600: "#1670b0",
    },
    muted: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
  },
});
