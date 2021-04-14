import {
  Flex,
  Stack,
  Button,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
} from "@chakra-ui/react";
import {SettingsIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
import NextLink from "next/link";

import {useAuth} from "@/lib/auth";

const DashboardHeader = () => {
  const {signout} = useAuth();
  const router = useRouter();

  return (
    <Flex bg="white" minW="100vw" justifyContent="center">
      <Flex
        w="100%"
        maxW="1250px"
        justifyContent="space-between"
        alignItems="center"
        p={5}
      >
        <Flex alignItems="center">
          <NextLink href="/" passHref>
            <Link fontSize="xl" fontWeight="semibold" mr={5}>
              Logo
            </Link>
          </NextLink>
          <Stack display={["none", "flex"]} spacing={3} direction="row">
            <NextLink href="/dashboard" passHref>
              <Link fontSize="lg">Inbox</Link>
            </NextLink>
            <NextLink href="/dashboard/invoice" passHref>
              <Link fontSize="lg">Invoices</Link>
            </NextLink>
            <NextLink href="/dashboard/client" passHref>
              <Link fontSize="lg">Clients</Link>
            </NextLink>
          </Stack>
        </Flex>
        <Menu autoSelect={false}>
          <MenuButton name="Settings" as={IconButton} icon={<SettingsIcon />} />
          <MenuList>
            <Flex direction="column" display={["flex", "none"]}>
              <NextLink href="/dashboard" passHref>
                <MenuItem>
                  <Link fontSize="lg">Inbox</Link>
                </MenuItem>
              </NextLink>
              <NextLink href="/dashboard/invoice" passHref>
                <MenuItem>
                  <Link fontSize="lg">Invoices</Link>
                </MenuItem>
              </NextLink>
              <NextLink href="/dashboard/client" passHref>
                <MenuItem>
                  <Link fontSize="lg">Clients</Link>
                </MenuItem>
              </NextLink>
              <MenuDivider />
            </Flex>
            <NextLink href="/dashboard/client" passHref>
              <MenuItem>
                <Link fontSize="lg">Manage account</Link>
              </MenuItem>
            </NextLink>
            <MenuItem
              onClick={() => {
                signout();
                router.push("/");
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default DashboardHeader;
