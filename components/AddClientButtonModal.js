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
  Input,
  Flex,
  Text,
  useDisclosure,
  Stack,
  useToast,
  FormErrorMessage,
  Box,
  Image,
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useForm} from "react-hook-form";
import {useRef, useState} from "react";
import {mutate} from "swr";

import HandleUserImageModal from "./HandleUserImageModal";
import {createClient} from "@/lib/db";
import {useAuth} from "@/lib/auth";

const AddClientButtonModal = ({callback}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const initialRef = useRef();
  const {user} = useAuth();
  const toast = useToast();
  const [clientImage, setClientImage] = useState(null);

  const {register, handleSubmit, errors, formState} = useForm();

  const onAddClient = newClientData => {
    if (!clientImage) {
      return toast({
        title: "Please enter an image",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    const {id, error} = createClient({
      authorId: user.uid,
      image: clientImage,
      ...newClientData,
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
        ["/api/clients", user.token],
        data => ({
          clients: [
            {
              id,
              authorId: user.uid,
              image: clientImage,
              ...newClientData,
            },
            ...data?.clients,
          ],
        }),
        false
      );
      callback(id);
    }
    onClose();
  };

  const getImage = newImage => {
    newImage && setClientImage(newImage);
  };

  return (
    <>
      <Button
        aria-label="add a new client"
        leftIcon={<AddIcon />}
        bgImage="url('/gradient.webp')"
        color="white"
        _hover={{opacity: "0.60"}}
        _active={{
          opacity: "0.80",
          transform: "scale(0.95)",
        }}
        onClick={onOpen}
      >
        Add client
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
          <form onSubmit={handleSubmit(onAddClient)}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Add a new client
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Flex direction="column" alignItems="center">
                    <Image src={clientImage} maxW="100" maxH="100" pb={5} />
                    <HandleUserImageModal callback={getImage} />
                  </Flex>
                  <FormControl isInvalid={errors?.name}>
                    <FormLabel>Client name</FormLabel>
                    <Input
                      ref={initialRef}
                      ref={register({
                        required: "Client name is required",
                      })}
                      name="name"
                      placeholder="Lucas Acosta"
                    />
                    <FormErrorMessage>
                      {errors?.name && errors?.name?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={errors?.email}>
                    <FormLabel>Client email</FormLabel>
                    <Input
                      ref={register({
                        required: "Client email is required",
                      })}
                      name="email"
                      placeholder="lucasacosta@gmail.com"
                    />
                    <FormErrorMessage>
                      {errors?.email && errors?.email?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={errors?.phone_number}>
                    <FormLabel>Client phone number</FormLabel>
                    <Input
                      ref={register({
                        required: "Client phone number is required",
                      })}
                      name="phone_number"
                      placeholder="+34 657765435"
                    />
                    <FormErrorMessage>
                      {errors?.phone_number && errors?.phone_number?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Text fontSize="xl" fontWeight="semibold" mt={4}>
                    Billing information
                  </Text>
                  <Flex>
                    <FormControl
                      mt={4}
                      mr={2}
                      isInvalid={errors?.street_address}
                    >
                      <FormLabel>Street address</FormLabel>
                      <Input
                        ref={register({
                          required: "Billing street address is required",
                        })}
                        name="street_address"
                        placeholder="Calle Arganda del valle n34"
                      />
                      <FormErrorMessage>
                        {errors?.street_address &&
                          errors?.street_address?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mt={4} isInvalid={errors?.post_code}>
                      <FormLabel>Post code</FormLabel>
                      <Input
                        ref={register({
                          required: "Billing post code is required",
                        })}
                        name="post_code"
                        placeholder="23414"
                      />
                      <FormErrorMessage>
                        {errors?.post_code && errors?.post_code?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex>
                    <FormControl mt={4} mr={2} isInvalid={errors?.city}>
                      <FormLabel>City</FormLabel>
                      <Input
                        ref={register({
                          required: "Billing city is required",
                        })}
                        name="city"
                        placeholder="Madrid"
                      />
                      <FormErrorMessage>
                        {errors?.city && errors?.city?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl mt={4} mr={2} isInvalid={errors?.province}>
                      <FormLabel>Province</FormLabel>
                      <Input
                        ref={register({
                          required: "Billing province is required",
                        })}
                        name="province"
                        placeholder="Comunidad de madrid"
                      />
                      <FormErrorMessage>
                        {errors?.province && errors?.province?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl mt={4} isInvalid={errors?.country}>
                      <FormLabel>Country</FormLabel>
                      <Input
                        ref={register({
                          required: "Billing country is required",
                        })}
                        name="country"
                        placeholder="Spain"
                      />
                      <FormErrorMessage>
                        {errors?.country && errors?.country?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button
                  aria-label="close modal"
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  aria-label="submit new client"
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

export default AddClientButtonModal;
