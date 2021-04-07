import {
    Table,
    Tbody,
    Tr,
    Td,
    IconButton,
    Box,
    Badge,
    Text,
    Flex,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import totalPriceCalculator from "@/utils/totalPriceCalculator";

const InvoiceTable = ({ data, callback }) => {
    return (
        <Box maxH="500px" overflowY="auto">
            <Table variant="simple">
                <Tbody>
                    {data?.invoices?.map((invoice) => (
                        <Tr key={invoice?.id}>
                            <Td>
                                <IconButton
                                    onClick={() => {
                                        callback(invoice?.id);
                                    }}
                                    icon={<ChevronLeftIcon />}
                                ></IconButton>
                            </Td>
                            <Td>
                                <Flex direction="row">
                                    #
                                    <Text fontWeight="semibold">
                                        {invoice?.id.substring(0, 5)}
                                    </Text>
                                </Flex>
                            </Td>
                            <Td>{invoice?.clientObj?.name}</Td>
                            <Td>{totalPriceCalculator(invoice?.items)}$</Td>
                            <Td>
                                <Badge
                                    p={1}
                                    colorScheme={
                                        invoice?.status === "pending"
                                            ? "purple"
                                            : invoice?.status === "paid"
                                            ? "green"
                                            : invoice?.status === "canceled" &&
                                              "red"
                                    }
                                >
                                    {invoice?.status}
                                </Badge>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default InvoiceTable;
