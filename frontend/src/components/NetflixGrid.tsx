import { Box, Grid, Heading, Image, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { FaPlay, FaPlus, FaStar } from "react-icons/fa";
import type { Short } from "../types";
import { VideoModal } from "./VideoModal";


interface VideoCardProps {
    short: Short;
    onVideoClick: (short: Short) => void;
}

const VideoCard = ({ short, onVideoClick }: VideoCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // Format views count
    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        } else if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    // Calculate a mock rating based on views (you can replace this with actual rating from backend)
    const mockRating = Math.min(5, 3.5 + (short.views / 10000));

    return (
        <Box
            position="relative"
            borderRadius="md"
            overflow="hidden"
            cursor="pointer"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            transform={isHovered ? "scale(1.05)" : "scale(1)"}
            zIndex={isHovered ? 10 : 1}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            boxShadow={isHovered ? "2xl" : "md"}
            onClick={() => onVideoClick(short)}
        >
            {/* Thumbnail */}
            <Box position="relative" paddingBottom="56.25%" bg="gray.800">
                <Image
                    src={short.thumbnail || `https://picsum.photos/seed/${short.id}/400/225`}
                    alt={short.title}
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    transition="opacity 0.3s"
                    opacity={isHovered ? 0.7 : 1}
                />

                {/* Tags Badge */}
                {short.tags.length > 0 && (
                    <Badge
                        position="absolute"
                        top={2}
                        left={2}
                        colorScheme="red"
                        bg="rgba(229, 9, 20, 0.9)"
                        color="white"
                        fontSize="xs"
                        px={2}
                        py={1}
                    >
                        {short.tags[0]}
                    </Badge>
                )}

                {/* Hover Overlay */}
                {isHovered && (
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        bg="rgba(0, 0, 0, 0.5)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        animation="fadeIn 0.3s"
                    >
                        <HStack gap={3}>
                            <Box
                                as="button"
                                bg="white"
                                color="black"
                                borderRadius="full"
                                p={3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                transition="all 0.2s"
                                _hover={{ transform: "scale(1.1)", bg: "gray.200" }}
                            >
                                <FaPlay size={16} />
                            </Box>
                            <Box
                                as="button"
                                bg="rgba(255, 255, 255, 0.2)"
                                color="white"
                                borderRadius="full"
                                p={3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                border="2px solid white"
                                transition="all 0.2s"
                                _hover={{ transform: "scale(1.1)", bg: "rgba(255, 255, 255, 0.3)" }}
                            >
                                <FaPlus size={16} />
                            </Box>
                        </HStack>
                    </Box>
                )}
            </Box>

            {/* Info Section */}
            <Box
                bg="gray.900"
                p={3}
                transition="all 0.3s"
                height={isHovered ? "auto" : "80px"}
            >
                <VStack align="stretch" gap={2}>
                    <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="white"
                        lineClamp={isHovered ? undefined : 2}
                        transition="all 0.3s"
                    >
                        {short.title}
                    </Text>

                    {isHovered && (
                        <>
                            {short.description && (
                                <Text
                                    fontSize="xs"
                                    color="gray.400"
                                    lineClamp={2}
                                >
                                    {short.description}
                                </Text>
                            )}
                            <HStack gap={3} fontSize="xs" color="gray.400">
                                <HStack gap={1}>
                                    <FaStar color="#FFD700" size={12} />
                                    <Text>{mockRating.toFixed(1)}</Text>
                                </HStack>
                                <Text>{formatViews(short.views)} views</Text>
                            </HStack>
                        </>
                    )}
                </VStack>
            </Box>
        </Box>
    );
};

interface NetflixGridProps {
    shorts: Short[];
}

export const NetflixGrid = ({ shorts }: NetflixGridProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const videoId = searchParams.get('video');

    // Find the selected video based on URL parameter
    const selectedVideo = videoId ? shorts.find(s => s.id.toString() === videoId) || null : null;

    const handleVideoClick = (short: Short) => {
        setSearchParams({ video: short.id.toString() });
    };

    const handleCloseModal = () => {
        setSearchParams({});
    };

    return (
        <Box
            minH="100vh"
            bg="linear-gradient(to bottom, #141414, #000000)"
            py={8}
            px={{ base: 4, md: 8, lg: 12 }}
        >
            <style>
                {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
            </style>

            <VStack align="stretch" gap={6}>
                {/* Page Title */}
                <Heading
                    size="2xl"
                    mb={4}
                    color="white"
                    fontWeight="bold"
                    letterSpacing="tight"
                >
                    Shorts
                </Heading>

                {/* Grid of Shorts */}
                {shorts.length > 0 ? (
                    <Grid
                        templateColumns={{
                            base: "repeat(2, 1fr)",
                            sm: "repeat(3, 1fr)",
                            md: "repeat(4, 1fr)",
                            lg: "repeat(5, 1fr)",
                            xl: "repeat(6, 1fr)",
                        }}
                        gap={4}
                    >
                        {shorts.map((short) => (
                            <VideoCard
                                key={short.id}
                                short={short}
                                onVideoClick={handleVideoClick}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Box
                        textAlign="center"
                        py={20}
                        color="gray.400"
                    >
                        <Text fontSize="xl">No shorts available yet</Text>
                        <Text fontSize="sm" mt={2}>Check back later for new content</Text>
                    </Box>
                )}
            </VStack>

            {/* Video Modal */}
            <VideoModal
                short={selectedVideo}
                isOpen={!!selectedVideo}
                onClose={handleCloseModal}
            />
        </Box>
    );
};
