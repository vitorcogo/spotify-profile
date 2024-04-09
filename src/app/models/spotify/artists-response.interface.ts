import { ArtistInformation } from "./artist-information.interface";
import { ItemsResponse } from "./items-response.interface";

export interface ArtistsResponse {
  artists: ItemsResponse<ArtistInformation>
}
