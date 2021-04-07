import { Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import useSWR from "swr";

import AddInvoiceButton from "./AddInvoiceButton";
import InvoiceTable from "./InvoiceTable";
import InvoiceCard from "./InvoiceCard";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import AnalyticInvoiceGains from "./AnalyticInvoiceGains";

const InvoiceDashboard = () => {
    const { user } = useAuth();
    const { data: clientData } = useSWR(
        user ? ["/api/clients", user.token] : null,
        fetcher
    );
    const { data: invoiceData } = useSWR(
        user ? ["/api/invoices", user.token] : null,
        fetcher
    );

    const [invoiceId, setInvoiceId] = useState(null);

    if (!invoiceData) return <Text>Loading...</Text>;

    const getInvoiceId = (newInvoiceId) => {
        setInvoiceId(newInvoiceId);
    };

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
                colSpan={["2", "2", "3"]}
            >
                <InvoiceCard
                    clientData={clientData?.clients}
                    data={invoiceData}
                    invoiceId={invoiceId}
                    callback={getInvoiceId}
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
            >
                <Text>Analityc 2</Text>
            </GridItem>
            <GridItem
                maxW={["100%", "100%", "none"]}
                minW={["100%"]}
                rowStart={["4", "4", "1"]}
                colStart={["1", "1", "4"]}
                rowSpan="3"
                colSpan="2"
            >
                <Stack direction="row" spacing="auto" alignItems="center">
                    <Text fontSize="lg" fontWeight="semibold">
                        Invoices
                    </Text>
                    <AddInvoiceButton
                        clients={clientData?.clients}
                        callback={getInvoiceId}
                    />
                </Stack>
                <InvoiceTable data={invoiceData} callback={getInvoiceId} />
            </GridItem>
        </Grid>
    );
};

export default InvoiceDashboard;
