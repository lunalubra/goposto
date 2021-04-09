import { Box, Text } from "@chakra-ui/layout";

import DashboardHeader from "@/components/DashboarHeader";
import DashboardShell from "@/components/DashboardShell";
import InboxDashboard from "@/components/InboxDashboard";
import { useAuth } from "@/lib/auth";

export default function Home() {
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
                <InboxDashboard />
            </DashboardShell>
        </Box>
    );
}
