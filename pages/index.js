import {Flex, Link, Text} from "@chakra-ui/layout";
import {EditIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/button";
import {Image} from "@chakra-ui/image";
import NextLink from "next/link";
import Head from "next/head";

import GoogleButton from "@/components/GoogleButton";
import {useAuth} from "@/lib/auth";

export default function Home() {
  const {user, loading, signinWithGoogle} = useAuth();

  return (
    <>
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
      <Flex position="relative" direction="column" minW="100vw" minH="100vh">
        <Flex
          position="sticky"
          p={2}
          minW="100vw"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image src="/posto.svg" maxW="100px" />
          {loading ? (
            <Text>Loading</Text>
          ) : user ? (
            <NextLink href="/dashboard/client" passHref>
              <Button>
                <Link fontSize="lg">Go to dashboard</Link>
              </Button>
            </NextLink>
          ) : (
            <GoogleButton callback={signinWithGoogle} />
          )}
        </Flex>
        <Flex alignItems="center" mt={["96px"]} direction="column">
          <Text
            bgGradient="linear(to-l, #7928CA, #1262ff)"
            bgClip="text"
            fontSize={"5xl"}
            fontWeight="extrabold"
            lineHeight={"60px"}
            textAlign="center"
          >
            Go the easy way.
          </Text>
          <Text
            mt={["20px"]}
            fontSize="xl"
            fontWeight="semibold"
            textAlign="center"
          >
            Posto is a new way of handeling invoices & clients for freelancers
          </Text>
          <GoogleButton mt={5} icon={<EditIcon />} callback={signinWithGoogle}>
            Try it for free!
          </GoogleButton>
        </Flex>
      </Flex>
    </>
  );
}
