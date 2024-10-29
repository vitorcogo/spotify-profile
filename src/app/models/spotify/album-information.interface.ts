import { Image } from "./image.interface";

export interface AlbumInformation {
  name: string;
  images: Image[];
  total_tracks: number;
  release_date: string;
  uri: string;
}
