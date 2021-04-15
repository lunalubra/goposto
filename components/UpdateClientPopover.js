import {EditIcon} from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  useToast,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useRef, useState} from "react";
import {mutate} from "swr";

import {updateClient} from "@/lib/db";
import {useAuth} from "@/lib/auth";
import ImageUploader from "./UploadImageButton";
import HandleUserImageModal from "./HandleUserImageModal";

const UpdateClientPopover = ({client, callback}) => {
  const {user} = useAuth();
  const toast = useToast();

  const {isOpen, onOpen, onClose} = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  if (!client) return <Text>Loading...</Text>;

  const {register, handleSubmit, errors, formState, reset} = useForm({
    defaultValues: {
      name: client.name,
      email: client.email,
      phone_number: client.phone_number,
      street_address: client.street_address,
      city: client.city,
      province: client.province,
      post_code: client.post_code,
      country: client.country,
    },
  });

  const [clientImage, setClientImage] = useState(client?.image);
  const getImage = newImage => {
    newImage && setClientImage(newImage);
  };

  const onUpdateClient = data => {
    const {error} = updateClient(client.id, {
      image: clientImage,
      ...data,
    });
    if (error) {
      toast({
        title: "Something went wrong while updating the client...",
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
        async catchedData => {
          const clientsList = catchedData.clients.filter(
            c => c.id !== client.id
          );
          const updatedClient = {
            image: clientImage,
            id: client.id,
            ...data,
          };

          return {clients: [updatedClient, ...clientsList]};
        },
        false
      );
      reset(data);
      callback(client.id);
    }
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Edit client information"
        ml={3}
        bg="brand.400"
        colorScheme="white"
        _hover={{opacity: "0.6"}}
        _active={{
          opacity: "0.8",
          transform: "scale(0.95)",
        }}
        onClick={onOpen}
        icon={<EditIcon />}
      />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateClient)}>
          <ModalHeader>Edit client information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="24px">
              <Flex direction="column" alignItems="center">
                <Image src={clientImage} width="100" height="100" pb={5} />
                <HandleUserImageModal
                  callback={getImage}
                  prevImageUrl={client?.image}
                />
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
                <FormControl mt={4} mr={2} isInvalid={errors?.street_address}>
                  <FormLabel>Street address</FormLabel>
                  <Input
                    ref={register({
                      required: "Billing street address is required",
                    })}
                    name="street_address"
                    placeholder="Calle Arganda del valle n34"
                  />
                  <FormErrorMessage>
                    {errors?.street_address && errors?.street_address?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl mt={4} mr={2} isInvalid={errors?.post_code}>
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
          </ModalBody>

          <ModalFooter>
            <Button
              aria-label="cancel edit client information"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              aria-label="submit new client information"
              type="submit"
              colorScheme="blue"
              isLoading={formState.isSubmitting}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateClientPopover;
