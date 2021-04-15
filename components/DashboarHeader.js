import {
  Flex,
  Stack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {SettingsIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
import NextLink from "next/link";
import Image from "next/image";

import {useAuth} from "@/lib/auth";

const DashboardHeader = () => {
  const {signout} = useAuth();
  const router = useRouter();

  return (
    <Flex as="header" bg="white" minW="100vw" justifyContent="center">
      <Flex
        as="nav"
        w="100%"
        maxW="1250px"
        justifyContent="space-between"
        alignItems="center"
        p={5}
      >
        <Flex alignItems="center">
          <NextLink href="/" passHref>
            <Image src="/posto.svg" width="100" height="100" alt="logo" />
          </NextLink>
          <Stack
            ml={6}
            mb={2}
            display={["none", "flex"]}
            spacing={3}
            direction="row"
          >
            <NextLink href="/dashboard" passHref>
              <Link href="/dashboard" fontSize="lg">
                Inbox
              </Link>
            </NextLink>
            <NextLink href="/dashboard/invoice" passHref>
              <Link href="/dashboard/invoice" fontSize="lg">
                Invoices
              </Link>
            </NextLink>
            <NextLink href="/dashboard/client" passHref>
              <Link href="/dashboard/client" fontSize="lg">
                Clients
              </Link>
            </NextLink>
          </Stack>
        </Flex>
        <Menu autoSelect={false}>
          <MenuButton
            aria-label="Settings"
            as={IconButton}
            icon={<SettingsIcon />}
          />
          <MenuList>
            <Flex direction="column" display={["flex", "none"]}>
              <NextLink href="/dashboard" passHref>
                <MenuItem>
                  <Link href="/dashboard" fontSize="lg">
                    Inbox
                  </Link>
                </MenuItem>
              </NextLink>
              <NextLink href="/dashboard/invoice" passHref>
                <MenuItem>
                  <Link href="/dashboard/invoice" fontSize="lg">
                    Invoices
                  </Link>
                </MenuItem>
              </NextLink>
              <NextLink href="/dashboard/client" passHref>
                <MenuItem>
                  <Link href="/dashboard/client" fontSize="lg">
                    Clients
                  </Link>
                </MenuItem>
              </NextLink>
              <MenuDivider />
            </Flex>

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
