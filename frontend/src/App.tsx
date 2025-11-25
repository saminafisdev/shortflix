import { useEffect, useState, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { NetflixGrid } from "./components/NetflixGrid";
import { SearchBar } from "./components/SearchBar";
import type { SearchFilters } from "./components/SearchBar";
import { api } from "./service/api";
import type { Short } from "./types";

export default function App() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    fetchShorts({ title: "", description: "", tag: "" });
  }, [fetchShorts]);

  const handleSearch = useCallback((filters: SearchFilters) => {
    fetchShorts(filters);
  }, [fetchShorts]);

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(to bottom, #141414, #000000)"
      py={8}
      px={{ base: 4, md: 8, lg: 12 }}
    >
      <SearchBar onSearch={handleSearch} />
      <NetflixGrid shorts={shorts} isLoading={isLoading} />
    </Box>
  );
}
