import {createBreakpoints} from "@chakra-ui/theme-tools";
import {extendTheme} from "@chakra-ui/react";

const breakpoints = ["0em", "62em"];

const theme = extendTheme({
  breakpoints,
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  colors: {
    brand: {
      100: "#f2f5fa",
      200: "#ffffff",
      300: "#000000",
      400: "#99f",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.100",
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
