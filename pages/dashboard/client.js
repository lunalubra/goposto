import {Box, Text} from "@chakra-ui/layout";
import useSWR from "swr";

import ClientDashboard from "@/components/ClientDashboard";
import DashboardHeader from "@/components/DashboarHeader";
import fetcher from "@/utils/fetcher";
import {useAuth} from "@/lib/auth";

export default function ClientDashboardPage() {
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
        <ClientDashboard clientData={clientData} invoiceData={invoiceData} />
      </Box>
    </>
  );
}
