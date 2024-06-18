import { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useQuery } from "react-query";

const fetchDomainAvailability = async (domain) => {
  const response = await fetch(`https://api.example.com/check-domain?domain=${domain}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const [domain, setDomain] = useState("");
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useQuery(["domainAvailability", search], () => fetchDomainAvailability(search), {
    enabled: !!search,
  });

  const handleSearch = () => {
    setSearch(domain);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Domain Name Registrar</Text>
        <Input placeholder="Enter domain name" value={domain} onChange={(e) => setDomain(e.target.value)} />
        <Button onClick={handleSearch} colorScheme="blue">Check Availability</Button>
        {isLoading && <Spinner />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        )}
        {data && (
          <Box>
            {data.available ? (
              <Text>Domain is available! <Button colorScheme="green">Add to Cart</Button></Text>
            ) : (
              <Box>
                <Text>Domain is not available. Here are some suggestions:</Text>
                <VStack spacing={2}>
                  {data.suggestions.map((suggestion) => (
                    <Text key={suggestion}>{suggestion}</Text>
                  ))}
                </VStack>
              </Box>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;