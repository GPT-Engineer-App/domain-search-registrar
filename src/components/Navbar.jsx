import { Box, Flex, Link, Spacer, Text, Image } from "@chakra-ui/react";
import cartIcon from "../../public/images/cart-icon.png"; // Assuming the cart icon is saved in this path
import { Link as RouterLink } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <Box bg="brand.700" p={4}>
      <Flex align="center">
        <Text fontSize="xl" color="white" fontWeight="bold">
          Domain Registrar
        </Text>
        <Spacer />
        <Link as={RouterLink} to="/" color="white" mx={2}>
          Home
        </Link>
        <Link as={RouterLink} to="/about" color="white" mx={2}>
          About
        </Link>
        <Link as={RouterLink} to="/contact" color="white" mx={2}>
          Contact
        </Link>
        <Link as={RouterLink} to="/cart" color="white" mx={2}>
          <Image src={cartIcon} alt="Cart" boxSize="24px" />
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;