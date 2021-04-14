import {Box, Text} from "@chakra-ui/layout";
import useSWR from "swr";

import DashboardHeader from "@/components/DashboarHeader";
import InboxDashboard from "@/components/InboxDashboard";
import fetcher from "@/utils/fetcher";
import {useAuth} from "@/lib/auth";
import GoogleButton from "@/components/GoogleButton";
import Head from "next/head";

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
        <GoogleButton callback={signinWithGoogle} />
      </>
    );

  if (clientError || invoiceError)
    return (
      <>
        <Head>
          <title>Welcome!</title>
        </Head>
        <Text>An error ocurred while fetching the data </Text>
      </>
    );

  if (loading || !clientData || !invoiceData)
    return (
      <>
        <Head>
          <title>Welcome!</title>
        </Head>
        <Text>Loading ...</Text>
      </>
    );

  return (
    <>
      <Head>
        <title>Welcome!</title>
      </Head>
      <DashboardHeader />
      <Box maxWidth="1250px" mx="auto">
        <InboxDashboard
          user={user}
          clientData={clientData}
          invoiceData={invoiceData}
        />
      </Box>
    </>
  );
}
