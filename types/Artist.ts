import { Album } from "./Album";
import { Image } from "./Image";
import { User } from "./User";

export interface Artist {
  id: string;
  user: User;
  bio: string;
  bioPics: Image[];
  monthlyListeners: number;
  albums: Album[];
}