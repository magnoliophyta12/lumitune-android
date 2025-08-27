import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";
import { User } from "@/types/User";

export interface RegistrationPayload {
  username: string;
  password: string;
  avatarId: string | null;
  role: "USER";
  accSubscribers: number;
  accFollowings: number;
  userData: {
    id: string;
    birthDate: string;
    regionId: string;
    isArtist: boolean;
    email: string;
  };
}
export interface LoginPayload {
  username: string;
  password: string;
}

export const registerUser = async (data: RegistrationPayload) => {
  const response = await axiosInstance.post("/auth/sign-up", data);
  return response.data;
};

export const currentUser = async () => {
  const response = await axiosInstance.get("/users/current");
  return response.data;
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage has been cleared!');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export const loginUser = async (data: LoginPayload) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const isUsernameUnique = async (username: string): Promise<boolean> => {
  const response = await axiosInstance.get(`/auth/isunique/${encodeURIComponent(username)}`);
  return response.data;
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/users/username/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`/users/current`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editUser = async (data: User): Promise<User> => {
  try {
    const response = await axiosInstance.put(`/users/edit`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};






