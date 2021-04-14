import {
  Bar,
  BarChart,
  ComposedChart,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import {Flex, Stack} from "@chakra-ui/layout";
import {Tooltip} from "@chakra-ui/react";
import {Avatar} from "@chakra-ui/avatar";
import {useEffect, useState} from "react";

import totalPriceCalculator from "@/utils/totalPriceCalculator";
import CustomLabel from "./CustomLabel";

const AnalyticClientMostGains = ({clients, invoices, callback}) => {
  const [width, setWidth] = useState(0);

  let formatedClients = clients.map(client => {
    const clientInvoices = invoices.filter(
      invoice => invoice.clientObj.id === client.id
    );

    const clientTotalOutcome = clientInvoices.map(invoice =>
      totalPriceCalculator(invoice.items)
    );

    return {
      name: client.name,
      imageUrl: client.image,
      amount:
        clientTotalOutcome && clientTotalOutcome.length > 0
          ? clientTotalOutcome.reduce((acc, currVal) => acc + currVal)
          : 0,
    };
  });

  useEffect(() => {
    formatedClients = clients.map(client => {
      const clientInvoices = invoices.filter(
        invoice => invoice.clientObj.id === client.id
      );

      const clientTotalOutcome = clientInvoices.map(invoice =>
        totalPriceCalculator(invoice.items)
      );

      return {
        name: client.name,
        imageUrl: client.image,
        amount:
          clientTotalOutcome && clientTotalOutcome.length > 0
            ? clientTotalOutcome.reduce((acc, currVal) => acc + currVal)
            : 0,
      };
    });
  }, [clients, invoices]);

  return (
    <Flex
      bg="brand.200"
      alignItems="center"
      justifyContent="center"
      minW={["90vw", "100%"]}
      maxW="100vw"
      minH="100%"
      rounded={16}
      p={[5, 10]}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg="brand.400"
        rounded={8}
        overflowX="auto"
        minW="100%"
        minH="100%"
      >
        <ResponsiveContainer width="100%" height="100%" aspect={3}>
          <BarChart data={formatedClients}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#99f" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#fff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Bar dataKey="amount" fill="url(#colorUv)">
              <LabelList
                dataKey="amount"
                position="insideTop"
                content={
                  <CustomLabel
                    arrayLength={formatedClients.length}
                    callback={setWidth}
                  />
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <Flex
          direction="row"
          justifyContent="space-around"
          mt={[-5]}
          pb={4}
          minW="100%"
        >
          {formatedClients.map(client => (
            <Tooltip
              key={client.name}
              label={client.name}
              aria-label="A tooltip"
            >
              <Avatar
                onClick={() => callback(client.id)}
                src={client.imageUrl}
              />
            </Tooltip>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AnalyticClientMostGains;
