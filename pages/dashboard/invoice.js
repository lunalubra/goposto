import {Box, Flex, Text} from "@chakra-ui/layout";

import InvoiceDashboard from "@/components/InvoiceDashboard";
import DashboardHeader from "@/components/DashboarHeader";
import {useAuth} from "@/lib/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function InvoiceDashboardPage() {
  const {user, loading} = useAuth();

  const {data: clientData, error: clientError} = useSWR(
    user ? ["/api/clients", user.token] : null,
    fetcher
  );
  const {data: invoiceData, error: invoiceError} = useSWR(
    user ? ["/api/invoices", user.token] : null,
    fetcher
  );

  if (clientError || invoiceError)
    return <Text>An error ocurred while fetching the data </Text>;

  if (loading || !clientData || !invoiceData) return <Text>Loading ...</Text>;

  if (!user) return <Button onClick={e => signinWithGoogle()}>SignIn</Button>;

  return (
    <>
      <DashboardHeader />
      <Box maxWidth="1250px" mx="auto">
        <InvoiceDashboard invoiceData={invoiceData} clientData={clientData} />
      </Box>
    </>
  );
}
