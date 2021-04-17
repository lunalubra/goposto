import {Flex, Link, Text} from "@chakra-ui/layout";
import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/button";
import NextLink from "next/link";

import DashboardSkeleton from "@/components/DashboardSkeleton";

export default function Custom404() {
  return (
    <DashboardSkeleton>
      <Flex p={3} direction="column" alignItems="center">
        <Text color="white" fontSize="lg" fontWeight="semibold">
          This page could not be found
        </Text>
        <Flex direction="row" alignItems="center" pt={2}>
          <NextLink href="/dashboard/" passHref>
            <Button bg="white" leftIcon={<ArrowLeftIcon />}>
              <Link fontSize="lg">Go to dashboard</Link>
            </Button>
          </NextLink>
          <NextLink href="/" passHref>
            <Button ml={2} bg="white" rightIcon={<ArrowRightIcon />}>
              <Link fontSize="lg">Go to home</Link>
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </DashboardSkeleton>
  );
}
