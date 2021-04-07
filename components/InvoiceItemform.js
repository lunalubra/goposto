import handleUpdateItem from "@/utils/handleUpdateItem";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Flex, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useState } from "react";
import AddInvoiceItem from "./AddInvoiceItem";
import DeleteInvoiceItem from "./DeleteInvoiceItem";

const InvoiceItemform = ({ invoiceItems, callback }) => {
    const [itemsArray, setItemsArray] = useState(invoiceItems || null);
    console.log(itemsArray);

    const addInvoiceItemToItemArray = (itemObj) => {
        if (itemsArray) {
            setItemsArray([...itemsArray, itemObj]);
            callback([...itemsArray, itemObj]);
        } else {
            setItemsArray([itemObj]);
            callback([itemObj]);
        }
    };

    const DeleteInvoiceItemFromItemArray = (itemObj) => {
        setItemsArray(itemsArray.filter((item) => item.name !== itemObj.name));
        callback(itemsArray.filter((item) => item.name !== itemObj.name));
    };

    return (
        <Flex direction="column" overflow="auto" maxW={["100%"]}>
            <AddInvoiceItem
                callback={addInvoiceItemToItemArray}
                itemsArray={itemsArray}
            />
            {!itemsArray ? (
                <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    alignSelf="center"
                    m={5}
                >
                    Add an item!
                </Text>
            ) : (
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Qty</Th>
                            <Th>Price</Th>
                            <Th>Total price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {itemsArray?.map((item) => (
                            <Tr key={item?.name}>
                                <Td>
                                    <Editable
                                        onSubmit={(e) => {
                                            setItemsArray((prevState) => {
                                                if (e === item.name) {
                                                    return prevState;
                                                }

                                                const {
                                                    selectedItem,
                                                    beforeItemsArray,
                                                    afterItemsArray,
                                                } = handleUpdateItem(
                                                    prevState,
                                                    item
                                                );

                                                callback([
                                                    ...beforeItemsArray,
                                                    {
                                                        ...selectedItem,
                                                        name: e,
                                                    },
                                                    ...afterItemsArray,
                                                ]);

                                                return [
                                                    ...beforeItemsArray,
                                                    {
                                                        ...selectedItem,
                                                        name: e,
                                                    },
                                                    ...afterItemsArray,
                                                ];
                                            });
                                        }}
                                        defaultValue={item.name}
                                    >
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                </Td>
                                <Td>
                                    <Editable
                                        onSubmit={(e) => {
                                            setItemsArray((prevState) => {
                                                if (e === item.qty) {
                                                    return prevState;
                                                }

                                                const {
                                                    selectedItem,
                                                    beforeItemsArray,
                                                    afterItemsArray,
                                                } = handleUpdateItem(
                                                    prevState,
                                                    item
                                                );

                                                callback([
                                                    ...beforeItemsArray,
                                                    {
                                                        ...selectedItem,
                                                        qty: e,
                                                    },
                                                    ...afterItemsArray,
                                                ]);

                                                return [
                                                    ...beforeItemsArray,
                                                    {
                                                        ...selectedItem,
                                                        qty: e,
                                                    },
                                                    ...afterItemsArray,
                                                ];
                                            });
                                        }}
                                        defaultValue={item.qty}
                                    >
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                </Td>
                                <Td>
                                    <Editable
                                        onSubmit={(e) => {
                                            setItemsArray((prevState) => {
                                                if (e === item.price) {
                                                    return prevState;
                                                }

                                                const {
                                                    selectedItem,
                                                    beforeItemsArray,
                                                    afterItemsArray,
                                                } = handleUpdateItem(
                                                    prevState,
                                                    item
                                                );

                                                callback([
                                                    ...beforeItemsArray,
                                                    {
                                                        ...selectedItem,
                                                        price: e,
                                                    },
                                                    ...afterItemsArray,
                                                ]);

                                                return [
                                                    ...beforeItemsArray,
                                                    {
                                                        ...selectedItem,
                                                        price: e,
                                                    },
                                                    ...afterItemsArray,
                                                ];
                                            });
                                        }}
                                        defaultValue={item.price}
                                    >
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                </Td>
                                <Td>{item.price * item.qty}$</Td>
                                <Td>
                                    <DeleteInvoiceItem
                                        callback={
                                            DeleteInvoiceItemFromItemArray
                                        }
                                        itemObj={item}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Flex>
    );
};

export default InvoiceItemform;
