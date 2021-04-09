import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/layout";
import useSWR from "swr";

import AddClientButtonModal from "./AddClientButtonModal";
import ClientsCard from "./ClientsCard";
import ClientTable from "./ClientTable";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import AnalyticClientLocation from "./AnalyticClientLocation";

const ClientDashboard = () => {
    const { user } = useAuth();
    const { data } = useSWR(
        user ? ["/api/clients", user.token] : null,
        fetcher
    );

    const [clientId, setClientId] = useState(null);

    const getClientId = (client) => {
        setClientId(client);
    };

    if (!data) {
        return <Text>Loading...</Text>;
    }

    return (
        <Grid
            bg="brand.200"
            w="100%"
            h={["1050px", "1000px", "100vh"]}
            maxH={["1750px", null, "600px"]}
            borderRadius="32"
            mx={[0, 0, 5]}
            justifyItems={["center", "normal"]}
            p={10}
            gap={5}
        >
            <GridItem
                colStart={1}
                colSpan={[1, 1, 3]}
                rowStart={[2, 2, 1]}
                rowSpan={1}
                width="200px"
                height="200px"
                bg="brand.100"
                pl={[1, 1, 3]}
                rounded={32}
                justifySelf={["center", "center", "start"]}
            >
                <AnalyticClientLocation clientData={data} />
            </GridItem>

            <GridItem
                colStart={1}
                colSpan={[1, 1, 3]}
                rowStart={[3, 3, 2]}
                rowSpan={2}
            >
                <Box>
                    <Stack direction="row" spacing="auto" alignItems="center">
                        <Text fontWeight="bold">Clients</Text>
                        <AddClientButtonModal callback={getClientId} />
                    </Stack>
                    <ClientTable data={data} callback={getClientId} />
                </Box>
            </GridItem>
            <GridItem
                colStart={[1, 1, 4]}
                colSpan={[1, 1, 2]}
                rowStart={[5, null, 1]}
                rowSpan={[2, null, 3]}
                justifySelf={["center", "center", "right"]}
            >
                <ClientsCard
                    data={data}
                    clientId={clientId}
                    callback={getClientId}
                />
            </GridItem>
        </Grid>
    );
};

export default ClientDashboard;
