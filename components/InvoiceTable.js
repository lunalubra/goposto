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
  Stack,
} from "@chakra-ui/react";
import {ChevronLeftIcon} from "@chakra-ui/icons";

import totalPriceCalculator from "@/utils/totalPriceCalculator";
import AddInvoiceButton from "./AddInvoiceButton";

const InvoiceTable = ({data, callback, clients}) => {
  return (
    <Flex
      maxW={["90vw", "100%"]}
      minW={["90vw", "100%"]}
      minH="100%"
      p={5}
      direction="column"
      bg="brand.200"
      rounded={16}
    >
      <Stack direction="row" spacing="auto" alignItems="center" pb={3}>
        <Text fontSize="lg" fontWeight="semibold">
          Invoices
        </Text>
        <AddInvoiceButton clients={clients} callback={callback} />
      </Stack>
      <Box maxH="500px" overflowY="auto">
        <Table>
          <Tbody>
            {data?.invoices?.map(invoice => (
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
                        : invoice?.status === "canceled" && "red"
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
    </Flex>
  );
};

export default InvoiceTable;
