import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { Track } from 'src/app/models/track.interface';
import { SpotifyApiService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {

  tracks: Track[] = [];
  trackListTitle: string = 'Mais ouvidas';

  isLoading: boolean = false;

  constructor(private spotifyApi: SpotifyApiService) { }

  ngOnInit(): void {
    this.getRecentTracks();
  }

  private getRecentTracks(): void {
    this.isLoading = true;
    this.spotifyApi.getTopTracks(50)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (tracks) => {
          this.tracks = tracks;
        }
      });
  }
}
