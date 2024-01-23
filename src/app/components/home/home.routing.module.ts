import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "../shared/profile/profile.component";
import { RecentComponent } from "../shared/recent/recent.component";
import { PlaylistsComponent } from "../shared/playlists/playlists.component";
import { MusicsComponent } from "../shared/musics/musics.component";
import { ArtistsComponent } from "../shared/artists/artists.component";

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
    path: 'musics',
    component: MusicsComponent
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