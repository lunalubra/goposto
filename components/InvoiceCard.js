import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/table";
import totalPriceCalculator from "@/utils/totalPriceCalculator";
import {Badge, Flex, Text} from "@chakra-ui/layout";
import {useEffect} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import DeleteInvoiceButton from "./DeleteInvoiceButton";
import UpdateInvoiceButton from "./UpdateInvoiceButton";

const InvoiceCard = ({clientData, data, invoiceId, callback}) => {
  const router = useRouter();

  let invoice = invoiceId
    ? data?.invoices.find(invoice => invoice.id === invoiceId)
    : router.query.id
    ? data?.invoices.find(invoice => invoice.id === router.query.id)
    : data?.invoices?.[0];

  useEffect(() => {
    invoice = invoiceId
      ? data?.invoices.find(invoice => invoice.id === invoiceId)
      : router.query.id
      ? data?.invoices.find(invoice => invoice.id === router.query.id)
      : data?.invoices?.[0];
  }, [invoiceId]);

  if (!invoice) return <Text>No invoice</Text>;

  return (
    <Flex
      maxW={["90vw", "100%"]}
      minW={["90vw", "100%"]}
      minH="100%"
      borderColor="brand.200"
      borderWidth={2}
      rounded={16}
      direction={["column", "row"]}
    >
      <Flex
        justifyContent="space-between"
        p={5}
        roundedLeft={[0, 16]}
        roundedTop={[16, 0]}
        bg="brand.200"
        direction="column"
      >
        <Flex direction="column">
          <Flex direction="row">
            #
            <Text pr={2} fontWeight="semibold">
              {invoice?.id.substring(0, 5)}
            </Text>
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
          </Flex>
          <Flex direction="row" alignItems="center">
            <Link
              href={`/dashboard/client?id=${invoice.clientObj.id}`}
              passHref
            >
              <Text as="a" fontSize="xl" fontWeight="semibold">
                {invoice?.clientObj.name}
              </Text>
            </Link>
          </Flex>
          <Text>{invoice?.description}</Text>
        </Flex>
        <Flex direction="row" alignSelf={["flex-end", "flex-start"]}>
          <DeleteInvoiceButton
            callback={callback}
            invoiceId={invoiceId || invoice?.id}
          />
          <UpdateInvoiceButton
            invoiceObj={invoice}
            clients={clientData}
            callback={callback}
          />
        </Flex>
      </Flex>
      <Flex minH="100%" justifyContent="space-between" direction="column">
        <Flex direction="column" overflow="auto" maxW="100%">
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Qty</Th>
                <Th>Price</Th>
                <Th>Total price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {invoice?.items?.map(item => (
                <Tr key={item?.name}>
                  <Td>{item.name}</Td>
                  <Td>{item.qty}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.price * item.qty}$</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        <Flex
          direction="row"
          justifyContent="space-between"
          justifySelf="flex-end"
          p={3}
          bg="brand.400"
          roundedBottomRight={12}
          roundedBottomLeft={[12, 0]}
        >
          <Text color="black" fontSize="lg">
            Total amount
          </Text>
          &nbsp;
          <Text color="black" fontWeight="semibold" fontSize="lg">
            {totalPriceCalculator(invoice?.items)}$
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InvoiceCard;
