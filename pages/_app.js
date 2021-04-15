import {Box, ChakraProvider} from "@chakra-ui/react";
import Head from "next/head";

import {AuthProvider} from "@/lib/auth";
import theme from "@/styles/theme";

const GlobalStyles = ({children}) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Box minW="100vw" minH="100vh" position="relative">
        <Box
          top={0}
          left={0}
          position="absolute"
          zIndex="0"
          w={["50vw", "30vw"]}
          h={["50vw", "30vw"]}
          bgGradient="radial(#1469ff, #fff )"
          rounded="full"
          sx={{
            filter: "blur( 20.0px )",
          }}
        ></Box>
        <Box
          bottom={0}
          right={0}
          position="absolute"
          zIndex="0"
          w={["50vw", "30vw"]}
          h={["50vw", "30vw"]}
          bgGradient="radial(#342ead, #fff)"
          rounded="full"
          sx={{
            filter: "blur( 20.0px )",
          }}
        ></Box>
        <Box position="relative" zIndex="1">
          {children}
        </Box>
      </Box>
    </>
  );
};

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <GlobalStyles>
          <Component {...pageProps} />
        </GlobalStyles>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
