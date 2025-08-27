import { Track } from "./Track";
import { Image } from "./Image";

export interface Album {
  id: string;
  name: string;
  artistId: string;
  cover: Image;
  tracksQnt: number;
  tracks: Track[];
  relDate: string;
}
