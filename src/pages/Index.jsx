import { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useQuery } from "react-query";

const fetchDomainAvailability = async (domain, username, password) => {
  const response = await fetch(`https://czds-api.icann.org/domains/${domain}`, {
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    }
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const [domain, setDomain] = useState("");
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useQuery(["domainAvailability", search], () => fetchDomainAvailability(search, document.getElementById("username").value, document.getElementById("password").value), {
    enabled: !!search,
  });

  const handleSearch = () => {
    setSearch(domain);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Domain Name Registrar</Text>
        <Input id="username" placeholder="Enter CZDS username" />
        <Input id="password" placeholder="Enter CZDS password" type="password" />
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
            {data.status === "available" ? (
              <Text>Domain is available!</Text>
            ) : (
              <Text>Domain is unavailable.</Text>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;