import { Button, IconButton } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";

const AddInvoiceItem = ({ callback, itemsArray }) => {
    const [itemObj, setItemObj] = useState({
        name: "Design",
        qty: 3,
        price: 125,
    });
    const toast = useToast();

    return (
        <Flex direction="column" spacing="auto" alignItems="center">
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="90%"
                my={2}
                mx={4}
            >
                <Text fontSize="lg" fontWeight="semibold">
                    Invoices
                </Text>
                <Button
                    bg="green.400"
                    colorScheme="white"
                    leftIcon={<CheckIcon />}
                    size="sm"
                    _hover={{ opacity: "0.60" }}
                    _active={{
                        opacity: "0.80",
                        transform: "scale(0.85)",
                    }}
                    onClick={() => {
                        const nameIsAlredyInUse = itemsArray?.find(
                            (item) => item.name === itemObj.name
                        );
                        if (
                            itemObj &&
                            itemObj.name &&
                            itemObj.qty &&
                            itemObj.price
                        ) {
                            if (nameIsAlredyInUse) {
                                return toast({
                                    title: "This item name is alredy in use",
                                    description:
                                        "Increment its qty or change its name in order to create this item",
                                    status: "error",
                                    duration: 4000,
                                    isClosable: true,
                                });
                            }
                            return callback(itemObj);
                        }
                        return toast({
                            title: "All fields are required",
                            status: "error",
                            duration: 4000,
                            isClosable: true,
                        });
                    }}
                >
                    Add Item
                </Button>
            </Flex>
            <Box bg="brand.100" width="100%" height="100%" rounded="15">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Qty</Th>
                            <Th>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td p={3} pl={6}>
                                <Editable
                                    bg="brand.200"
                                    p={1}
                                    rounded={5}
                                    color="gray"
                                    defaultValue={itemObj?.name}
                                >
                                    <EditablePreview width="100%" />
                                    <EditableInput
                                        onChange={(e) =>
                                            setItemObj({
                                                ...itemObj,
                                                name: e.target?.value,
                                            })
                                        }
                                        value={itemObj?.name}
                                    />
                                </Editable>
                            </Td>
                            <Td p={3}>
                                <Editable
                                    bg="brand.200"
                                    p={1}
                                    rounded={5}
                                    color="gray"
                                    defaultValue={itemObj?.qty}
                                >
                                    <EditablePreview width="100%" />
                                    <EditableInput
                                        onChange={(e) =>
                                            setItemObj({
                                                ...itemObj,
                                                qty: +e.target?.value,
                                            })
                                        }
                                        value={itemObj?.qty}
                                    />
                                </Editable>
                            </Td>
                            <Td p={3}>
                                <Editable
                                    bg="brand.200"
                                    p={1}
                                    rounded={5}
                                    color="gray"
                                    defaultValue={itemObj?.price}
                                >
                                    <EditablePreview width="100%" />
                                    <EditableInput
                                        onChange={(e) =>
                                            setItemObj({
                                                ...itemObj,
                                                price: +e.target?.value,
                                            })
                                        }
                                        value={itemObj?.price}
                                    />
                                </Editable>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
};

export default AddInvoiceItem;
