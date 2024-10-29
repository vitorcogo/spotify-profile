import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Track } from 'src/app/models/track.interface';
import { SpotifyApiService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

  tracks: Track[] = [];
  trackListTitle: string = 'Tocadas recentemente';

  isLoading: boolean = false;

  constructor(private spotifyApi: SpotifyApiService) { }

  ngOnInit(): void {
    this.getRecentTracks();
  }

  private getRecentTracks(): void {
    this.isLoading = true;
    this.spotifyApi.getRecentTracks()
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
