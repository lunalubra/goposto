import {Box, Text} from "@chakra-ui/layout";
import useSWR from "swr";

import ClientDashboard from "@/components/ClientDashboard";
import DashboardHeader from "@/components/DashboarHeader";
import GoogleButton from "@/components/GoogleButton";
import fetcher from "@/utils/fetcher";
import {useAuth} from "@/lib/auth";
import Head from "next/head";

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
        <GoogleButton callback={signinWithGoogle} redirect="client" />
      </>
    );

  if (clientError || invoiceError)
    return (
      <>
        <Head>
          <title>Client dashboard</title>
        </Head>
        <Text>An error ocurred while fetching the data</Text>
      </>
    );

  if (loading || !clientData || !invoiceData)
    return (
      <>
        <Head>
          <title>Client dashboard</title>
        </Head>
        <Text>Loading...</Text>
      </>
    );

  return (
    <Box>
      <Head>
        <title>Client dashboard</title>
      </Head>
      <DashboardHeader />
      <Box maxWidth="1250px" mx="auto">
        <ClientDashboard clientData={clientData} invoiceData={invoiceData} />
      </Box>
    </Box>
  );
}
