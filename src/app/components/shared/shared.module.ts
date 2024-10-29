import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { RouterModule } from "@angular/router";
import { RecentComponent } from './recent/recent.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ArtistsComponent } from './artists/artists.component';
import { TracksComponent } from './tracks/tracks.component';
import { PipesModule } from "src/app/pipes/pipes.module";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { TrackListComponent } from "./track-list/track-list.component";

@NgModule({
  declarations: [
    NavbarComponent,
    ProfileComponent,
    RecentComponent,
    PlaylistsComponent,
    ArtistsComponent,
    TracksComponent,
    TrackListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: "rgba(0,0,0,0.0)",
      backdropBorderRadius: "4px",
      primaryColour: "#ffffff",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
      fullScreenBackdrop: false
    })
  ],
  exports: [
    NavbarComponent,
    ProfileComponent,
    RecentComponent
  ]
})
export class SharedModule { }
