import { Grid, GridItem, Text } from "@chakra-ui/layout";
import useSWR from "swr";

import AnalyticInvoiceGains from "./AnalyticInvoiceGains";
import ClientsCard from "./ClientsCard";
import InvoiceCard from "./InvoiceCard";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";

const InboxDashboard = () => {
    const { user } = useAuth();
    const { data: clientData } = useSWR(
        user ? ["/api/clients", user.token] : null,
        fetcher
    );
    const { data: invoiceData } = useSWR(
        user ? ["/api/invoices", user.token] : null,
        fetcher
    );

    if (!invoiceData) return <Text>Loading...</Text>;

    return (
        <Grid
            bg="brand.200"
            maxW="100%"
            maxH={["1750px", null, "600px"]}
            borderRadius="32"
            p={[5, 5, 10]}
            gap={5}
        >
            <GridItem
                maxW="100%"
                minW={["100%"]}
                rowStart={["3", "3", "1"]}
                colStart="1"
                rowSpan={["1", "1", "2"]}
                colSpan="2"
            >
                <InvoiceCard
                    clientData={clientData?.clients}
                    data={invoiceData}
                />
            </GridItem>
            <GridItem
                maxW={["100%", "100%", "none"]}
                minW="100%"
                minH="100%"
                rowStart={["1", "1", "3"]}
                colStart="1"
                rowSpan="1"
                colSpan="2"
            >
                <AnalyticInvoiceGains invoiceData={invoiceData} />
            </GridItem>
            <GridItem
                maxW={["100%", "100%", "none"]}
                minW={["100%"]}
                rowStart={["2", "2", "3"]}
                colStart={["1", "1", "3"]}
                rowSpan="1"
                colSpan={["2", "2", "1"]}
            ></GridItem>
            <GridItem
                maxW={["100%", "100%", "none"]}
                minW={["100%"]}
                rowStart={["4", "4", "1"]}
                colStart={["1", "1", "3"]}
                rowSpan="3"
                colSpan="2"
            >
                <ClientsCard data={clientData} />
            </GridItem>
        </Grid>
    );
};

export default InboxDashboard;
