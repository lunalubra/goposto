import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react";

export const Description = (props) => {
    const { title, value } = props;
    return (
        <Flex as="dl" direction={{ base: "column", sm: "row" }} px="2" py="1">
            <Box as="dt" flexBasis="25%" fontWeight="semibold">
                {title}:&nbsp;
            </Box>
            <Box as="dd" flex="1">
                {value}
            </Box>
        </Flex>
    );
};
