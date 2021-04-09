import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticClientLocation({ clientData: { clients } }) {
    const [arrayOfCountries, setArrayOfCountries] = useState([]);

    useEffect(() => {
        clients.forEach((client) => {
            setArrayOfCountries((prevState) => {
                const isCountryInArr = prevState?.find(
                    ({ country }) => country === client.country
                );

                if (isCountryInArr) {
                    return [
                        ...prevState?.filter(
                            ({ country }) => country !== client.country
                        ),
                        {
                            country: client.country,
                            value: isCountryInArr.value + 1,
                        },
                    ];
                } else {
                    return [
                        ...prevState,
                        { country: client.country, value: 1 },
                    ];
                }
            });
        });
    }, [clients]);

    return (
        <Flex
            direction="row"
            bg="brand.100"
            width="100%"
            height="100%"
            rounded={32}
        >
            <Flex width="100%" height="100%">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={arrayOfCountries}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {arrayOfCountries.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Flex>
            <Flex
                display={["none", "none", "flex"]}
                justifyContent="center"
                direction="column"
                ml={10}
            >
                {arrayOfCountries.map((country, index) => {
                    return (
                        <Flex
                            direction="row"
                            alignItems="center"
                            key={country.country}
                            pl={5}
                        >
                            <Icon
                                color={COLORS[index % COLORS.length]}
                                bg={COLORS[index % COLORS.length]}
                                rounded="full"
                            />
                            <Text>&nbsp;&nbsp;{country.country}</Text>
                        </Flex>
                    );
                })}
            </Flex>
        </Flex>
    );
}
