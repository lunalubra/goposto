import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { mutate } from "swr";

import { createInvoice } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const AddInvoiceButtonModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const toast = useToast();

    const onSubmit = async (data) => {
        const newInvoice = {
            authorId: user.uid,
            status: "pending",
            ...data,
        };

        const { id, error } = createInvoice(newInvoice);
        if (error) {
            toast({
                title: "Something went wrong...",
                description: "Refresh the page and try again or wait",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            mutate(["/api/userInvoices", user.token], async (data) => ({
                invoices: [{ id, ...newInvoice }, ...data.invoices],
            }));
        }
        onClose();
    };

    const initialRef = useRef();
    const finalRef = useRef();

    return (
        <>
            <Button onClick={onOpen}>{children}</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Invoice</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <Input
                                id="date-input"
                                name="date"
                                ref={register({ required: "Required" })}
                                type="date"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                id="name-input"
                                name="name"
                                ref={register({ required: "Required" })}
                                placeholder="Lucas"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Amount</FormLabel>
                            <Input
                                id="amount-input"
                                name="amount"
                                ref={register({ required: "Required" })}
                                type="number"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button type="submit" colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddInvoiceButtonModal;
