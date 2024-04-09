import { Artist } from "./artist.interface";

export interface Track {
  name: string;
  image: string;
  artists: Artist[];
}
