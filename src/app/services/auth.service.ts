
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SPOTIFY_CLIENT_ID } from '../constants/credentials.const';
import { AuthHelper } from '../helpers/auth.helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenData } from '../models/spotify/token-data.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private readonly SPOTIFY_API = 'https://accounts.spotify.com/api'
  private readonly HEADERS_OPTIONS = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

  constructor(private httpClient: HttpClient) { }

  async authenticateCodeWithPKCE() {
    const codeVerifier = AuthHelper.generateCodeVerifier(64);
    const codeChallenge = await AuthHelper.generateCodeChallenge(codeVerifier);

    this.redirectSpotifyAuth(codeChallenge);
  }
  
  redirectSpotifyAuth(codeChallenge: string) {
    const url = new URL('https://accounts.spotify.com/authorize');
    const params = AuthHelper.transformAuthParams(codeChallenge);
    
    url.search = new URLSearchParams(params).toString();
    window.open(url.toString(), '_self');
  }

  requestSpotifyAccessToken(spotifyCode: string): Observable<TokenData> {
    const codeVerifier = AuthHelper.getCodeVerifier();
    const body = new URLSearchParams({
      code: spotifyCode,
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: 'authorization_code',
      redirect_uri: environment.spotifyAuthRedirectUri,
      code_verifier: codeVerifier
    });

    return this.httpClient.post<TokenData>(`${this.SPOTIFY_API}/token`, body, this.HEADERS_OPTIONS);
  }

  refreshToken(): Observable<TokenData> {
    const refreshToken = AuthHelper.getRefreshToken();
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: SPOTIFY_CLIENT_ID
    });

    return this.httpClient.post<TokenData>(`${this.SPOTIFY_API}/token`, body, this.HEADERS_OPTIONS);
  }
}