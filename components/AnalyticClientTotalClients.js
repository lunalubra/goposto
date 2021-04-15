import {Flex, Text} from "@chakra-ui/layout";

const AnalyticClientTotalClients = ({children}) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      p={5}
      bg="brand.400"
      maxW="100vw"
      minW={["39vw", "100%"]}
      maxH="100%"
      minH="100%"
      rounded={16}
    >
      <Text color="black" fontSize="8xl" fontWeight="bold">
        {children}
      </Text>
      <Text
        textAlign="center"
        color="black"
        fontSize="2xl"
        fontWeight="semibold"
      >
        Total clients
      </Text>
    </Flex>
  );
};

export default AnalyticClientTotalClients;
