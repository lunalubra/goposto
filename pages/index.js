import {Box, Text} from "@chakra-ui/layout";
import Head from "next/head";

import GoogleButton from "@/components/GoogleButton";
import {useAuth} from "@/lib/auth";

export default function Home() {
  const {user, loading, signinWithGoogle, signout} = useAuth();

  if (loading)
    return (
      <>
        <Head>
          <title>logo</title>
        </Head>
        <Text>Loading...</Text>
      </>
    );

  if (!user)
    return (
      <>
        <Head>
          <title>logo</title>
        </Head>
        <GoogleButton callback={signinWithGoogle} />
      </>
    );

  return (
    <Box>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('invoice-app-auth')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
        <title>logo</title>
      </Head>
      <Box>You are alredy registered!</Box>
    </Box>
  );
}
