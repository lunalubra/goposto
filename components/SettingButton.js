import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import Image from "next/image";

const SettingButton = () => {
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
            onClick={() => {
                router.push("/account");
            }}
            _hover={{ bg: "gray.100" }}
            _active={{
                bg: "gray.100",
                transform: "scale(0.95) rotate(10deg)",
            }}
        >
            <Image src="/icons/Menu.png" width="91" height="87" />
        </Button>
    );
};

export default SettingButton;
