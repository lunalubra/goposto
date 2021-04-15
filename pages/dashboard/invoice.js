import {Box, Flex, Text} from "@chakra-ui/layout";
import Head from "next/head";
import useSWR from "swr";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import InvoiceDashboard from "@/components/InvoiceDashboard";
import DashboardHeader from "@/components/DashboarHeader";
import GoogleButton from "@/components/GoogleButton";
import fetcher from "@/utils/fetcher";
import {useAuth} from "@/lib/auth";

export default function InvoiceDashboardPage() {
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
          <title>Invoice Dashboard</title>
        </Head>
        <DashboardSkeleton>
          <Flex direction="column" alignItems="center">
            <Text>Your are not logged </Text>
            <GoogleButton callback={signinWithGoogle} redirect="invoice" />
          </Flex>
        </DashboardSkeleton>
      </>
    );

  if (loading || !clientData || !invoiceData)
    return (
      <>
        <Head>
          <title>Invoice Dashboard</title>
        </Head>
        <DashboardSkeleton>
          <Text>Loading...</Text>
        </DashboardSkeleton>
      </>
    );

  if (clientError || invoiceError)
    return (
      <>
        <Head>
          <title>Invoice Dashboard</title>
        </Head>
        <DashboardSkeleton>
          <Text>An error ocurred while fetching the data</Text>
        </DashboardSkeleton>
      </>
    );

  return (
    <>
      <Head>
        <title>Invoice Dashboard</title>
      </Head>
      <DashboardHeader />
      <Box maxWidth="1250px" mx="auto">
        <InvoiceDashboard invoiceData={invoiceData} clientData={clientData} />
      </Box>
    </>
  );
}
