import {Flex, Text} from "@chakra-ui/layout";

import totalPriceCalculator from "@/utils/totalPriceCalculator";

const AnalyticTotalGains = ({invoices}) => {
  if (!invoices || invoices.length === 0) return <Text>No invoices!</Text>;

  const totalAmountForEachInvoice = invoices.map(invoice => {
    const totalAmount = totalPriceCalculator(invoice.items);
    return totalAmount;
  });

  const totalAmount = totalAmountForEachInvoice.reduce(
    (acc, currVal) => acc + currVal
  );

  return (
    <Flex
      bg="brand.100"
      direction="column"
      alignItems="center"
      p={2}
      rounded={10}
    >
      <Flex direction="row" alignItems="center">
        $
        <Text fontSize="lg" fontWeight="semibold">
          {totalAmount}
        </Text>
      </Flex>
    </Flex>
  );
};

export default AnalyticTotalGains;
