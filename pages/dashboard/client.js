import {Box, Flex, Text} from "@chakra-ui/layout";
import Head from "next/head";
import useSWR from "swr";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import ClientDashboard from "@/components/ClientDashboard";
import DashboardHeader from "@/components/DashboarHeader";
import GoogleButton from "@/components/GoogleButton";
import fetcher from "@/utils/fetcher";
import {useAuth} from "@/lib/auth";

export default function ClientDashboardPage() {
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
          <title>Client dashboard</title>
        </Head>
        <Box as="main">
          <DashboardSkeleton>
            <Flex direction="column" alignItems="center">
              <Text>Your are not logged </Text>
              <GoogleButton callback={signinWithGoogle} redirect="client" />
            </Flex>
          </DashboardSkeleton>
        </Box>
      </>
    );

  if (clientError || invoiceError)
    return (
      <>
        <Head>
          <title>Client dashboard</title>
        </Head>
        <Box as="main">
          <DashboardSkeleton>
            <Text>An error ocurred while fetching the data</Text>
          </DashboardSkeleton>
        </Box>
      </>
    );

  if (loading || !clientData || !invoiceData)
    return (
      <>
        <Head>
          <title>Client dashboard</title>
        </Head>
        <Box as="main">
          <DashboardSkeleton>
            <Text>Loading...</Text>
          </DashboardSkeleton>
        </Box>
      </>
    );

  return (
    <Box>
      <Head>
        <title>Client dashboard</title>
      </Head>
      <DashboardHeader />
      <Box as="main" maxWidth="1250px" mx="auto">
        <ClientDashboard clientData={clientData} invoiceData={invoiceData} />
      </Box>
    </Box>
  );
}
