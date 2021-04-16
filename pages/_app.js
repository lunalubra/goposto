import {Box, ChakraProvider} from "@chakra-ui/react";
import {DefaultSeo} from "next-seo";
import Head from "next/head";

import {AuthProvider} from "@/lib/auth";
import theme from "@/styles/theme";
import SEO from "next-seo.config";

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
          bgImage="url('/gradient.jpg')"
          rounded="full"
          sx={{
            filter: "blur( 100.0px )",
          }}
        ></Box>
        <Box
          bottom={0}
          right={0}
          position="absolute"
          zIndex="0"
          w={["50vw", "30vw"]}
          h={["50vw", "30vw"]}
          bgImage="url('/gradient.jpg')"
          rounded="full"
          sx={{
            filter: "blur( 100.0px )",
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
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </GlobalStyles>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
