import { CarouselItem } from "@/types/CarouselItem";
import axiosInstance from "./axiosInstance";
import { Track } from "@/types/Track";
import { Album } from "@/types/Album";
import { Playlist } from "@/types/Playlist";
import { Artist } from "@/types/Artist";
import {Image} from "../types/Image";

export const getContentHome = async (): Promise<HomeContentResponse | null> => {
  try {
    const response = await axiosInstance.get("/content/main");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;    
  }
};

  export interface HomeContentResponse {
    carousel: CarouselItem[];
    recommendations: Track[];
    newReleases: Album[];
  }
  
  export const getTrackById = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/tracks/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;    
    }
  };
  
  export const trackSearch = async (name: string) => {
    try {
      const response = await axiosInstance.get(`/tracks/search?name=${name}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;    
    }
  }
  
  export const getAlbumById = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;    
    }
  };
  
  export const getPlaylistsByUserId = async (id: string): Promise<Playlist[] | null> => {
    try {
      const response = await axiosInstance.get(`/playlists/user/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;    
    }
  };
  
  export const getPlaylistById = async (id: string): Promise<Playlist | null> => {
    try {
      const response = await axiosInstance.get(`/playlists/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;    
    }
  };
  
  export const getPlaylistFavorites = async (): Promise<Playlist | null> => {
    try {
      const response = await axiosInstance.get(`/playlists/favourites`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;    
    }
  }
  
  export const createPlaylist = async(name: string) => {
    try {
      const response = await axiosInstance.post("/playlists/", name);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;    
    }
  }
  
  export const addTrackToPlaylist = async(songId: string, playlistId: string) => {
    try {
      const response = await axiosInstance.post("/playlists/add-song", { playlistId, songId });
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return null;    
    }
  }
  
  export const removeTrackFromPlaylist = async(songId: string, playlistId: string) => {
    try {
      const response = await axiosInstance.post("/playlists/remove-song", { playlistId, songId });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;    
    }
  }
  
  export const updateTrackListeners = async(songId: string) => {
    const response = await axiosInstance.patch(`/tracks/add-listening/${songId}`);
    return response.data;
  }
  
  export const getArtistById = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/artists/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  
  export const editArtistById = async (id: string, data: Artist): Promise<Artist> => {
    try {
      const response = await axiosInstance.put(`/artists/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  
  export const updateArtistListeners = async(artistId: string) => {
    const response = await axiosInstance.patch(`/artists/add-listener/${artistId}`);
    return response.data;
  }

  export const getMoods = async() => {
    const response = await axiosInstance.get("/mood");
    return response.data;
  }
  
  export const getGenres = async() => {
    const response = await axiosInstance.get("/genre");
    return response.data;
  }
  
  export const getTracksByMood = async(mood: string) => {
    const response = await axiosInstance.get(`/tracks/mood/${mood}`);
    return response.data;
  }
  
  export const getTracksByGenre = async(genre: string) => {
    const response = await axiosInstance.get(`/tracks/genre/${genre}`);
    return response.data;
  }
  export interface AlbumPayload {
    name: string,
    type: string,
    label: string,
    duration: number,
    relDate: Date,
    cover: Image,
    artist: Artist,
    tracks: Track[],
  }
  

  export const getAlbums = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/albums?artistId=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;    
    }
  }
  


  export const createAlbum = async (data: AlbumPayload) => {
    try {
      const response = await axiosInstance.post("/albums", data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;    
    }
  }
  

  export const deleteAlbum = async(id: string) => {
    try {
      const response = await axiosInstance.delete(`/albums/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;    
    }
  }
  export const getArtistByUserId = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/artists/user/${id}`);
      return response.data;
    } catch (error) {
      console.error("Помилка при отриманні артиста:", error);
      throw error;
    }
  };

  export const setTrackMood = async(songId: string, mood: string) => {
    try {
      const response = await axiosInstance.patch("/tracks/set-mooods", {
        songId: songId,
        moods: [mood],
      });
      return response.data;
    } catch (error) {
      console.error("Помилка при встановленні настрою треку:", error);
      return null;    
    }
  }
  
  export const setTrackGenre = async(songId: string, genre: string) => {
    try {
      const response = await axiosInstance.patch("/tracks/set-genres", {
        songId: songId,
        genres: [genre],
      });
      return response.data;
    } catch (error) {
      console.error("Помилка при встановленні жанру треку:", error);
      return null;    
    }
  }
  export const createTrack = async(formData: FormData) => {
    try {
      const response = await axiosInstance.post("/tracks", formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;    
    }
  }