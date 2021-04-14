import {Grid, GridItem, Text} from "@chakra-ui/layout";
import {useState} from "react";

import AnalyticsClientTotalClients from "./AnalyticClientTotalClients";
import AnalyticClientMostGains from "./AnalyticClientMostGains";
import AnalyticClientLocation from "./AnalyticClientLocation";
import ClientsCard from "./ClientsCard";
import ClientTable from "./ClientTable";

const ClientDashboard = ({clientData, invoiceData}) => {
  const [clientId, setClientId] = useState(null);

  const getClientId = client => {
    setClientId(client);
  };

  if (clientData.clients.length === 0) return <Text>Create a client!</Text>;

  if (invoiceData.invoices.length === 0)
    return <Text>No invoice information yet </Text>;

  return (
    <Grid gap={[3, 5]} mr={[0, 5]} mt={5} justifyItems={["center", "initial"]}>
      <GridItem
        colStart={[1]}
        colSpan={[2]}
        rowStart={[1]}
        rowSpan={[1]}
        maxW="100%"
      >
        <AnalyticClientMostGains
          clients={clientData.clients}
          invoices={invoiceData.invoices}
          callback={getClientId}
        />
      </GridItem>
      <GridItem
        justifySelf={["end", "none"]}
        colStart={[1, 3]}
        colSpan={[1]}
        rowStart={[2, 1]}
        rowSpan={[1]}
        maxW="100%"
      >
        <AnalyticClientLocation clientData={clientData} />
      </GridItem>
      <GridItem
        justifySelf={["start", "none"]}
        colStart={[2, 1]}
        colSpan={[1]}
        rowStart={[2]}
        rowSpan={[1]}
        maxW="100%"
      >
        <AnalyticsClientTotalClients children={clientData.clients.length} />
      </GridItem>
      <GridItem
        colStart={[1, 2]}
        colSpan={[2]}
        rowStart={[3, 2]}
        rowSpan={[1]}
        maxW="100%"
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
