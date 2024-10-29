import { AlbumInformation } from "./album-information.interface";
import { ArtistInformation } from "./artist-information.interface";

export interface TrackInformation {
  name: string;
  uri: string;
  album: AlbumInformation;
  artists: ArtistInformation[];
  duration_ms: number;
}
