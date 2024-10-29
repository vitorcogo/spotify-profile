import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { AuthHelper } from 'src/app/helpers/auth.helper';
import { Artist } from 'src/app/models/artist.interface';
import { PagesEnum } from 'src/app/models/pages.enum';
import { Track } from 'src/app/models/track.interface';
import { User } from 'src/app/models/user.interface';
import { SpotifyApiService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;
  topArtists!: Artist[];
  topTracks!: Track[];

  pagesEnum = PagesEnum;

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private spotifyApi: SpotifyApiService
    ) { }

  ngOnInit(): void {
    this.getComponentData();
  }

  logout(): void {
    AuthHelper.clearTokenLocalStorage();
    this.router.navigate(['login']);
  }

  private getComponentData(): void {
    const user = this.spotifyApi.getUser();
    const artists = this.spotifyApi.getTopArtists();
    const tracks = this.spotifyApi.getTopTracks();

    this.isLoading = true;
    forkJoin({user, artists, tracks})
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: (data) => {
          const { user, artists, tracks } = data;
  
          this.user = user;
          this.topArtists = artists;
          this.topTracks = tracks;
        }
      });
  }

  get userImageUrl(): string | undefined {
    return this.user.image;
  }
}
