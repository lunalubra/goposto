import { Flex } from "@chakra-ui/layout";

const ClientImageWithDeepth = ({ children }) => {
    return (
        <Flex mt={3} w="90%" h="35%" position="relative">
            <Flex
                position="relative"
                direction="column"
                bg="brand.400"
                w="100%"
                h="150"
                rounded="16"
                alignItems="center"
                justifyContent="center"
                zIndex={3}
            >
                {children}
            </Flex>
            <Flex
                direction="column"
                bg="brand.400"
                w="90%"
                h="150"
                rounded="16"
                position="absolute"
                top={2}
                left="5%"
                opacity={0.5}
                zIndex={2}
            ></Flex>
            <Flex
                direction="column"
                bg="brand.400"
                w="80%"
                h="150"
                rounded="16"
                position="absolute"
                top={4}
                left="10%"
                opacity={0.3}
                zIndex={1}
            ></Flex>
        </Flex>
    );
};

export default ClientImageWithDeepth;
