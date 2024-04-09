import { NgModule } from "@angular/core";
import { ArtistsTrackNamesPipe } from "./artists-track-names.pipe";

@NgModule({
  declarations: [
    ArtistsTrackNamesPipe
  ],
   exports: [
    ArtistsTrackNamesPipe
   ]
})
export class PipesModule { }
