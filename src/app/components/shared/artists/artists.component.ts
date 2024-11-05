import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Artist } from 'src/app/models/artist.interface';
import { SpotifyApiService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  artists: Artist[] = [];
  title: string = 'Artistas mais ouvidos';

  isLoading: boolean = false;

  constructor(private spotifyApi: SpotifyApiService) { }

  ngOnInit(): void {
    this.getTopArtists();
  }

  private getTopArtists(): void {
    this.isLoading = true;
    const limit = 50;
    this.spotifyApi.getTopArtists(limit)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (artists) => {
          this.artists = artists;
        }
      });
  }
}
