import {Box, Flex, Text} from "@chakra-ui/layout";
import Head from "next/head";
import useSWR from "swr";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import DashboardHeader from "@/components/DashboarHeader";
import InboxDashboard from "@/components/InboxDashboard";
import GoogleButton from "@/components/GoogleButton";
import fetcher from "@/utils/fetcher";
import {useAuth} from "@/lib/auth";

export default function Home() {
  const {user, loading, signinWithGoogle} = useAuth();

  const {data: clientData, error: clientError} = useSWR(
    user ? ["/api/clients", user.token] : null,
    fetcher
  );
  const {data: invoiceData, error: invoiceError} = useSWR(
    user ? ["/api/invoices", user.token] : null,
    fetcher
  );

  if (!user)
    return (
      <>
        <Head>
          <title>Welcome!</title>
        </Head>
        <Box as="main">
          <DashboardSkeleton>
            <Flex direction="column" alignItems="center">
              <Text color="white" fontSize="lg" fontWeight="semibold">
                Your are not logged{" "}
              </Text>
              <GoogleButton callback={signinWithGoogle} />
            </Flex>
          </DashboardSkeleton>
        </Box>
      </>
    );

  if (clientError || invoiceError)
    return (
      <>
        <Head>
          <title>Welcome!</title>
        </Head>
        <Box as="main">
          <DashboardSkeleton>
            <Text color="white" fontSize="lg" fontWeight="semibold">
              An error ocurred while fetching the data{" "}
            </Text>
          </DashboardSkeleton>
        </Box>
      </>
    );

  if (loading || !clientData || !invoiceData)
    return (
      <>
        <Head>
          <title>Welcome!</title>
        </Head>
        <Box as="main">
          <DashboardSkeleton>
            <Text color="white" fontSize="lg" fontWeight="semibold">
              Loading ...
            </Text>
          </DashboardSkeleton>
        </Box>
      </>
    );

  return (
    <>
      <Head>
        <title>Welcome!</title>
      </Head>
      <DashboardHeader />
      <Box as="main" maxWidth="1250px" mx="auto">
        <InboxDashboard
          user={user}
          clientData={clientData}
          invoiceData={invoiceData}
        />
      </Box>
    </>
  );
}
