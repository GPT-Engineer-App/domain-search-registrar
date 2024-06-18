import { Box, Text, Heading, VStack, Flex } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const About = () => (
  <Box p={4}>
    <Flex direction="column" align="center" justify="center" p={10}>
      <Heading mb={4}>About Us</Heading>
      <Text fontSize="lg" mb={6}>
        We are a leading domain name registrar, providing top-notch services to help you secure your online presence.
      </Text>
    </Flex>
    <Box bg="gray.100" p={10}>
      <Heading size="lg" textAlign="center" mb={4}>
        Our Features
      </Heading>
      <VStack spacing={5}>
        <Flex align="center">
          <FaCheckCircle size="24px" />
          <Text ml={2}>Domain Search</Text>
        </Flex>
        <Flex align="center">
          <FaCheckCircle size="24px" />
          <Text ml={2}>Easy Registration</Text>
        </Flex>
        <Flex align="center">
          <FaCheckCircle size="24px" />
          <Text ml={2}>Secure Payments</Text>
        </Flex>
      </VStack>
    </Box>
  </Box>
);

export default About;