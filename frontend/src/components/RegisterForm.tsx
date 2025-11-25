import { useState } from "react";
import { Box, Input, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { PasswordInput } from "./ui/password-input";

interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setIsLoading(true);

        try {
            await register(username, email, password);
            // Redirect will happen automatically via AuthContext
        } catch (err: any) {
            const errorData = err.response?.data;
            if (errorData) {
                // Handle Django validation errors
                const errorMessages = Object.entries(errorData)
                    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
                    .join(". ");
                setError(errorMessages || "Registration failed. Please try again.");
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            as="form"
            onSubmit={handleSubmit}
            bg="rgba(20, 20, 20, 0.95)"
            backdropFilter="blur(20px)"
            p={{ base: 6, md: 8 }}
            borderRadius="xl"
            border="1px solid rgba(255, 255, 255, 0.1)"
            boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.5)"
            maxW="450px"
            w="full"
        >
            <VStack align="stretch" gap={5}>
                {/* Header */}
                <VStack gap={2}>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="white">
                        Sign Up
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        Create your ShortFlix account
                    </Text>
                </VStack>

                {/* Error Message */}
                {error && (
                    <Box
                        bg="rgba(229, 9, 20, 0.1)"
                        border="1px solid rgba(229, 9, 20, 0.5)"
                        borderRadius="md"
                        p={3}
                    >
                        <Text fontSize="sm" color="#E50914">
                            {error}
                        </Text>
                    </Box>
                )}

                {/* Username Input */}
                <VStack align="stretch" gap={2}>
                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        Username
                    </Text>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            left={3}
                            top="50%"
                            transform="translateY(-50%)"
                            color="gray.500"
                            pointerEvents="none"
                        >
                            <FaUser size={16} />
                        </Box>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            bg="rgba(0, 0, 0, 0.4)"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            color="white"
                            pl={10}
                            _placeholder={{ color: "gray.500" }}
                            _hover={{
                                border: "1px solid rgba(229, 9, 20, 0.5)"
                            }}
                            _focus={{
                                border: "1px solid #E50914",
                                boxShadow: "0 0 0 1px #E50914"
                            }}
                            size="lg"
                            borderRadius="md"
                            required
                        />
                    </Box>
                </VStack>

                {/* Email Input */}
                <VStack align="stretch" gap={2}>
                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        Email
                    </Text>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            left={3}
                            top="50%"
                            transform="translateY(-50%)"
                            color="gray.500"
                            pointerEvents="none"
                        >
                            <FaEnvelope size={16} />
                        </Box>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            bg="rgba(0, 0, 0, 0.4)"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            color="white"
                            pl={10}
                            _placeholder={{ color: "gray.500" }}
                            _hover={{
                                border: "1px solid rgba(229, 9, 20, 0.5)"
                            }}
                            _focus={{
                                border: "1px solid #E50914",
                                boxShadow: "0 0 0 1px #E50914"
                            }}
                            size="lg"
                            borderRadius="md"
                            required
                        />
                    </Box>
                </VStack>

                {/* Password Input */}
                <VStack align="stretch" gap={2}>
                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        Password
                    </Text>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            left={3}
                            top="50%"
                            transform="translateY(-50%)"
                            color="gray.500"
                            pointerEvents="none"
                        >
                            <FaLock size={16} />
                        </Box>
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            bg="rgba(0, 0, 0, 0.4)"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            color="white"
                            pl={10}
                            pr={10}
                            _placeholder={{ color: "gray.500" }}
                            _hover={{
                                border: "1px solid rgba(229, 9, 20, 0.5)"
                            }}
                            _focus={{
                                border: "1px solid #E50914",
                                boxShadow: "0 0 0 1px #E50914"
                            }}
                            size="lg"
                            borderRadius="md"
                            required
                        />
                    </Box>
                </VStack>

                {/* Confirm Password Input */}
                <VStack align="stretch" gap={2}>
                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        Confirm Password
                    </Text>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            left={3}
                            top="50%"
                            transform="translateY(-50%)"
                            color="gray.500"
                            pointerEvents="none"
                        >
                            <FaLock size={16} />
                        </Box>
                        <PasswordInput
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            bg="rgba(0, 0, 0, 0.4)"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            color="white"
                            pl={10}
                            _placeholder={{ color: "gray.500" }}
                            _hover={{
                                border: "1px solid rgba(229, 9, 20, 0.5)"
                            }}
                            _focus={{
                                border: "1px solid #E50914",
                                boxShadow: "0 0 0 1px #E50914"
                            }}
                            size="lg"
                            borderRadius="md"
                            required
                        />
                    </Box>
                </VStack>

                {/* Submit Button */}
                <Button
                    type="submit"
                    bg="#E50914"
                    color="white"
                    py={3}
                    borderRadius="md"
                    fontWeight="bold"
                    fontSize="md"
                    transition="all 0.2s"
                    _hover={{
                        bg: "#b8070f",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(229, 9, 20, 0.4)"
                    }}
                    _active={{
                        transform: "translateY(0)"
                    }}
                    disabled={isLoading}
                    opacity={isLoading ? 0.7 : 1}
                    cursor={isLoading ? "not-allowed" : "pointer"}
                >
                    {isLoading ? "Creating account..." : "Sign Up"}
                </Button>

                {/* Switch to Login */}
                <HStack justify="center" gap={1}>
                    <Text fontSize="sm" color="gray.400">
                        Already have an account?
                    </Text>
                    <Text
                        fontSize="sm"
                        color="#E50914"
                        fontWeight="medium"
                        onClick={onSwitchToLogin}
                        _hover={{ textDecoration: "underline" }}
                    >
                        Sign in
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );
};
