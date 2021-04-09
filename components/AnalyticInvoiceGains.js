import totalPriceCalculator from "@/utils/totalPriceCalculator";
import { Flex, Text } from "@chakra-ui/layout";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    LabelList,
} from "recharts";

import AnalyticTotalGains from "./AnalyticTotalGains";

const CustomLabel = ({ x, y, value, index, arrayLength }) => {
    const width = 40,
        height = width / 2;

    if (index === 0 || index === arrayLength - 1) {
        return <div></div>;
    }

    return (
        <Flex as="g">
            <rect
                x={x - width / 2}
                y={y - height / 2}
                rx={5}
                ry={5}
                width={width}
                height={height}
                style={{
                    fill: "#fff",
                    opacity: "0.5",
                }}
            />
            <Text
                as="text"
                color="#000"
                fontWeight="semibold"
                fontSize="xs"
                x={x}
                y={y}
                fill="#000"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                ${value}
            </Text>
        </Flex>
    );
};

export default function AnalyticInvoiceGains({ invoiceData: { invoices } }) {
    if (!invoices) return <Text>No invoice data</Text>;

    const invoiceGainsData = invoices
        ?.map((invoice, i) => {
            const totalAmount = totalPriceCalculator(invoice.items);
            const createdAt = new Date(invoice?.createdAt?._seconds * 1000);
            const createdAtFormated = createdAt
                .toString()
                .split(" ")
                .slice(0, 3)
                .join(" ");
            return { createdAtFormated, totalAmount };
        })
        .reverse();

    return (
        <Flex
            direction="column"
            alignItems="center"
            bg="brand.100"
            rounded={16}
            width="100%"
            height="100%"
        >
            <Flex direction="row" alignItems="center">
                <Text m={5} fontSize="xl" fontWeight="semibold">
                    Total gains
                </Text>
                <AnalyticTotalGains invoices={invoices} />
            </Flex>
            <Flex mb={5} w="90%" h="35%" position="relative">
                <Flex
                    position="relative"
                    direction="column"
                    bg="brand.400"
                    w="100%"
                    h="150"
                    rounded="16"
                    alignItems="center"
                    justifyContent="center"
                    zIndex={3}
                >
                    <Flex
                        width={["105%", "105%", "102%"]}
                        height="100%"
                        alignItems="flex-end"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={730}
                                height={250}
                                data={invoiceGainsData}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#fff"
                                            stopOpacity={0.7}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#fff"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    datakey="createdAtFormated"
                                    payload={invoiceGainsData}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="totalAmount"
                                    stroke="#fff"
                                    strokeWidth={5}
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                >
                                    <LabelList
                                        dataKey="totalAmount"
                                        position="insideTop"
                                        content={
                                            <CustomLabel
                                                arrayLength={
                                                    invoiceGainsData.length
                                                }
                                            />
                                        }
                                    />
                                </Area>
                            </AreaChart>
                        </ResponsiveContainer>
                    </Flex>
                </Flex>
                <Flex
                    direction="column"
                    bg="brand.400"
                    w="90%"
                    h="150"
                    rounded="16"
                    position="absolute"
                    top={2}
                    left="5%"
                    opacity={0.5}
                    zIndex={2}
                ></Flex>
                <Flex
                    direction="column"
                    bg="brand.400"
                    w="80%"
                    h="150"
                    rounded="16"
                    position="absolute"
                    top={4}
                    left="10%"
                    opacity={0.3}
                    zIndex={1}
                ></Flex>
            </Flex>
        </Flex>
    );
}
