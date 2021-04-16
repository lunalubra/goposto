import {Flex, Grid, GridItem, Link, Text} from "@chakra-ui/layout";
import NextLink from "next/link";
import {useState} from "react";

import AnalyticsClientTotalClients from "./AnalyticClientTotalClients";
import AnalyticClientMostGains from "./AnalyticClientMostGains";
import AnalyticClientLocation from "./AnalyticClientLocation";
import AddClientButtonModal from "./AddClientButtonModal";
import DashboardSkeleton from "./DashboardSkeleton";
import ClientTable from "./ClientTable";
import ClientsCard from "./ClientsCard";

const ClientDashboard = ({clientData, invoiceData}) => {
  const [clientId, setClientId] = useState(null);

  const getClientId = client => {
    setClientId(client);
  };

  if (clientData.clients.length === 0)
    return (
      <DashboardSkeleton>
        <Flex direction="column" justifyItems="center" alignItems="center">
          <Text mb={5}>Create your first client!</Text>
          <AddClientButtonModal callback={getClientId} />
        </Flex>
      </DashboardSkeleton>
    );

  return (
    <Grid gap={[3, 5]} mr={[0, 5]} mt={5} justifyItems={["center", "initial"]}>
      <GridItem
        colStart={[1]}
        colSpan={[2]}
        rowStart={[1]}
        rowSpan={[1]}
        maxW="100%"
      >
        {invoiceData.invoices.length === 0 ? (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            minW="100%"
            minH="100%"
            bg="brand.400"
            rounded={16}
          >
            <NextLink href="/dashboard/invoice">
              <Link href="/dashboard/invoice">
                <Text fontSize="lg" fontWeight="semibold">
                  Start adding inovices to unlock the full potential!
                </Text>
              </Link>
            </NextLink>
          </Flex>
        ) : (
          <AnalyticClientMostGains
            clients={clientData.clients}
            invoices={invoiceData.invoices}
            callback={getClientId}
          />
        )}
      </GridItem>
      <GridItem
        justifySelf={["end", "none"]}
        colStart={[1, 3]}
        colSpan={[1]}
        rowStart={[2, 1]}
        rowSpan={[1]}
        maxW={["90%", "100%"]}
      >
        <AnalyticClientLocation clientData={clientData} />
      </GridItem>
      <GridItem
        justifySelf={["start", "none"]}
        colStart={[2, 1]}
        colSpan={[1]}
        rowStart={[2]}
        rowSpan={[1]}
        maxW={["90%", "100%"]}
      >
        <AnalyticsClientTotalClients children={clientData.clients.length} />
      </GridItem>
      <GridItem
        colStart={[1, 2]}
        colSpan={[2]}
        rowStart={[3, 2]}
        rowSpan={[1]}
        maxW={["90%", "100%"]}
      >
        <ClientTable data={clientData} callback={getClientId} />
      </GridItem>
      <GridItem
        colStart={[1, 4]}
        colSpan={[2, 1]}
        rowStart={[4, 1]}
        rowSpan={[2]}
      >
        <ClientsCard
          data={clientData}
          clientId={clientId}
          callback={getClientId}
        />
      </GridItem>
    </Grid>
  );
};

export default ClientDashboard;
