import { AuthProvider } from "@/lib/auth";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
