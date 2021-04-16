import {Flex} from "@chakra-ui/layout";

import WelcomeCard from "./WelcomeCard";

const InboxDashboard = () => {
  return (
    <Flex
      mt={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <WelcomeCard />
    </Flex>
  );
};

export default InboxDashboard;
