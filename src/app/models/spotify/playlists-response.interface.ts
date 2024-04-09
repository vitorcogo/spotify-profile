import { ItemsResponse } from "./items-response.interface";
import { PlaylistInformation } from "./playlist-information.interface";

export interface PlaylistsResponse extends ItemsResponse<PlaylistInformation> { }
