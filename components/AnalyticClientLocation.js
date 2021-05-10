import { Flex, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#FEA482',
  '#AB1BFF',
  '#FF7BA8',
  '#FEA482',
  '#AB1BFF',
  '#FF7BA8',
  '#FEA482',
  '#AB1BFF',
  '#FF7BA8'
];

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
            ...prevState?.filter(({ country }) => country !== client.country),
            {
              country: client.country,
              value: isCountryInArr.value + 1
            }
          ];
        } else {
          return [...prevState, { country: client.country, value: 1 }];
        }
      });
    });
  }, [clients]);

  return (
    <Flex
      minW={['39vw', '200px']}
      maxW="100vw"
      minH="100%"
      maxH="100%"
      direction="column"
      bg="white"
      rounded={16}
      alignItems="center"
      justifyContent="center"
    >
      <Text textAlign="center" fontSize="lg" fontWeight="semibold">
        Clients Locations
      </Text>
      <Flex
        minW={['50vw', '200px']}
        maxW="100%"
        minH={['50vw', '200px']}
        maxH="100%"
      >
        <ResponsiveContainer width="100%" height="100%" aspect={1}>
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
            <Tooltip
              payload={arrayOfCountries}
              content={(props) => {
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
                      {props.payload[0]?.payload?.payload?.country}:{' '}
                      {props.payload[0]?.payload?.payload?.value}
                    </Text>
                  </Flex>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Flex>
    </Flex>
  );
}
