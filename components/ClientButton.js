import { Button } from "@chakra-ui/button";
import Image from "next/image";
import { useRouter } from "next/router";

const ClientButton = () => {
    const router = useRouter();

    return (
        <Button
            maxW="100"
            minW="75"
            maxH="100"
            minH="75"
            variant="ghost"
            color="gray.900"
            fontWeight="medium"
            mt={[0, 4]}
            onClick={() => {
                router.push("/dashboard/client");
            }}
            _hover={{ bg: "gray.100" }}
            _active={{
                bg: "gray.100",
                transform: "scale(0.95) rotate(10deg)",
            }}
        >
            <Image src="/icons/Profile.png" width="89" height="87" />
        </Button>
    );
};

export default ClientButton;
