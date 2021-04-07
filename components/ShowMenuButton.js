import Image from "next/image";

const ShowMenuButton = () => {
    return (
        <Button
            w="100"
            h="100"
            variant="ghost"
            color="gray.900"
            fontWeight="medium"
            mt={4}
            _hover={{ bg: "gray.100" }}
            _active={{
                bg: "gray.100",
                transform: "scale(0.95)",
            }}
        >
            <Image src="/icons/Arrow.png" w="103" h="103" />
        </Button>
    );
};

export default ShowMenuButton;
