import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Stack,
  Text,
  Flex,
  Menu,
  MenuButton,
  Image,
  MenuList,
  MenuItem,
  Badge,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import {ChevronDownIcon, EditIcon} from "@chakra-ui/icons";
import {Button, IconButton} from "@chakra-ui/button";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {mutate} from "swr";

import InvoiceItemform from "./InvoiceItemform";
import {updateInvoice} from "@/lib/db";
import {useAuth} from "@/lib/auth";

const UpdateInvoiceButton = ({invoiceObj, clients, callback}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const initialRef = useRef();
  const {user} = useAuth();
  const toast = useToast();

  const {register, handleSubmit, errors, formState, reset} = useForm({
    defaultValues: {
      description: invoiceObj.description,
    },
  });

  const [invoiceStatus, setInvoiceStatus] = useState(invoiceObj.status);
  const [clientObj, setClientObj] = useState(invoiceObj.clientObj);
  const [itemsArray, setItemsArray] = useState(invoiceObj.items);

  useEffect(() => {
    setInvoiceStatus(invoiceObj.status);
    setClientObj(invoiceObj.clientObj);
    setItemsArray(invoiceObj.items);
    reset({
      description: invoiceObj.description,
    });
  }, [invoiceObj]);

  const getItemsArray = itemsArray => {
    setItemsArray(itemsArray);
  };

  const onUpdateInvoice = newInvoiceData => {
    if (!invoiceStatus) {
      return toast({
        title: "Please select a default status",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    if (!clientObj) {
      return toast({
        title: "Please select a client",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    if (!itemsArray || itemsArray.length === 0) {
      return toast({
        title: "Please create at least one item",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    const {error} = updateInvoice(invoiceObj.id, {
      authorId: user.uid,
      status: invoiceStatus,
      clientObj: clientObj,
      items: itemsArray,
      ...newInvoiceData,
    });
    if (error) {
      toast({
        title: "Something went wrong...",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      mutate(
        ["/api/invoices", user.token],
        data => {
          const updatedInvoiceIndex = data?.invoices.findIndex(
            invoice => invoice.id === invoiceObj.id
          );

          const beforeInvoicesArray = data?.invoices.slice(
            0,
            updatedInvoiceIndex
          );
          const afterInvoicesArray = data?.invoices.slice(
            updatedInvoiceIndex + 1
          );

          return {
            invoices: [
              ...beforeInvoicesArray,

              {
                id: invoiceObj.id,
                authorId: user.uid,
                status: invoiceStatus,
                clientObj: clientObj,
                items: itemsArray,
                ...newInvoiceData,
              },

              ...afterInvoicesArray,
            ],
          };
        },
        false
      );
      reset({
        description: newInvoiceData.description,
      });
      if (callback) {
        callback(invoiceObj.id);
      }
    }
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Edit invoice"
        ml={3}
        bg="brand.400"
        colorScheme="white"
        _hover={{opacity: "0.6"}}
        _active={{
          opacity: "0.8",
          transform: "scale(0.95)",
        }}
        icon={<EditIcon />}
        onClick={onOpen}
      />

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onUpdateInvoice)}>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader borderBottomWidth="1px">Update invoice</ModalHeader>

            <ModalBody>
              <Stack spacing="24px">
                <Text fontSize="lg" fontWeight="semibold">
                  Invoice information
                </Text>
                <Flex direction={["column", "column", "row"]}>
                  <Flex w="100%" mr={5} direction="column">
                    <Text>Inovice client</Text>
                    <Menu>
                      <MenuButton
                        aria-label="change the invoice client here"
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        py={7}
                      >
                        {clientObj ? (
                          <Flex width="100%" height="100%" alignItems="center">
                            <Image
                              pointerEvents="none"
                              boxSize="2rem"
                              borderRadius="full"
                              src={clientObj.image}
                              mr="12px"
                            />
                            <span>{clientObj.name}</span>
                          </Flex>
                        ) : (
                          "Choose a client"
                        )}
                      </MenuButton>
                      <MenuList>
                        {clients?.map(client => (
                          <MenuItem key={client.id} minH="48px">
                            <Flex
                              width="100%"
                              height="100%"
                              alignItems="center"
                              onClick={e => setClientObj(client)}
                            >
                              <Image
                                pointerEvents="none"
                                boxSize="2rem"
                                borderRadius="full"
                                src={client.image}
                                mr="12px"
                              />
                              <span>{client.name}</span>
                            </Flex>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Flex w="100%" direction="column">
                    <Text>Invoice status</Text>
                    <Menu>
                      <MenuButton
                        aria-label="Change the invoice status here"
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        py={7}
                      >
                        {invoiceStatus ? (
                          <Badge
                            p={1}
                            colorScheme={
                              invoiceStatus === "pending"
                                ? "purple"
                                : invoiceStatus === "paid"
                                ? "green"
                                : invoiceStatus === "canceled" && "red"
                            }
                          >
                            {invoiceStatus}
                          </Badge>
                        ) : (
                          "Choose a status"
                        )}
                      </MenuButton>
                      <MenuList>
                        <MenuItem minH="48px">
                          <Flex
                            width="100%"
                            height="100%"
                            alignItems="center"
                            onClick={e =>
                              setInvoiceStatus(e.target.firstChild.textContent)
                            }
                          >
                            <Badge colorScheme="green" p={1}>
                              paid
                            </Badge>
                          </Flex>
                        </MenuItem>
                        <MenuItem minH="48px">
                          <Flex
                            width="100%"
                            height="100%"
                            alignItems="center"
                            onClick={e =>
                              setInvoiceStatus(e.target.firstChild.textContent)
                            }
                          >
                            <Badge colorScheme="purple" p={1}>
                              pending
                            </Badge>
                          </Flex>
                        </MenuItem>

                        <MenuItem minH="48px">
                          <Flex
                            width="100%"
                            height="100%"
                            alignItems="center"
                            onClick={e =>
                              setInvoiceStatus(e.target.firstChild.textContent)
                            }
                          >
                            <Badge colorScheme="red" p={1}>
                              canceled
                            </Badge>
                          </Flex>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Flex>
                <FormControl isInvalid={errors?.description}>
                  <FormLabel>Invoice description</FormLabel>
                  <Textarea
                    ref={register({
                      required: "Invoice description is required",
                    })}
                    name="description"
                    placeholder="Type here a descripion of this invoice..."
                  />
                  <FormErrorMessage>
                    {errors?.description && errors?.description?.message}
                  </FormErrorMessage>
                </FormControl>
                <Divider />
                <Text fontSize="lg" fontWeight="semibold">
                  Invoice items
                </Text>
                <InvoiceItemform
                  invoiceItems={invoiceObj?.items}
                  callback={getItemsArray}
                />
              </Stack>
            </ModalBody>

            <ModalFooter borderTopWidth="1px">
              <Button
                aria-label="cancel update operation"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                aria-label="submit new invoice information"
                type="submit"
                colorScheme="blue"
                isLoading={formState.isSubmitting}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default UpdateInvoiceButton;
