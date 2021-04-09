import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Image } from "@chakra-ui/image";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button, IconButton } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { EditIcon } from "@chakra-ui/icons";

const ImageSquare = ({ image, callback, deleteImage }) => {
    return (
        <Menu>
            <Flex position="relative">
                <MenuButton
                    position="absolute"
                    as={IconButton}
                    aria-label="Options"
                    icon={<EditIcon />}
                    size="xs"
                    top={1}
                    left={1}
                />
                <Image src={image} width="100px" height="100px" alt="image" />
            </Flex>
            <MenuList>
                <MenuItem onClick={() => callback(image)}>
                    Set as image
                </MenuItem>
                <MenuItem onClick={() => deleteImage(image)}>Delete</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ImageSquare;
