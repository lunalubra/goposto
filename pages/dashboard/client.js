import {Box, Grid, GridItem, Text} from "@chakra-ui/layout";
import useSWR from "swr";

import ClientDashboard from "@/components/ClientDashboard";
import DashboardHeader from "@/components/DashboarHeader";
import fetcher from "@/utils/fetcher";
import {useAuth} from "@/lib/auth";
import GoogleButton from "@/components/GoogleButton";

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
    return <GoogleButton callback={signinWithGoogle} redirect="client" />;

  if (clientError || invoiceError)
    return <Text>An error ocurred while fetching the data</Text>;

  if (loading || !clientData || !invoiceData) return <Text>Loading...</Text>;

  return (
    <>
      <DashboardHeader />
      <Box maxWidth="1250px" mx="auto">
        <ClientDashboard clientData={clientData} invoiceData={invoiceData} />
      </Box>
    </>
  );
}
