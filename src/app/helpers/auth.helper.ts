import { environment } from "src/environments/environment";
import { SPOTIFY_CLIENT_ID } from "../constants/credentials.const";
import { TokenData } from "../models/spotify/token-data.interface";
import { AuthParams } from "../models/spotify/auth-params.interface";

export class AuthHelper {

  static isAuthenticated(): boolean {
    const token = localStorage.getItem('spotify_access_token');
    return token ? true : false;
  }

  static getCodeVerifier() {
    return localStorage.getItem('code_verifier') ?? '';
  }

  static getRefreshToken() {
    return localStorage.getItem('spotify_refresh_token') ?? '';
  }

  static setTokenDataLocalStorage(data: TokenData) {
    localStorage.setItem('spotify_access_token', data.access_token);
    localStorage.setItem('spotify_expires_in', data.expires_in.toString());
    localStorage.setItem('spotify_refresh_token', data.refresh_token);
  }
  
  static removeCodeVerifierLocalStorage() {
    localStorage.removeItem('code_verifier');
  }

  static clearTokenLocalStorage() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_expires_in');
    localStorage.removeItem('spotify_refresh_token');
  }

  static generateCodeVerifier(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));

    const codeVerifier = values.reduce((acc, x) => acc + possible[x % possible.length], "");

    localStorage.setItem('code_verifier', codeVerifier);
    return codeVerifier;
  }

  static async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const hashed = await this.getSHA256(codeVerifier);
    return this.getBase64encode(hashed);
  }

  static async getSHA256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  static getBase64encode(input: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  static transformAuthParams(codeChallenge: string) {
    const scope = 'user-read-private user-read-email';
    const authParams = {
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: environment.spotifyAuthRedirectUri
    } satisfies AuthParams;
    
    return authParams;
  }
}