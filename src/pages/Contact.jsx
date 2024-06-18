import { Box, Text, Heading, VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const Contact = () => (
  <Box p={4}>
    <Heading mb={4}>Contact Us</Heading>
    <Text fontSize="lg" mb={6}>
      Have questions? Get in touch with us!
    </Text>
    <Box bg="gray.100" p={10}>
      <VStack spacing={5}>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="message">
          <FormLabel>Message</FormLabel>
          <Input type="text" />
        </FormControl>
        <Button colorScheme="blue">Submit</Button>
      </VStack>
    </Box>
  </Box>
);

export default Contact;