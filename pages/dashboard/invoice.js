import {Box, Flex, Text} from "@chakra-ui/layout";

import useSWR from "swr";

import InvoiceDashboard from "@/components/InvoiceDashboard";
import DashboardHeader from "@/components/DashboarHeader";
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
    return <GoogleButton callback={signinWithGoogle} redirect="invoice" />;

  if (clientError || invoiceError)
    return <Text>An error ocurred while fetching the data</Text>;

  if (loading || !clientData || !invoiceData) return <Text>Loading...</Text>;

  return (
    <>
      <DashboardHeader />
      <Box maxWidth="1250px" mx="auto">
        <InvoiceDashboard invoiceData={invoiceData} clientData={clientData} />
      </Box>
    </>
  );
}
