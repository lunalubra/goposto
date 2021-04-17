import totalPriceCalculator from "@/utils/totalPriceCalculator";
import {Flex, Text} from "@chakra-ui/layout";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";

import AnalyticTotalGains from "./AnalyticTotalGains";

const CustomLabel = ({x, y, value, index, arrayLength}) => {
  const width = 40,
    height = width / 2;

  if (index === 0 || index === arrayLength - 1) {
    return <div></div>;
  }

  return (
    <Flex as="g">
      <rect
        x={x - (width + 8) / 2}
        y={y - (height + 10) / 2}
        rx={5}
        ry={5}
        width={width + 8}
        height={height + 8}
        style={{
          fill: "#fff",
          opacity: "0.5",
        }}
      />
      <Text
        as="text"
        fontWeight="semibold"
        fontSize="sm"
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        ${value}
      </Text>
    </Flex>
  );
};

export default function AnalyticInvoiceGains({invoiceData: {invoices}}) {
  const invoiceGainsData = invoices
    ?.map(invoice => {
      const totalAmount = totalPriceCalculator(invoice.items);
      const createdAt = new Date(invoice?.createdAt?._seconds * 1000);
      const createdAtFormated = createdAt
        .toString()
        .split(" ")
        .slice(0, 3)
        .join(" ");
      return {createdAtFormated, totalAmount};
    })
    .reverse();

  return (
    <Flex
      maxW={["90vw", "100%"]}
      minW={["90vw", "100%"]}
      minH="100%"
      direction="column"
      bg="brand.200"
      rounded={16}
    >
      <Flex
        my={5}
        mx={12}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="semibold">
          Total gains
        </Text>
        <AnalyticTotalGains invoices={invoices} />
      </Flex>
      <Flex alignSelf="center" mb={[10, 5]} w="90%" h="75%">
        <Flex
          minW="100%"
          minH="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
          bgImage="url('/gradient.jpg')"
          rounded={16}
        >
          <Flex minW={["105%", "102%"]} minH="100%" alignItems="flex-end">
            <ResponsiveContainer width="100%" height="100%" aspect={2}>
              <AreaChart width={730} height={250} data={invoiceGainsData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="strokeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  payload={invoiceGainsData}
                  content={props => {
                    console.log(props);
                    return (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        bg="white"
                        rounded={8}
                        opacity={0.8}
                        py={5}
                        px={2}
                      >
                        <Text>
                          {props.payload[0]?.payload?.createdAtFormated}:{" "}
                          {props.payload[0]?.payload?.totalAmount}$
                        </Text>
                      </Flex>
                    );
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="url(#strokeGradient)"
                  strokeWidth={5}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                >
                  <LabelList
                    dataKey="totalAmount"
                    position="insideTop"
                    content={
                      <CustomLabel arrayLength={invoiceGainsData.length} />
                    }
                  />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
