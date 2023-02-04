import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    black: {
      50: "#F2F2F2",
      100: "#DBDBDB",
      200: "#C4C4C4",
      300: "#ADADAD",
      400: "#969696",
      500: "#1A1A1A",
      600: "#666666",
      700: "#4D4D4D",
      800: "#333333",
      900: "#1A1A1A",
    },
  },
  fonts: {
    body: `"Helvetica Neue", Helvetica, sans-serif`,
    heading: `"Helvetica Neue", Helvetica, sans-serif`,
  },
});

export default theme;
