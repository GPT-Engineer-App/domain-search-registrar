import { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Spinner, Alert, AlertIcon, Select } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchDomainAvailability = async (domain, username, password) => {
  const response = await fetch(`https://api.example.com/check-domain?domain=${domain}`, {
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    }
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const performDomainAction = async ({ action, domain }) => {
  const response = await fetch(`https://api.example.com/domain-action`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, domain }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const [domain, setDomain] = useState("");
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(["domainAvailability", search], () => fetchDomainAvailability(search, document.getElementById("username").value, document.getElementById("password").value), {
    enabled: !!search,
  });

  const mutation = useMutation(performDomainAction, {
    onSuccess: () => {
      queryClient.invalidateQueries("domainAvailability");
    },
  });

  const handleSearch = () => {
    setSearch(domain);
  };

  const handleAction = () => {
    mutation.mutate({ action, domain });
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
        <Select placeholder="Select action" onChange={(e) => setAction(e.target.value)}>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="renew">Renew</option>
          <option value="transfer">Transfer</option>
        </Select>
        <Button onClick={handleAction} colorScheme="blue">Perform Action</Button>
      </VStack>
    </Container>
  );
};

export default Index;