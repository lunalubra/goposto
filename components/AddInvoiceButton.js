import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  Stack,
  useToast,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Flex,
  Textarea,
  Text,
  Badge,
  Divider,
  Link,
} from "@chakra-ui/react";
import {AddIcon, ChevronDownIcon} from "@chakra-ui/icons";
import {useForm} from "react-hook-form";
import {useRef, useState} from "react";
import NextLink from "next/link";
import {mutate} from "swr";

import InvoiceItemform from "./InvoiceItemform";
import {createInvoice} from "../lib/db";
import {useAuth} from "@/lib/auth";

const AddInvoiceButton = ({clients, callback}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const initialRef = useRef();
  const {user} = useAuth();
  const toast = useToast();

  const {register, handleSubmit, errors, formState} = useForm();

  const [invoiceStatus, setInvoiceStatus] = useState(null);
  const [clientObj, setClientObj] = useState(null);
  const [itemsArray, setItemsArray] = useState(null);

  const getItemsArray = itemsArray => {
    setItemsArray(itemsArray);
  };

  const onAddInvoice = newInvoiceData => {
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

    const {id, error} = createInvoice({
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
        data => ({
          invoices: [
            {
              id,
              authorId: user.uid,
              status: invoiceStatus,
              clientObj: clientObj,
              items: itemsArray,
              ...newInvoiceData,
            },
            ...data?.invoices,
          ],
        }),
        false
      );
      callback(id);
    }
    onClose();
  };

  return (
    <>
      <Button
        aria-label="Add a new invoice"
        leftIcon={<AddIcon />}
        bgImage="url('/gradient.webp')"
        color="white"
        size="sm"
        _hover={{opacity: "0.60"}}
        _active={{
          opacity: "0.80",
          transform: "scale(0.95)",
        }}
        onClick={onOpen}
      >
        Add invoice
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size="lg"
        scrollBehavior="inside"
        initialFocusRef={initialRef}
        onClose={onClose}
        motionPreset="slideInRight"
      >
        <DrawerOverlay>
          <form onSubmit={handleSubmit(onAddInvoice)}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Add a new invoice
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Text fontSize="lg" fontWeight="semibold">
                    Invoice information
                  </Text>
                  <Flex direction={["column", "column", "row"]}>
                    <Flex w="100%" mr={5} direction="column">
                      <Text>Inovice client</Text>
                      <Menu>
                        <MenuButton
                          aria-label="add a invoice client for the invoice"
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          py={7}
                        >
                          {clientObj ? (
                            <Flex
                              width="100%"
                              height="100%"
                              alignItems="center"
                            >
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
                          {clients.length === 0 ? (
                            <NextLink href="/dashboard/client">
                              <Link href="/dashboard/client" ml={5}>
                                Add a client first!
                              </Link>
                            </NextLink>
                          ) : (
                            clients?.map(client => (
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
                            ))
                          )}
                        </MenuList>
                      </Menu>
                    </Flex>
                    <Flex w="100%" direction="column">
                      <Text>Invoice status</Text>
                      <Menu>
                        <MenuButton
                          aria-label="Add a default status for your invoice"
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
                                setInvoiceStatus(
                                  e.target.firstChild.textContent
                                )
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
                                setInvoiceStatus(
                                  e.target.firstChild.textContent
                                )
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
                                setInvoiceStatus(
                                  e.target.firstChild.textContent
                                )
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
                  <InvoiceItemform callback={getItemsArray} />
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button
                  aria-label="cancel adding invoice"
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  aria-label="submit invoice"
                  type="submit"
                  colorScheme="blue"
                  isLoading={formState.isSubmitting}
                >
                  Submit
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </form>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default AddInvoiceButton;
