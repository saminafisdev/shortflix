import { useEffect, useState, useCallback } from "react";
import { Box, HStack, Text, VStack, Spinner, Center } from "@chakra-ui/react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { NetflixGrid } from "./components/NetflixGrid";
import { SearchBar } from "./components/SearchBar";
import type { SearchFilters } from "./components/SearchBar";
import { AuthPage } from "./pages/AuthPage";
import { useAuth } from "./context/AuthContext";
import { api } from "./service/api";
import type { Short } from "./types";

export default function App() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  const fetchShorts = useCallback(async (filters: SearchFilters) => {
    setIsLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.title) params.append("title", filters.title);
      if (filters.description) params.append("description", filters.description);
      if (filters.tag) params.append("tag", filters.tag);

      const queryString = params.toString();
      const url = queryString ? `/shorts/?${queryString}` : "/shorts/";

      const response = await api.get(url);
      setShorts(response.data);
    } catch (error) {
      console.error("Error fetching shorts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchShorts({ title: "", description: "", tag: "" });
    }
  }, [fetchShorts, isAuthenticated]);

  const handleSearch = useCallback((filters: SearchFilters) => {
    fetchShorts(filters);
  }, [fetchShorts]);

  const handleLogout = async () => {
    await logout();
  };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <Box
        minH="100vh"
        bg="linear-gradient(to bottom, #141414, #000000)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Center>
          <VStack gap={4}>
            <Spinner
              size="xl"
              color="#E50914"
              css={{ "--spinner-track-color": "colors.gray.700" }}
              borderWidth="4px"
            />
            <Text color="gray.400" fontSize="lg">
              Loading...
            </Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(to bottom, #141414, #000000)"
      py={8}
      px={{ base: 4, md: 8, lg: 12 }}
    >
      {/* Header with User Info */}
      <HStack justify="space-between" mb={6}>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="#E50914"
          letterSpacing="tight"
        >
          SHORTFLIX
        </Text>

        <HStack gap={4}>
          <HStack gap={2} color="white">
            <FaUser size={16} />
            <Text fontSize={{ base: "sm", md: "md" }} display={{ base: "none", sm: "block" }}>
              {user?.username}
            </Text>
          </HStack>

          <Box
            as="button"
            onClick={handleLogout}
            color="gray.400"
            display="flex"
            alignItems="center"
            gap={2}
            p={2}
            borderRadius="md"
            transition="all 0.2s"
            _hover={{
              color: "white",
              bg: "rgba(255, 255, 255, 0.1)"
            }}
          >
            <FaSignOutAlt size={18} />
            <Text fontSize="sm" display={{ base: "none", md: "block" }}>
              Logout
            </Text>
          </Box>
        </HStack>
      </HStack>

      <SearchBar onSearch={handleSearch} />
      <NetflixGrid shorts={shorts} isLoading={isLoading} />
    </Box>
  );
}
