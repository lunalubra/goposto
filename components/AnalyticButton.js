import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import Image from "next/image";

const AnalitycButton = () => {
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
                router.push("/dashboard/analytic");
            }}
            _hover={{ bg: "gray.100" }}
            _active={{
                bg: "gray.100",
                transform: "scale(0.95) rotate(10deg)",
            }}
        >
            <Image src="/icons/Activity.png" width="106" height="96" />
        </Button>
    );
};

export default AnalitycButton;
