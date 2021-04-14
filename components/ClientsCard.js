import {Flex, Text} from "@chakra-ui/layout";
import {Img} from "@chakra-ui/image";

import {useEffect} from "react";
import {useRouter} from "next/router";

import ClientImageWithDeepth from "./ClientImageWithDeepth";
import UpdateClientPopover from "./UpdateClientPopover";
import DeleteClientPopover from "./DeleteClientPopover";
import {Description} from "./Description";
import {Avatar} from "@chakra-ui/avatar";

const ClientsCard = ({data, clientId, callback}) => {
  const router = useRouter();

  let client = clientId
    ? data?.clients.find(client => client.id === clientId)
    : router.query.id
    ? data?.clients.find(client => client.id === router.query.id)
    : data?.clients?.[0];

  useEffect(() => {
    client = clientId
      ? data?.clients.find(client => client.id === clientId)
      : router.query.id
      ? data?.clients.find(client => client.id === router.query.id)
      : data?.clients?.[0];
  }, [clientId]);

  return (
    <Flex
      minH="100%"
      maxW="100vw"
      minW={["90vw", "100%"]}
      bg="brand.200"
      rounded={16}
      direction="column"
      alignItems="center"
      pt={3}
      px={3}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        bg="brand.400"
        rounded={8}
        minW="100%"
        minH="100"
      >
        <Avatar src={client.image} size="lg" />
      </Flex>
      <Flex mt={5} px={5} alignSelf="flex-start" direction="column" w="100%">
        <Text fontSize="lg" fontWeight="semibold">
          Client Information
        </Text>
        <Text>{client.name}</Text>
        <Text>{client.email}</Text>
        <Text>{client.phone_number}</Text>
        <Text fontSize="lg" fontWeight="semibold" mt={5}>
          Client Billing Address
        </Text>
        <Flex direction="column">
          <Text>{client.street_address},</Text>
          <Text>{client.city},</Text>
          <Text>{client.province},</Text>
          <Text>{client.post_code},</Text>
          <Text>{client.country}</Text>
        </Flex>
      </Flex>
      <Flex alignSelf="flex-end" mr={5} mb={5}>
        <DeleteClientPopover clientId={client.id} callback={callback} />
        <UpdateClientPopover client={client} callback={callback} />
      </Flex>
    </Flex>
  );
};

export default ClientsCard;
