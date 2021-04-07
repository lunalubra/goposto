import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
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
    components: {},
    styles: {
        global: {
            body: {
                bg: "brand.100",
                minHeight: "100vh",
                maxWidth: "1250px",
                mx: "auto",
            },
        },
    },
});

export default theme;
