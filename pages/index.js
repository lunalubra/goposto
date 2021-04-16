import {Flex, Link, Text} from "@chakra-ui/layout";
import {EditIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/button";
import NextLink from "next/link";
import Image from "next/image";
import Head from "next/head";

import GoogleButton from "@/components/GoogleButton";
import {useAuth} from "@/lib/auth";
import WelcomeCard from "@/components/WelcomeCard";

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
      </Head>
      <Flex bg="white" position="relative" direction="column" minW="100vw">
        <Flex
          position="sticky"
          p={2}
          minW="100vw"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image src="/posto.svg" width={80} height={20} alt="logo" />
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
            pb="96px"
          >
            Posto is a new way of handeling invoices & clients for freelancers
          </Text>
        </Flex>
      </Flex>
      <Flex
        marginY={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <WelcomeCard />
        <GoogleButton mt={5} icon={<EditIcon />} callback={signinWithGoogle}>
          Try it for free!
        </GoogleButton>
      </Flex>
    </>
  );
}
