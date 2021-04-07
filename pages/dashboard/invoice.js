import { Box, Text } from "@chakra-ui/layout";

import InvoiceDashboard from "@/components/InvoiceDashboard";
import DashboardHeader from "@/components/DashboarHeader";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth";

export default function InvoiceDashboardPage() {
    const { user, loading } = useAuth();

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Button onClick={(e) => signinWithGoogle()}>SignIn</Button>;
    }

    return (
        <Box mx="auto">
            <DashboardHeader />
            <DashboardShell>
                <InvoiceDashboard />
            </DashboardShell>
        </Box>
    );
}
