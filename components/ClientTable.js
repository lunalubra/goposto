import { ChevronRightIcon } from "@chakra-ui/icons";
import { Table, Tbody, Tr, Td, IconButton, Box } from "@chakra-ui/react";

const ClientTable = ({ data, callback }) => {
    return (
        <Box maxW={["280px", "none", "none"]} maxH="300px" overflowY="auto">
            <Table variant="simple">
                <Tbody>
                    {data?.clients?.map((client) => (
                        <Tr key={client?.name}>
                            <Td>{client?.name}</Td>
                            <Td display={["none", "revert", "revert"]}>
                                {client?.email}
                            </Td>
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
    );
};

export default ClientTable;
