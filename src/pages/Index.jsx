import { useState } from "react";
import { Container, VStack, Input, Button, Box, Flex, Text, SimpleGrid, Image, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import domains from "../data/domains.json";

const checkDomainAvailability = (domain) => {
  return domains.hasOwnProperty(domain.toLowerCase());
};

const generateSuggestions = (domain) => {
  const tlds = [".co", ".io", ".net", ".org", ".biz", ".info", ".us", ".online", ".site", ".tech"];
  const root = domain.split(".")[0];
  return tlds.map((tld) => root + tld);
};

const addToCart = (domain) => {
  console.log("Adding to cart:", domain);
  // Add logic to handle adding the domain to the cart
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
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" pt={10}>
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
      </VStack>
      <SimpleGrid columns={4} spacing={10} mt={10}>
        <Box textAlign="center">
          <Image src="/images/domain-names.jpg" alt="Domain Names" />
          <Text mt={2}>Domain Names</Text>
        </Box>
        <Box textAlign="center">
          <Image src="/images/hot-tlds.jpg" alt="Hot TLDs" />
          <Text mt={2}>Hot TLDs</Text>
        </Box>
        <Box textAlign="center">
          <Image src="/images/advanced-search.jpg" alt="Advanced Search" />
          <Text mt={2}>Advanced Search</Text>
        </Box>
        <Box textAlign="center">
          <Image src="/images/expired-auctions.jpg" alt="Expired Auctions" />
          <Text mt={2}>Expired Auctions</Text>
        </Box>
      </SimpleGrid>
      {search && (
        <Box mt={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Domain</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{search.domain}</Td>
                <Td>{search.isUnavailable ? "Not Available" : "Available"}</Td>
                <Td>
                  {!search.isUnavailable && (
                    <Button colorScheme="blue" onClick={() => addToCart(search.domain)}>
                      Add to Cart
                    </Button>
                  )}
                </Td>
              </Tr>
              {search.isUnavailable &&
                generateSuggestions(search.domain).map((suggestion) => (
                  <Tr key={suggestion}>
                    <Td>{suggestion}</Td>
                    <Td>Available</Td>
                    <Td>
                      <Button colorScheme="blue" onClick={() => addToCart(suggestion)}>
                        Add to Cart
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default Index;