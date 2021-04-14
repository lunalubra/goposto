import {Box, Text} from "@chakra-ui/layout";

import GoogleButton from "@/components/GoogleButton";
import {useAuth} from "@/lib/auth";

export default function Home() {
  const {user, loading, signinWithGoogle, signout} = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <GoogleButton callback={signinWithGoogle} />;
  }

  return <Box>You are alredy registered!</Box>;
}
