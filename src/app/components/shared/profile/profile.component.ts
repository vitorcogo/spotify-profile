import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(
    private router: Router,
    private spotifyApi: SpotifyApiService
    ) { }

  ngOnInit(): void {
    this.getUser();
    this.getTopArtists();
    this.getTopTracks();
  }

  logout(): void {
    AuthHelper.clearTokenLocalStorage();
    this.router.navigate(['login']);
  }

  private getUser(): void {
    this.spotifyApi.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  private getTopArtists(): void {
    this.spotifyApi.getTopArtists().subscribe((data) => {
      this.topArtists = data;
    });
  }

  private getTopTracks(): void {
    this.spotifyApi.getTopTracks().subscribe((data) => {
      this.topTracks = data;
    });
  }

  get userImageUrl(): string | undefined {
    return this.user.image;
  }
}
