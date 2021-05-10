import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextLink } from 'next/link';
import Image from 'next/image';

import { Illustration } from '@/components/Ilustration';
import GoogleButton from '@/components/GoogleButton';
import { useAuth } from '@/lib/auth';

export default function CallToActionWithIllustration() {
  const { user, loading, signinWithGoogle } = useAuth();
  const router = useRouter();

  return (
    <>
      <Flex minW="100vw" alignItems="center" justifyContent="center" bg="white">
        <Flex w="100%" maxW="1200px" p={2} justifyContent="space-between">
          <Image src="/posto.svg" width={80} height={20} alt="logo" />
          {loading ? (
            <Text>Loading</Text>
          ) : user ? (
            <NextLink href="/dashboard/client" passHref>
              <Button>
                <Link fontSize="lg">Go to dashboard</Link>
              </Button>
            </NextLink>
          ) : (
            <GoogleButton callback={signinWithGoogle} />
          )}
        </Flex>
      </Flex>
      <Container maxW={'4xl'} mt="96px">
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading fontWeight="extrabold" fontSize="6xl" lineHeight={'110%'}>
            Handleling clients{' '}
            <Text as={'span'} color={'brand.400'}>
              made easy
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'} mt="48px">
            posto is the new way of handleling clients and invoices for
            freelancer. Never has been this easy to keep your client list and
            invoices in one place, organiced and structured, and even recive
            analytics!
          </Text>
          <Stack spacing={6} direction={'row'} my="48px">
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'brand.400'}
              bg={'brand.400'}
              _hover={{ opacity: '0.6' }}
              onClick={async (e) => {
                await signinWithGoogle();
                router.push(`/dashboard`);
              }}
            >
              Get started
            </Button>
            <Button rounded={'full'} px={6}>
              Learn more
            </Button>
          </Stack>
          <Flex w={'full'}>
            <Illustration
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
            />
          </Flex>
        </Stack>
      </Container>
    </>
  );
}
