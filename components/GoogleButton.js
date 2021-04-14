import {Button} from "@chakra-ui/button";
import {useRouter} from "next/router";

import {GoogleIcon} from "@/styles/theme";

const GoogleButton = ({callback, redirect}) => {
  const router = useRouter();

  return (
    <Button
      onClick={async e => {
        await callback();
        router.push(`/dashboard/${redirect || ""}`);
      }}
      backgroundColor="white"
      color="gray.900"
      variant="outline"
      fontWeight="medium"
      leftIcon={<GoogleIcon />}
      mt={4}
      _hover={{bg: "gray.100"}}
      _active={{
        bg: "gray.100",
        transform: "scale(0.95)",
      }}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
