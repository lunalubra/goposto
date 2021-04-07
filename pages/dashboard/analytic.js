import { Box, Text } from "@chakra-ui/layout";

import { useAuth } from "@/lib/auth";
import DashboardHeader from "@/components/DashboarHeader";
import DashboardShell from "@/components/DashboardShell";
import AnalyticInvoiceGains from "@/components/AnalyticInvoiceGains";

export default function AnalyticDashboardPage() {
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
                <AnalyticInvoiceGains />
            </DashboardShell>
        </Box>
    );
}
