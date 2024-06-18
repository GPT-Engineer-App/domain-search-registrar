import { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useQuery } from "react-query";

const fetchDomainAvailability = async (domain) => {
  try {
    const response = await fetch(`https://whois-json.who-dat.dev/whois/${domain}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("Error fetching domain availability:", error);
    throw error;
  }
};

const Index = () => {
  const [domain, setDomain] = useState("");
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useQuery(["domainAvailability", search], () => fetchDomainAvailability(search), {
    enabled: !!search,
  });

  const handleSearch = () => {
    console.log("Searching for domain:", domain);
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
            {error.message}
          </Alert>
        )}
        {data && (
          <Box>
            {data.registered ? (
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