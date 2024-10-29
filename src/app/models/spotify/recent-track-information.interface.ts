import { TrackInformation } from "./track-information.interface";

export interface RecentTrackInformation {
  played_at: Date;
  track: TrackInformation;
}
