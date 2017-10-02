import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
// import Auth0LockStatic from 'auth0-lock';
import Auth0Lock from 'auth0-lock';

// let Auth0Lock = require('auth0-lock').default;

export const AUTH0_CONGFIG: InjectionToken<any> = new InjectionToken('auth0-config');

@Injectable()
export class AuthService {
    lock = new Auth0Lock(this.authConfig.AUTH0_CLIENT_ID, this.authConfig.AUTH0_DOMAIN);

    constructor(private router: Router,
                @Inject(AUTH0_CONGFIG) private authConfig) {
        this.lock.on('authenticated', (authResult: any) => {
            localStorage.setItem('id_token', authResult.idToken);
            this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
                if (error) {
                    console.log(error);
                }

                localStorage.setItem('profile', JSON.stringify(profile));
            });

            this.lock.hide();
        });
    }

    login() {
        this.lock.show();
    }


    logOut() {
        // To log out, just remove the token and profile
        // from local storage
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }
    loggedIn() {
        return tokenNotExpired();
    }
}
