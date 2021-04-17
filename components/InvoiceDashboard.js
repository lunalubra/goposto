import {Flex, Grid, GridItem, Text} from "@chakra-ui/layout";
import {useState} from "react";

import AnalyticInvoiceGains from "./AnalyticInvoiceGains";
import DashboardSkeleton from "./DashboardSkeleton";
import AddInvoiceButton from "./AddInvoiceButton";
import InvoiceTable from "./InvoiceTable";
import InvoiceCard from "./InvoiceCard";

const InvoiceDashboard = ({invoiceData, clientData}) => {
  const [invoiceId, setInvoiceId] = useState(null);

  const getInvoiceId = newInvoiceId => {
    setInvoiceId(newInvoiceId);
  };

  if (invoiceData.invoices.length === 0) {
    return (
      <DashboardSkeleton>
        <Flex direction="column" justifyItems="center" alignItems="center">
          <Text color="white" fontSize="lg" fontWeight="semibold" mb={5}>
            Create an invoice!
          </Text>
          <AddInvoiceButton
            callback={getInvoiceId}
            clients={clientData.clients}
          />
        </Flex>
      </DashboardSkeleton>
    );
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
