import { useState } from "react";
import { Container, VStack, Input, Button, Box, Flex, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import domains from "../data/domains.json";

const checkDomainAvailability = (domain) => {
  return domains.hasOwnProperty(domain.toLowerCase());
};

const Index = () => {
  const [domain, setDomain] = useState("");
  const [search, setSearch] = useState(null);

  const handleSearch = () => {
    console.log("Searching for domain:", domain);
    const isUnavailable = checkDomainAvailability(domain);
    setSearch({ domain, isUnavailable });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Flex width="100%">
          <Input
            placeholder="What domain would you like"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            leftElement={<FaSearch color="gray.300" />}
            flex="1"
          />
          <Button onClick={handleSearch} colorScheme="blue" ml={2}>
            Search Domains
          </Button>
        </Flex>
        {search && (
          <Box>
            {search.isUnavailable ? (
              <Text>This domain is not available.</Text>
            ) : (
              <Text>This domain is available for $11.97.</Text>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;