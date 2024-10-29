import { NgModule } from "@angular/core";
import { ArtistsTrackNamesPipe } from "./artists-track-names.pipe";
import { DurationTimePipe } from "./duration-time.pipe";

@NgModule({
  declarations: [
    ArtistsTrackNamesPipe,
    DurationTimePipe
  ],
   exports: [
    ArtistsTrackNamesPipe,
    DurationTimePipe
   ]
})
export class PipesModule { }
