import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'car-rental',
        clientId: 'cr',
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  constructor() {}

  async init() {
    console.log('authenticate the user...');

    const authonticated = await this.keycloak?.init({
      onLoad: 'login-required',
    });
    if (authonticated) {
      this._profile = (await this.keycloak?.loadUserInfo()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }
  }

  login() {
    return this.keycloak?.login();
  }
  logout() {
    return this.keycloak?.logout({
      redirectUri: 'https:localhost:4200',
    });
  }
}
