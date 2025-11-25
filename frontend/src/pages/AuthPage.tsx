import { useState } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

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
