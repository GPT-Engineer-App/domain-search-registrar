import { useState } from "react";
import magnifyingGlassIcon from "../../public/images/magnifying-glass-icon.png"; // Assuming the magnifying glass icon is saved in this path
import { Container, VStack, Input, Button, Box, Flex, Text, SimpleGrid, Image, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" pt={10}>
      <VStack spacing={4} width="100%">
        <Flex width="100%">
          <Input
            placeholder="What domain would you like"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            leftElement={<Image src={magnifyingGlassIcon} alt="Search" boxSize="24px" />}
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
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{search.domain}</Td>
                <Td>
                  {search.isUnavailable ? (
                    <>
                      <Text>This domain is not available.</Text>
                      <Box mt={4}>
                        <Text>Suggested Alternatives:</Text>
                        <VStack spacing={2} align="start">
                          {[".co", ".io", ".net", ".org", ".biz", ".info", ".us", ".me", ".tv", ".online"].map((tld) => (
                            <Text key={tld}>{`${search.domain.split('.')[0]}${tld}`}</Text>
                          ))}
                        </VStack>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Text>This domain is available for $11.97.</Text>
                      <Button colorScheme="blue" mt={2}>Add to Cart</Button>
                    </>
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default Index;