import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "../shared/profile/profile.component";
import { RecentComponent } from "../shared/recent/recent.component";
import { PlaylistsComponent } from "../shared/playlists/playlists.component";
import { ArtistsComponent } from "../shared/artists/artists.component";
import { TracksComponent } from "../shared/tracks/tracks.component";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'profile',
    redirectTo: ''
  },
  {
    path: 'recent',
    component: RecentComponent
  },
  {
    path: 'playlists',
    component: PlaylistsComponent
  },
  {
    path: 'tracks',
    component: TracksComponent
  },
  {
    path: 'artists',
    component: ArtistsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }