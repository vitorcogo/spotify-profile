import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RedirectUrlParams } from 'src/app/models/spotify/redirect-url-params.interface';
import { AuthHelper } from 'src/app/helpers/auth.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const { code } = params as RedirectUrlParams;
      if (code) {
        this.authService.requestSpotifyAccessToken(code).subscribe(response => {
          AuthHelper.setTokenLocalStorageAndRemoveCodeVerifier(response);
          this.router.navigate(['home']);
        });
      }
    })
  }

  loginSpotify() {
    this.authService.authenticateCodeWithPKCE();
  }
}
