import { useState, useRef } from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Input,
    Textarea,
    Button,
    Badge,
    Icon,
} from "@chakra-ui/react";
import { FaTimes, FaImage, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router";
import { createShort } from "../service/api";
import { toaster } from "@/components/ui/toaster";

export const CreateShortPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const videoInputRef = useRef<HTMLInputElement>(null);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: (file: File | null) => void
    ) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoFile) {
            toaster.create({
                title: "Video required",
                description: "Please upload a video file.",
                type: "error",
            });
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video_file", videoFile);
        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }
        // Append tags individually as 'tags' key
        tags.forEach((tag) => {
            formData.append("tags", tag);
        });

        try {
            await createShort(formData);
            toaster.create({
                title: "Success!",
                description: "Your short has been uploaded.",
                type: "success",
            });
            navigate("/");
        } catch (error: any) {
            console.error("Upload error:", error);
            toaster.create({
                title: "Upload failed",
                description: error.response?.data?.detail || "Something went wrong.",
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            minH="100vh"
            bg="linear-gradient(to bottom, #141414, #000000)"
            py={8}
            px={{ base: 4, md: 8 }}
            display="flex"
            justifyContent="center"
        >
            <Box w="full" maxW="800px">
                <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="white"
                    mb={8}
                    textAlign="center"
                >
                    Upload Short
                </Text>

                <form onSubmit={handleSubmit}>
                    <VStack gap={6} align="stretch">
                        {/* Video Upload */}
                        <Box
                            border="2px dashed"
                            borderColor={videoFile ? "green.500" : "gray.600"}
                            borderRadius="xl"
                            p={8}
                            textAlign="center"
                            bg="rgba(255, 255, 255, 0.05)"
                            cursor="pointer"
                            onClick={() => videoInputRef.current?.click()}
                            transition="all 0.2s"
                            _hover={{ borderColor: "gray.400", bg: "rgba(255, 255, 255, 0.08)" }}
                        >
                            <input
                                type="file"
                                accept="video/*"
                                ref={videoInputRef}
                                hidden
                                onChange={(e) => handleFileChange(e, setVideoFile)}
                            />
                            <VStack gap={3}>
                                <Icon as={FaVideo} boxSize={10} color={videoFile ? "green.400" : "gray.400"} />
                                <Text color="white" fontWeight="medium">
                                    {videoFile ? videoFile.name : "Click to upload video"}
                                </Text>
                                {!videoFile && (
                                    <Text color="gray.500" fontSize="sm">
                                        MP4, WebM or Ogg (Max 50MB)
                                    </Text>
                                )}
                            </VStack>
                        </Box>

                        {/* Thumbnail Upload */}
                        <Box
                            border="2px dashed"
                            borderColor={thumbnailFile ? "green.500" : "gray.600"}
                            borderRadius="xl"
                            p={6}
                            textAlign="center"
                            bg="rgba(255, 255, 255, 0.05)"
                            cursor="pointer"
                            onClick={() => thumbnailInputRef.current?.click()}
                            transition="all 0.2s"
                            _hover={{ borderColor: "gray.400", bg: "rgba(255, 255, 255, 0.08)" }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                ref={thumbnailInputRef}
                                hidden
                                onChange={(e) => handleFileChange(e, setThumbnailFile)}
                            />
                            <HStack justify="center" gap={3}>
                                <Icon as={FaImage} boxSize={6} color={thumbnailFile ? "green.400" : "gray.400"} />
                                <Text color="white" fontWeight="medium">
                                    {thumbnailFile ? thumbnailFile.name : "Upload Thumbnail (Optional)"}
                                </Text>
                            </HStack>
                        </Box>

                        {/* Title */}
                        <VStack align="stretch" gap={2}>
                            <Text color="gray.300" fontSize="sm" fontWeight="medium">
                                Title
                            </Text>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Give your short a catchy title"
                                bg="rgba(0, 0, 0, 0.4)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="white"
                                _focus={{ borderColor: "#E50914", boxShadow: "none" }}
                                required
                            />
                        </VStack>

                        {/* Description */}
                        <VStack align="stretch" gap={2}>
                            <Text color="gray.300" fontSize="sm" fontWeight="medium">
                                Description
                            </Text>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What's this video about?"
                                bg="rgba(0, 0, 0, 0.4)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="white"
                                _focus={{ borderColor: "#E50914", boxShadow: "none" }}
                                rows={4}
                            />
                        </VStack>

                        {/* Tags */}
                        <VStack align="stretch" gap={2}>
                            <Text color="gray.300" fontSize="sm" fontWeight="medium">
                                Tags
                            </Text>
                            <Input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                placeholder="Add tags and press Enter"
                                bg="rgba(0, 0, 0, 0.4)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="white"
                                _focus={{ borderColor: "#E50914", boxShadow: "none" }}
                            />
                            <HStack gap={2} flexWrap="wrap">
                                {tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        colorScheme="red"
                                        bg="rgba(229, 9, 20, 0.2)"
                                        color="#E50914"
                                        px={2}
                                        py={1}
                                        borderRadius="md"
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        {tag}
                                        <Button
                                            onClick={() => removeTag(tag)}
                                            _hover={{ color: "white" }}
                                            size={"xs"}
                                            variant="ghost"
                                        >
                                            <FaTimes />
                                        </Button>
                                    </Badge>
                                ))}
                            </HStack>
                        </VStack>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            bg="#E50914"
                            color="white"
                            _hover={{ bg: "#b8070f" }}
                            loading={isLoading}
                            loadingText="Uploading..."
                            mt={4}
                        >
                            Upload Short
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
};
