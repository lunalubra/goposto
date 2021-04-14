import {Grid, GridItem} from "@chakra-ui/layout";
import AnalyticClientLocation from "./AnalyticClientLocation";
import AnalyticClientMostGains from "./AnalyticClientMostGains";
import AnalyticInvoiceGains from "./AnalyticInvoiceGains";

const InboxDashboard = ({invoiceData, clientData}) => {
  return (
    <Grid gap={5} m={5} justifyItems={["center", "initial"]}>
      <GridItem
        colStart={[1]}
        colSpan={[1, 2]}
        rowStart={[1]}
        rowSpan={[1]}
        maxW="100%"
      ></GridItem>
      <GridItem
        colStart={[1, 3]}
        colSpan={[1]}
        rowStart={[3, 1]}
        rowSpan={[1]}
        maxW="100%"
      ></GridItem>
      <GridItem
        colStart={[1]}
        colSpan={[1, 2]}
        rowStart={[2]}
        rowSpan={[1]}
        maxW="100%"
      ></GridItem>
      <GridItem
        colStart={[1, 3]}
        colSpan={[1]}
        rowStart={[4, 2]}
        rowSpan={[1]}
        maxW="100%"
      ></GridItem>
    </Grid>
  );
};

export default InboxDashboard;
