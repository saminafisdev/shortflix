import { useEffect, useState, useCallback } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { FaUser, FaSignOutAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { NetflixGrid } from "../components/NetflixGrid";
import { SearchBar } from "../components/SearchBar";
import type { SearchFilters } from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { api } from "../service/api";
import type { Short } from "../types";

export const HomePage = () => {
    const [shorts, setShorts] = useState<Short[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const fetchShorts = useCallback(async (filters: SearchFilters) => {
        setIsLoading(true);
        try {
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

    // Fetch shorts on mount, regardless of auth status
    useEffect(() => {
        fetchShorts({ title: "", description: "", tag: "" });
    }, [fetchShorts]);

    const handleSearch = useCallback((filters: SearchFilters) => {
        fetchShorts(filters);
    }, [fetchShorts]);

    const handleLogout = async () => {
        await logout();
    };

    const handleCreateClick = () => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            // TODO: Navigate to create page
            console.log("Navigate to create page");
        }
    };

    return (
        <Box
            minH="100vh"
            bg="linear-gradient(to bottom, #141414, #000000)"
            py={8}
            px={{ base: 4, md: 8, lg: 12 }}
        >
            {/* Header */}
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
                    {/* Create Button - Visible to everyone, redirects if not auth */}
                    <Button
                        onClick={handleCreateClick}
                        bg="rgba(255, 255, 255, 0.1)"
                        color="white"
                        _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                        size="sm"
                    >
                        <FaPlus /> <Text ml={2}>Create</Text>
                    </Button>

                    {isAuthenticated ? (
                        <>
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
                        </>
                    ) : (
                        <Button
                            onClick={() => navigate("/login")}
                            bg="#E50914"
                            color="white"
                            _hover={{ bg: "#b8070f" }}
                            size="sm"
                            px={6}
                        >
                            Sign In
                        </Button>
                    )}
                </HStack>
            </HStack>

            <SearchBar onSearch={handleSearch} />
            <NetflixGrid shorts={shorts} isLoading={isLoading} />
        </Box>
    );
};
