import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { RouterModule } from "@angular/router";
import { RecentComponent } from './recent/recent.component';
import { MusicsComponent } from './musics/musics.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ArtistsComponent } from './artists/artists.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ProfileComponent,
    RecentComponent,
    MusicsComponent,
    PlaylistsComponent,
    ArtistsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ProfileComponent,
    RecentComponent
  ]
})
export class SharedModule { }
