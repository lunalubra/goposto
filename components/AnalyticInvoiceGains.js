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

const data = [
    {
        name: "Page A",
        uv: 2400,
    },
    {
        name: "Page B",
        uv: 1398,
    },
    {
        name: "Page C",
        uv: 9800,
    },
    {
        name: "Page D",
        uv: 3908,
    },
    {
        name: "Page E",
        uv: 4800,
    },
    {
        name: "Page F",
        uv: 3800,
    },
    {
        name: "Page G",
        uv: 4300,
    },
];

const CustomLabel = ({ x, y, value }) => {
    const width = 40,
        height = width / 2;

    return (
        <Flex as="g">
            <rect
                x={x - width / 2}
                y={y - height / 2}
                rx={5}
                ry={5}
                width={width}
                height={height}
                style={{ fill: "#fff" }}
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
        ?.map((invoice) => {
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

    console.log(invoiceGainsData);
    return (
        <Flex
            direction="column"
            alignItems="center"
            bg="brand.100"
            rounded={16}
            width="100%"
            height="100%"
        >
            <Flex>
                <Text m={5} fontSize="xl" fontWeight="semibold">
                    Gains
                </Text>
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
                    <Flex width="102%" height="100%" alignItems="flex-end">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                            aspect={3}
                        >
                            <AreaChart
                                width={730}
                                height={250}
                                data={invoiceGainsData}
                                margin={{
                                    top: 20,
                                    right: 25,
                                    left: 25,
                                    bottom: 5,
                                }}
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
                                    datakey={"createdAtFormated"}
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
                                        content={CustomLabel}
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
