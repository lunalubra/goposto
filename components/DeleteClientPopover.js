import { DeleteIcon } from "@chakra-ui/icons";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    IconButton,
    Portal,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import { mutate } from "swr";

import { deleteClient } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const DeleteClientPopover = ({ clientId, callback }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { user } = useAuth();
    const toast = useToast();

    const onDeleteClient = (id) => {
        const { error } = deleteClient(id);
        if (error) {
            toast({
                title: "An error ocurred while deleting the client...",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Successfuly deleted client",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            mutate(
                ["/api/clients", user.token],
                (data) => ({
                    clients: data?.clients?.filter(
                        (client) => client.id !== clientId
                    ),
                }),
                false
            );
            callback(null);
            onClose();
        }
    };

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <IconButton
                    bg="red"
                    colorScheme="white"
                    _hover={{ bg: "red.600" }}
                    _active={{
                        bg: "red.700",
                        transform: "scale(0.95)",
                    }}
                    icon={<DeleteIcon />}
                />
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>
                        Are you sure you want to delete this client?
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody alignSelf="flex-end">
                        <Button
                            _hover={{ bg: "red.600" }}
                            _active={{
                                bg: "red.700",
                                transform: "scale(0.95)",
                            }}
                            colorScheme="red"
                            onClick={() => {
                                onDeleteClient(clientId);
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => onClose()}
                            ml={3}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

export default DeleteClientPopover;
