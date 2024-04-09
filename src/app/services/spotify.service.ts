import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { UserInformation } from '../models/spotify/user-information.interface';
import { User } from '../models/user.interface';
import { ArtistsResponse } from '../models/spotify/artists-response.interface';
import { PlaylistsResponse } from '../models/spotify/playlists-response.interface';
import { ItemsResponse } from '../models/spotify/items-response.interface';
import { ArtistInformation } from '../models/spotify/artist-information.interface';
import { Artist } from '../models/artist.interface';
import { Track } from '../models/track.interface';
import { TrackInformation } from '../models/spotify/track-information.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  private readonly SPOTIFY_API = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) { }

  getUserInformation(): Observable<UserInformation> {
    return this.http.get<UserInformation>(`${this.SPOTIFY_API}/me`);
  }

  getUserPlaylists(): Observable<PlaylistsResponse> {
    return this.http.get<PlaylistsResponse>(`${this.SPOTIFY_API}/me/playlists`);
  }

  getUserArtistsFollowing(): Observable<ArtistsResponse> {
    return this.http.get<ArtistsResponse>(`${this.SPOTIFY_API}/me/following?type=artist`);
  }

  getUser(): Observable<User> {
    const userInformation = this.getUserInformation();
    const playlists = this.getUserPlaylists();
    const artistsFollowing = this.getUserArtistsFollowing();

    return forkJoin({userInformation, playlists, artistsFollowing}).pipe(
      map((result) => {
        const { userInformation, playlists, artistsFollowing } = result;
        return {  
          followers: userInformation.followers.total, 
          following: artistsFollowing.artists.total,
          name: userInformation.display_name,
          playlists: playlists.total,
          profileLink: userInformation.uri,
          image: userInformation.images[0].url
        } as User;
      })
    )
  }

  getTopArtists(limit: number = 8): Observable<Artist[]> {
    return this.http.get<ItemsResponse<ArtistInformation>>(`${this.SPOTIFY_API}/me/top/artists?limit=${limit}`).pipe(
      map((result) => {
        let topArtists: Artist[] = [];

        for (const item of result.items) {
          topArtists.push({
            name: item.name,
            image: item.images[0]?.url
          } as Artist); 
        }
        return topArtists;
      })
    );
  }

  getTopTracks(limit: number = 8): Observable<Track[]> {
    return this.http.get<ItemsResponse<TrackInformation>>(`${this.SPOTIFY_API}/me/top/tracks?limit=${limit}`).pipe(
      map((result) => {
        let topTracks: Track[] = [];
        
        for (const item of result.items) {
          const { album } = item;

          topTracks.push({
            name: item.name,
            image: album.images[0]?.url,
            artists: item.artists.map(artist => {
              return {
                name: artist.name
              }
            })
          } as Track); 
        }
        return topTracks;
      })
    );
  }
}