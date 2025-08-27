import { Track } from "./Track";
import { Image } from "./Image";
  
  export interface Playlist{
    id: string;
    name: string;
    userName: string;
    coverUrl: Image;
    tracks: Track[];
    private: boolean;
  }