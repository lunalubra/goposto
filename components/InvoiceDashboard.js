import {Grid, GridItem, Text} from "@chakra-ui/layout";
import {useState} from "react";

import AnalyticInvoiceGains from "./AnalyticInvoiceGains";
import InvoiceTable from "./InvoiceTable";
import InvoiceCard from "./InvoiceCard";

const InvoiceDashboard = ({invoiceData, clientData}) => {
  const [invoiceId, setInvoiceId] = useState(null);

  const getInvoiceId = newInvoiceId => {
    setInvoiceId(newInvoiceId);
  };

  if (invoiceData.invoices.length === 0) {
    return <Text>Create an invoice!</Text>;
  }

  return (
    <Grid gap={5} m={5} justifyItems={["center", "initial"]}>
      <GridItem
        rowStart={[1]}
        rowSpan={[1]}
        colStart={[1]}
        colSpan={[1]}
        maxW="100%"
      >
        <InvoiceCard
          clientData={clientData.clients}
          data={invoiceData}
          invoiceId={invoiceId}
          callback={getInvoiceId}
        />
      </GridItem>
      <GridItem
        rowStart={[2]}
        rowSpan={[1]}
        colStart={[1]}
        colSpan={[1]}
        maxW="100%"
      >
        <AnalyticInvoiceGains invoiceData={invoiceData} />
      </GridItem>
      <GridItem
        rowStart={[3, 1]}
        rowSpan={[1, 2]}
        colStart={[1, 2]}
        colSpan={[1]}
        maxW="100%"
      >
        <InvoiceTable
          data={invoiceData}
          clients={clientData.clients}
          callback={getInvoiceId}
        />
      </GridItem>
    </Grid>
  );
};

export default InvoiceDashboard;
