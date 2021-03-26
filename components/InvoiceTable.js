import { Box, Flex, Heading } from "@chakra-ui/layout";
import useSWR from "swr";

import HandleInvoiceButtonModal from "./HandleInvoiceButtonModal";
import { Table, Th, Tr } from "@/components/Table";
import fetcher from "@/utils/fetcher";
import InvoiceRow from "./InvoiceRow";
import { useAuth } from "@/lib/auth";

const InvoiceTable = () => {
    const { user } = useAuth();
    const { data } = useSWR(
        user ? ["/api/userInvoices", user.token] : null,
        fetcher
    );

    return (
        <Box>
            <Flex>
                <Heading>Invoices</Heading>
                <HandleInvoiceButtonModal>Add Button</HandleInvoiceButtonModal>
            </Flex>
            <Table>
                <thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Date</Th>
                        <Th>Name</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                        <Th>{""}</Th>
                    </Tr>
                </thead>
                <tbody>
                    {data?.invoices.map((invoice) => (
                        <InvoiceRow {...invoice} />
                    ))}
                </tbody>
            </Table>
        </Box>
    );
};

export default InvoiceTable;
