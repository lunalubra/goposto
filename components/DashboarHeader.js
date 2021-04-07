import { Search2Icon } from "@chakra-ui/icons";
import {
    Input,
    Flex,
    Heading,
    InputGroup,
    InputLeftElement,
    Grid,
    GridItem,
} from "@chakra-ui/react";

import SettingButton from "./SettingButton";

const DashboardHeader = () => (
    <Grid gap="3" bg="brand.100" my={5} px={5} alignItems="center">
        <GridItem colStart={1} colSpan={1}>
            <Heading mr={5}>Logo</Heading>
        </GridItem>
        <GridItem colStart={[1, 2]} rowStart={[2, 1]} colSpan={[3, 1]}>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon />}
                />
                <Input
                    border="none"
                    borderRadius="full"
                    bg="brand.200"
                    type="tel"
                    placeholder="Search"
                />
            </InputGroup>
        </GridItem>
        <GridItem colStart={3} colSpan={1} justifySelf="right">
            <SettingButton />
        </GridItem>
    </Grid>
);

export default DashboardHeader;
