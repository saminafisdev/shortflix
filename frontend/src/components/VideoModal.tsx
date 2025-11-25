import { Dialog, Portal, Box, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import type { Short } from "../types";

interface VideoModalProps {
    short: Short | null;
    isOpen: boolean;
    onClose: () => void;
}

export const VideoModal = ({ short, isOpen, onClose }: VideoModalProps) => {
    if (!short) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="full">
            <Portal>
                <Dialog.Backdrop
                    bg="rgba(0, 0, 0, 0.9)"
                    backdropFilter="blur(10px)"
                />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg="transparent"
                        boxShadow="none"
                        maxW="90vw"
                        maxH="90vh"
                        p={0}
                    >
                        {/* Close Button */}
                        <Box
                            position="absolute"
                            top={{ base: 2, md: 4 }}
                            right={{ base: 2, md: 4 }}
                            zIndex={10}
                        >
                            <Box
                                as="button"
                                onClick={onClose}
                                bg="rgba(0, 0, 0, 0.7)"
                                color="white"
                                borderRadius="full"
                                p={3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                transition="all 0.2s"
                                _hover={{
                                    bg: "rgba(255, 255, 255, 0.2)",
                                    transform: "scale(1.1)"
                                }}
                                border="2px solid rgba(255, 255, 255, 0.3)"
                            >
                                <FaTimes size={20} />
                            </Box>
                        </Box>

                        {/* Video Player */}
                        <VStack gap={4} align="stretch">
                            <Box
                                borderRadius="lg"
                                overflow="hidden"
                                bg="black"
                                boxShadow="2xl"
                            >
                                <video
                                    src={short.video_file}
                                    controls
                                    autoPlay
                                    style={{
                                        width: "100%",
                                        maxHeight: "70vh",
                                        objectFit: "contain"
                                    }}
                                />
                            </Box>

                            {/* Video Info */}
                            <Box
                                bg="rgba(0, 0, 0, 0.7)"
                                backdropFilter="blur(10px)"
                                p={4}
                                borderRadius="lg"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                            >
                                <VStack align="stretch" gap={3}>
                                    <HStack justify="space-between" align="start">
                                        <Text
                                            fontSize={{ base: "lg", md: "2xl" }}
                                            fontWeight="bold"
                                            color="white"
                                        >
                                            {short.title}
                                        </Text>
                                        {short.tags.length > 0 && (
                                            <HStack gap={2} flexWrap="wrap">
                                                {short.tags.slice(0, 3).map((tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        colorScheme="red"
                                                        bg="rgba(229, 9, 20, 0.9)"
                                                        color="white"
                                                        fontSize="xs"
                                                        px={2}
                                                        py={1}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </HStack>
                                        )}
                                    </HStack>

                                    {short.description && (
                                        <Text
                                            fontSize={{ base: "sm", md: "md" }}
                                            color="gray.300"
                                        >
                                            {short.description}
                                        </Text>
                                    )}

                                    <HStack gap={4} fontSize="sm" color="gray.400">
                                        <Text>{short.views.toLocaleString()} views</Text>
                                        <Text>•</Text>
                                        <Text>
                                            {new Date(short.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </Box>
                        </VStack>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
