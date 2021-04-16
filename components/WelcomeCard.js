import {Image} from "@chakra-ui/image";
import {Divider, Flex, SimpleGrid, Text} from "@chakra-ui/layout";

const WelcomeCard = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      maxW="1250px"
      bgImage="url('gradient.jpg')"
      rounded={16}
      p={[10]}
    >
      <Text fontSize="xl" fontWeight="semibold" color="white" pb={5}>
        But... ¿How does it work?
      </Text>
      <Divider mb="5" />
      <SimpleGrid w="100%" columns={2} spacing={10}>
        <Image
          alt="register image"
          justifySelf="end"
          src="register.jpg"
          maxW={["120px", "150px"]}
        />
        <Text
          justifySelf="start"
          fontSize="lg"
          fontWeight="semibold"
          color="white"
          maxW={["120px", "150px"]}
        >
          1. Create an account using Google!
        </Text>
        <Text
          justifySelf="end"
          fontSize="lg"
          fontWeight="semibold"
          color="white"
          maxW={["120px", "150px"]}
        >
          2. Start adding clients and invoices!
        </Text>
        <Image
          alt="client invoice image"
          justifySelf="start"
          src="clientinvoice.jpg"
          maxW={["120px", "150px"]}
        />
        <Image
          alt="analytic image"
          justifySelf="end"
          src="analytics.jpg"
          maxW={["120px", "150px"]}
        />
        <Text
          justifySelf="start"
          fontSize="lg"
          fontWeight="semibold"
          color="white"
          maxW={["120px", "150px"]}
        >
          3. Recive up to date real anaylitcs related to your clients an
          invoices!
        </Text>
      </SimpleGrid>
    </Flex>
  );
};

export default WelcomeCard;
