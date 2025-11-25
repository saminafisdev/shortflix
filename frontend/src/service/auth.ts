import { api, setAuthToken, removeAuthToken } from "./api";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    auth_token: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
}

export const authService = {
    // Login user
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/token/login/", credentials);
        setAuthToken(response.data.auth_token);
        return response.data;
    },

    // Register new user
    register: async (data: RegisterData): Promise<void> => {
        await api.post("/auth/users/", data);
    },

    // Logout user
    logout: async (): Promise<void> => {
        try {
            await api.post("/auth/token/logout/");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            removeAuthToken();
        }
    },

    // Get current user
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>("/auth/users/me/");
        return response.data;
    },
};
