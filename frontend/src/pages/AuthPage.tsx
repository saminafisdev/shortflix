import { useState, useEffect } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Box
            minH="100vh"
            bg="linear-gradient(to bottom, #141414, #000000)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 4, md: 8 }}
        >
            <VStack gap={6} w="full" maxW="500px">
                {/* Logo/Brand */}
                <Text
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="bold"
                    color="#E50914"
                    letterSpacing="tight"
                >
                    SHORTFLIX
                </Text>

                {/* Auth Forms */}
                {isLogin ? (
                    <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
                )}
            </VStack>
        </Box>
    );
};
