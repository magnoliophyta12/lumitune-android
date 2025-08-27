import { Album } from "./Album";
import { Artist } from "./Artist";
import {Image} from "./Image"

export interface Track {
  id: string;
  name: string;
  duration: number;
  artistId: string;
  albumId: string;
  segNumber: number;
  playsNumber: number;
  url: string;
  explicit: false;
  genres: string[];
  moods: string[];
  artist:Artist;
  cover:Image;
  album:Album;
}