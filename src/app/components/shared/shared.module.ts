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

@NgModule({
  declarations: [
    NavbarComponent,
    ProfileComponent,
    RecentComponent,
    PlaylistsComponent,
    ArtistsComponent,
    TracksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    NavbarComponent,
    ProfileComponent,
    RecentComponent
  ]
})
export class SharedModule { }
