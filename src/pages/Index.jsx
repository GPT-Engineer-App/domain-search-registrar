import { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
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
      <VStack spacing={4}>
        <Text fontSize="2xl">Domain Name Registrar</Text>
        
        <Input placeholder="Enter domain name" value={domain} onChange={(e) => setDomain(e.target.value)} />
        <Button onClick={handleSearch} colorScheme="blue">Check Availability</Button>
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