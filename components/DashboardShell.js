import { Flex, Stack } from "@chakra-ui/layout";

import AnalitycButton from "./AnalyticButton";
import InvoiceButton from "./InvoiceButton";
import ClientButton from "./ClientButton";
import HomeButton from "./HomeButton";

const DashboardShell = ({ children }) => {
    return (
        <Flex direction={["column", "column", "row"]}>
            <Stack
                alignSelf="center"
                my={7}
                ml={[0, 0, 5]}
                direction={["row", "row", "column"]}
            >
                <HomeButton />
                <InvoiceButton />
                <ClientButton />
                <AnalitycButton />
            </Stack>
            {children}
        </Flex>
    );
};

export default DashboardShell;
