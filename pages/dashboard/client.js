import { Box, Text } from "@chakra-ui/layout";

import { useAuth } from "@/lib/auth";
import DashboardHeader from "@/components/DashboarHeader";
import DashboardShell from "@/components/DashboardShell";
import ClientDashboard from "@/components/ClientDashboard";

export default function ClientDashboardPage() {
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
                <ClientDashboard />
            </DashboardShell>
        </Box>
    );
}
