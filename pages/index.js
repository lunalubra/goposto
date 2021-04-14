import {Box, Text} from "@chakra-ui/layout";
import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";

import {useAuth} from "@/lib/auth";

export default function Home() {
  const {user, loading, signinWithGoogle, signout} = useAuth();
  const router = useRouter();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return (
      <Button
        onClick={async e => {
          await signinWithGoogle();
          router.push("/dashboard");
        }}
      >
        SignIn
      </Button>
    );
  }

  return <Box>You are alredy registered!</Box>;
}
