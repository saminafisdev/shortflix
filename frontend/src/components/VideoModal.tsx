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
                    bg="rgba(0, 0, 0, 0.95)"
                    backdropFilter="blur(10px)"
                />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg="transparent"
                        boxShadow="none"
                        maxW={{ base: "100vw", md: "90vw" }}
                        maxH={{ base: "100vh", md: "90vh" }}
                        w="full"
                        h={{ base: "full", md: "auto" }}
                        p={0}
                        m={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {/* Close Button */}
                        <Box
                            position="absolute"
                            top={{ base: 3, md: 4 }}
                            right={{ base: 3, md: 4 }}
                            zIndex={20}
                        >
                            <Box
                                as="button"
                                onClick={onClose}
                                bg="rgba(0, 0, 0, 0.8)"
                                color="white"
                                borderRadius="full"
                                p={{ base: 2.5, md: 3 }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                transition="all 0.2s"
                                _hover={{
                                    bg: "rgba(229, 9, 20, 0.9)",
                                    transform: "scale(1.05)"
                                }}
                                _active={{
                                    transform: "scale(0.95)"
                                }}
                                border="2px solid rgba(255, 255, 255, 0.3)"
                                boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
                            >
                                <FaTimes size={18} />
                            </Box>
                        </Box>

                        {/* Video Player and Info Container */}
                        <Box
                            w="full"
                            h="full"
                            maxW={{ base: "100%", md: "90vw" }}
                            maxH={{ base: "100%", md: "90vh" }}
                            overflowY={{ base: "auto", md: "visible" }}
                            overflowX="hidden"
                            p={{ base: 0, md: 4 }}
                            display="flex"
                            alignItems={{ base: "flex-start", md: "center" }}
                            justifyContent="center"
                        >
                            <VStack
                                gap={{ base: 0, md: 4 }}
                                align="stretch"
                                w="full"
                                maxW={{ base: "100%", md: "1200px" }}
                            >
                                {/* Video Player */}
                                <Box
                                    borderRadius={{ base: 0, md: "lg" }}
                                    overflow="hidden"
                                    bg="black"
                                    boxShadow={{ base: "none", md: "2xl" }}
                                    position="relative"
                                >
                                    <video
                                        src={short.video_file}
                                        controls
                                        autoPlay
                                        playsInline
                                        style={{
                                            width: "100%",
                                            maxHeight: "70vh",
                                            height: "auto",
                                            objectFit: "contain",
                                            display: "block"
                                        }}
                                    />
                                </Box>

                                {/* Video Info */}
                                <Box
                                    bg={{ base: "rgba(0, 0, 0, 0.95)", md: "rgba(0, 0, 0, 0.7)" }}
                                    backdropFilter="blur(10px)"
                                    p={{ base: 4, md: 5 }}
                                    borderRadius={{ base: 0, md: "lg" }}
                                    border={{ base: "none", md: "1px solid rgba(255, 255, 255, 0.1)" }}
                                    borderTop={{ base: "1px solid rgba(255, 255, 255, 0.1)", md: "none" }}
                                >
                                    <VStack align="stretch" gap={{ base: 2.5, md: 3 }}>
                                        {/* Title and Tags */}
                                        <VStack align="stretch" gap={2}>
                                            <Text
                                                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                                                fontWeight="bold"
                                                color="white"
                                                lineHeight="1.3"
                                            >
                                                {short.title}
                                            </Text>

                                            {short.tags.length > 0 && (
                                                <HStack gap={2} flexWrap="wrap">
                                                    {short.tags.slice(0, 5).map((tag, index) => (
                                                        <Badge
                                                            key={index}
                                                            colorScheme="red"
                                                            bg="rgba(229, 9, 20, 0.9)"
                                                            color="white"
                                                            fontSize={{ base: "2xs", md: "xs" }}
                                                            px={{ base: 2, md: 2.5 }}
                                                            py={1}
                                                            borderRadius="md"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </HStack>
                                            )}
                                        </VStack>

                                        {/* Description */}
                                        {short.description && (
                                            <Text
                                                fontSize={{ base: "sm", md: "md" }}
                                                color="gray.300"
                                                lineHeight="1.6"
                                            >
                                                {short.description}
                                            </Text>
                                        )}

                                        {/* Views and Date */}
                                        <HStack
                                            gap={{ base: 2, md: 4 }}
                                            fontSize={{ base: "xs", md: "sm" }}
                                            color="gray.400"
                                            flexWrap="wrap"
                                        >
                                            <Text fontWeight="medium">
                                                {short.views.toLocaleString()} views
                                            </Text>
                                            <Text display={{ base: "none", sm: "block" }}>•</Text>
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

                                {/* Bottom padding for mobile scroll */}
                                <Box h={{ base: 4, md: 0 }} />
                            </VStack>
                        </Box>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
