import { Box, Input, HStack, VStack, Text } from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
    onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
    title: string;
    description: string;
    tag: string;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [filters, setFilters] = useState<SearchFilters>({
        title: "",
        description: "",
        tag: ""
    });
    const isFirstRender = useRef(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const searchBoxRef = useRef<HTMLDivElement>(null);

    // Debounce search - wait 500ms after user stops typing
    useEffect(() => {
        // Skip the effect on first render to avoid duplicate initial fetch
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            onSearch(filters);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [filters, onSearch]);

    const handleInputChange = (field: keyof SearchFilters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleClear = () => {
        setFilters({ title: "", description: "", tag: "" });
        setIsExpanded(false);
    };

    const hasActiveFilters = filters.title || filters.description || filters.tag;
    const activeFilterCount = [filters.title, filters.description, filters.tag].filter(Boolean).length;

    // Handle click outside to collapse
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
                if (!hasActiveFilters) {
                    setIsExpanded(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [hasActiveFilters]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Escape to collapse (only if no active filters)
            if (event.key === 'Escape' && isExpanded && !hasActiveFilters) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isExpanded, hasActiveFilters]);

    return (
        <Box
            ref={searchBoxRef}
            bg="rgba(20, 20, 20, 0.8)"
            backdropFilter="blur(10px)"
            borderRadius="xl"
            mb={6}
            border="1px solid rgba(255, 255, 255, 0.1)"
            boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            overflow="hidden"
        >
            {!isExpanded ? (
                // Collapsed State - Single Search Bar
                <Box
                    p={{ base: 3, md: 4 }}
                    cursor="pointer"
                    onClick={() => setIsExpanded(true)}
                    transition="all 0.2s"
                    _hover={{
                        bg: "rgba(30, 30, 30, 0.9)"
                    }}
                    _active={{
                        transform: "scale(0.99)"
                    }}
                >
                    <HStack gap={{ base: 2, md: 3 }}>
                        <Box flexShrink={0}>
                            <FaSearch color="#E50914" size={18} />
                        </Box>
                        <Input
                            placeholder="Search shorts..."
                            value={filters.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            onFocus={() => setIsExpanded(true)}
                            bg="transparent"
                            border="none"
                            color="white"
                            _placeholder={{ color: "gray.500" }}
                            _focus={{
                                outline: "none",
                                boxShadow: "none"
                            }}
                            size={{ base: "md", md: "lg" }}
                            fontSize={{ base: "sm", md: "md" }}
                        />
                        {hasActiveFilters && (
                            <HStack gap={2} flexShrink={0}>
                                {/* Active filter count badge */}
                                <Box
                                    bg="#E50914"
                                    color="white"
                                    borderRadius="full"
                                    minW="24px"
                                    h="24px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="xs"
                                    fontWeight="bold"
                                >
                                    {activeFilterCount}
                                </Box>
                                <Box
                                    as="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClear();
                                    }}
                                    color="gray.400"
                                    display="flex"
                                    alignItems="center"
                                    p={2}
                                    borderRadius="md"
                                    transition="all 0.2s"
                                    _hover={{
                                        color: "white",
                                        bg: "rgba(255, 255, 255, 0.1)"
                                    }}
                                    _active={{
                                        transform: "scale(0.95)"
                                    }}
                                >
                                    <FaTimes size={16} />
                                </Box>
                            </HStack>
                        )}
                    </HStack>
                </Box>
            ) : (
                // Expanded State - All Search Fields
                <Box p={{ base: 4, md: 6 }}>
                    <VStack align="stretch" gap={{ base: 3, md: 4 }}>
                        {/* Search Header */}
                        <HStack justify="space-between" mb={{ base: 1, md: 2 }}>
                            <HStack gap={2}>
                                <FaSearch color="#E50914" size={20} />
                                <Text
                                    fontSize={{ base: "md", md: "xl" }}
                                    fontWeight="bold"
                                    color="white"
                                >
                                    Search Shorts
                                </Text>
                            </HStack>
                            <HStack gap={{ base: 2, md: 3 }}>
                                {hasActiveFilters && (
                                    <Box
                                        as="button"
                                        onClick={handleClear}
                                        color="gray.400"
                                        fontSize={{ base: "xs", md: "sm" }}
                                        display="flex"
                                        alignItems="center"
                                        gap={1.5}
                                        p={2}
                                        borderRadius="md"
                                        transition="all 0.2s"
                                        _hover={{
                                            color: "white",
                                            bg: "rgba(255, 255, 255, 0.1)"
                                        }}
                                        _active={{
                                            transform: "scale(0.95)"
                                        }}
                                    >
                                        <FaTimes size={14} />
                                        <Text display={{ base: "none", sm: "inline" }}>Clear</Text>
                                    </Box>
                                )}
                                <Box
                                    as="button"
                                    onClick={() => !hasActiveFilters && setIsExpanded(false)}
                                    color="gray.400"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    p={2}
                                    borderRadius="md"
                                    transition="all 0.2s"
                                    _hover={{
                                        color: hasActiveFilters ? "gray.400" : "white",
                                        bg: hasActiveFilters ? "transparent" : "rgba(255, 255, 255, 0.1)"
                                    }}
                                    opacity={hasActiveFilters ? 0.5 : 1}
                                    cursor={hasActiveFilters ? "not-allowed" : "pointer"}
                                    _active={{
                                        transform: hasActiveFilters ? "none" : "scale(0.95)"
                                    }}
                                >
                                    <Text>✕</Text>
                                </Box>
                            </HStack>
                        </HStack>

                        {/* Search Inputs */}
                        <VStack align="stretch" gap={{ base: 2.5, md: 3 }}>
                            {/* Title Search */}
                            <Box>
                                <Text
                                    fontSize={{ base: "xs", md: "sm" }}
                                    color="gray.400"
                                    mb={1.5}
                                    fontWeight="medium"
                                >
                                    Title
                                </Text>
                                <Input
                                    placeholder="e.g., My awesome video"
                                    value={filters.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    bg="rgba(0, 0, 0, 0.4)"
                                    border="1px solid rgba(255, 255, 255, 0.1)"
                                    color="white"
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{
                                        border: "1px solid rgba(229, 9, 20, 0.5)"
                                    }}
                                    _focus={{
                                        border: "1px solid #E50914",
                                        boxShadow: "0 0 0 1px #E50914"
                                    }}
                                    size={{ base: "md", md: "lg" }}
                                    fontSize={{ base: "sm", md: "md" }}
                                    borderRadius="md"
                                />
                            </Box>

                            {/* Description and Tag in a column on mobile, row on desktop */}
                            <VStack
                                gap={{ base: 2.5, md: 3 }}
                                align="stretch"
                            >
                                {/* Description Search */}
                                <Box>
                                    <Text
                                        fontSize={{ base: "xs", md: "sm" }}
                                        color="gray.400"
                                        mb={1.5}
                                        fontWeight="medium"
                                    >
                                        Description
                                    </Text>
                                    <Input
                                        placeholder="e.g., Tutorial about..."
                                        value={filters.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        bg="rgba(0, 0, 0, 0.4)"
                                        border="1px solid rgba(255, 255, 255, 0.1)"
                                        color="white"
                                        _placeholder={{ color: "gray.500" }}
                                        _hover={{
                                            border: "1px solid rgba(229, 9, 20, 0.5)"
                                        }}
                                        _focus={{
                                            border: "1px solid #E50914",
                                            boxShadow: "0 0 0 1px #E50914"
                                        }}
                                        size={{ base: "md", md: "lg" }}
                                        fontSize={{ base: "sm", md: "md" }}
                                        borderRadius="md"
                                    />
                                </Box>

                                {/* Tag Search */}
                                <Box>
                                    <Text
                                        fontSize={{ base: "xs", md: "sm" }}
                                        color="gray.400"
                                        mb={1.5}
                                        fontWeight="medium"
                                    >
                                        Tag
                                    </Text>
                                    <Input
                                        placeholder="e.g., gaming, tutorial"
                                        value={filters.tag}
                                        onChange={(e) => handleInputChange("tag", e.target.value)}
                                        bg="rgba(0, 0, 0, 0.4)"
                                        border="1px solid rgba(255, 255, 255, 0.1)"
                                        color="white"
                                        _placeholder={{ color: "gray.500" }}
                                        _hover={{
                                            border: "1px solid rgba(229, 9, 20, 0.5)"
                                        }}
                                        _focus={{
                                            border: "1px solid #E50914",
                                            boxShadow: "0 0 0 1px #E50914"
                                        }}
                                        size={{ base: "md", md: "lg" }}
                                        fontSize={{ base: "sm", md: "md" }}
                                        borderRadius="md"
                                    />
                                </Box>
                            </VStack>
                        </VStack>

                        {/* Active Filters Display */}
                        {hasActiveFilters && (
                            <Box
                                mt={{ base: 1, md: 2 }}
                                p={{ base: 2.5, md: 3 }}
                                bg="rgba(229, 9, 20, 0.1)"
                                borderRadius="md"
                                border="1px solid rgba(229, 9, 20, 0.3)"
                            >
                                <Text fontSize="xs" color="gray.400" mb={1.5}>
                                    Active filters ({activeFilterCount}):
                                </Text>
                                <HStack gap={2} flexWrap="wrap">
                                    {filters.title && (
                                        <Box
                                            px={2.5}
                                            py={1}
                                            bg="rgba(229, 9, 20, 0.2)"
                                            borderRadius="md"
                                            fontSize="xs"
                                            color="white"
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <Text fontWeight="medium">Title:</Text>
                                            <Text>{filters.title}</Text>
                                        </Box>
                                    )}
                                    {filters.description && (
                                        <Box
                                            px={2.5}
                                            py={1}
                                            bg="rgba(229, 9, 20, 0.2)"
                                            borderRadius="md"
                                            fontSize="xs"
                                            color="white"
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <Text fontWeight="medium">Desc:</Text>
                                            <Text>{filters.description}</Text>
                                        </Box>
                                    )}
                                    {filters.tag && (
                                        <Box
                                            px={2.5}
                                            py={1}
                                            bg="rgba(229, 9, 20, 0.2)"
                                            borderRadius="md"
                                            fontSize="xs"
                                            color="white"
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <Text fontWeight="medium">Tag:</Text>
                                            <Text>{filters.tag}</Text>
                                        </Box>
                                    )}
                                </HStack>
                            </Box>
                        )}

                        {/* Helper text */}
                        <Text fontSize="xs" color="gray.500" textAlign="center" mt={1}>
                            {hasActiveFilters
                                ? "Clear filters to collapse"
                                : "Press ESC to collapse"}
                        </Text>
                    </VStack>
                </Box>
            )}
        </Box>
    );
};
