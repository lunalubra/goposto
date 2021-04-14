import {
  Table,
  Tbody,
  Tr,
  Td,
  IconButton,
  Box,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import {ChevronRightIcon} from "@chakra-ui/icons";

import AddClientButtonModal from "./AddClientButtonModal";

const ClientTable = ({data, callback}) => {
  return (
    <Flex
      maxW={["100vw", "100%"]}
      minW={["90vw", "100%"]}
      minH="100%"
      p={5}
      direction="column"
      bg="brand.200"
      rounded={16}
    >
      <Stack direction="row" spacing="auto" alignItems="center" pb={3}>
        <Text fontSize="lg" fontWeight="semibold">
          Clients
        </Text>
        <AddClientButtonModal callback={callback} />
      </Stack>

      <Box maxH="125px" overflow="auto">
        <Table>
          <Tbody>
            {data?.clients?.map(client => (
              <Tr key={client?.name}>
                <Td>{client?.name}</Td>
                <Td>{client?.email}</Td>
                <Td>{client?.phone_number}</Td>
                <Td>{client?.country}</Td>
                <Td>
                  <IconButton
                    onClick={() => {
                      callback(client?.id);
                    }}
                    icon={<ChevronRightIcon />}
                  ></IconButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default ClientTable;
