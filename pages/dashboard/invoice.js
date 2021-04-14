import {Box, Text} from "@chakra-ui/layout";
import Head from "next/head";
import useSWR from "swr";

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
        <GoogleButton callback={signinWithGoogle} redirect="invoice" />
      </>
    );

  if (clientError || invoiceError)
    return (
      <>
        <Head>
          <title>Invoice Dashboard</title>
        </Head>
        <Text>An error ocurred while fetching the data</Text>
      </>
    );

  if (loading || !clientData || !invoiceData)
    return (
      <>
        <Head>
          <title>Invoice Dashboard</title>
        </Head>
        <Text>Loading...</Text>
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
