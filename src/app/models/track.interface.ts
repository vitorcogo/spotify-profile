import { Artist } from "./artist.interface";

export interface Track {
  name: string;
  image: string;
  durationMs: number;
  artists: Artist[];
  albumName: string;
}
