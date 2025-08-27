import axiosInstance from "./axiosInstance";
import { Image } from "../types/Image";

export const uploadImage = async (file: FormData): Promise<Image | null> => {
    try {
      const response = await axiosInstance.post("/images/upload", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;    
    }
  }

