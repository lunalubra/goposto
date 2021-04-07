import { Flex, Text } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/image";

import ClientImageWithDeepth from "./ClientImageWithDeepth";
import DeleteClientPopover from "./DeleteClientPopover";
import { Description } from "./Description";
import UpdateClientPopover from "./UpdateClientPopover";
import { useEffect } from "react";

const ClientsCard = ({ data, clientId, callback }) => {
    let client = clientId
        ? data?.clients.find((client) => client.id === clientId)
        : data?.clients?.[0];

    useEffect(() => {
        client = clientId
            ? data?.clients.find((client) => client.id === clientId)
            : data?.clients?.[0];
        console.log(data);
    }, [clientId]);

    return (
        <Flex
            bg="brand.100"
            rounded={16}
            direction="column"
            alignItems="center"
        >
            <ClientImageWithDeepth>
                <Img src={client?.image} maxH="100" maxW="100" rounded="full" />
            </ClientImageWithDeepth>
            <Flex
                mt={5}
                pl={5}
                alignSelf="flex-start"
                direction="column"
                w="100%"
            >
                <Text fontSize="lg" fontWeight="semibold">
                    Client Information
                </Text>
                <Description title="Name" value={client?.name} />
                <Description title="Email" value={client?.email} />
                <Description title="Phone" value={client?.phone_number} />
                <Text fontSize="lg" fontWeight="semibold" mt={5}>
                    Client Billing Address
                </Text>
                <Flex pl={2} direction="column">
                    <Text>{client?.street_address},</Text>
                    <Text>{client?.city},</Text>
                    <Text>{client?.province},</Text>
                    <Text>{client?.post_code},</Text>
                    <Text>{client?.country}</Text>
                </Flex>
            </Flex>
            <Flex alignSelf="flex-end" mr={5} mb={5}>
                <DeleteClientPopover
                    clientId={client?.id}
                    callback={callback}
                />
                <UpdateClientPopover client={client} callback={callback} />
            </Flex>
        </Flex>
    );
};

export default ClientsCard;
