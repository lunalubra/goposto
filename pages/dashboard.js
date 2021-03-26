import { Box, Heading, Text } from "@chakra-ui/layout";

import { useAuth } from "@/lib/auth";
import InvoiceTable from "@/components/InvoiceTable";

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Button onClick={(e) => signinWithGoogle()}>SignIn</Button>;
    }

    return (
        <Box>
            <InvoiceTable />
        </Box>
    );
}
