import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  _profile: UserProfile | undefined;
  isAuthenticated: boolean = false;

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
    this.isAuthenticated = await this.keycloak?.init({
      onLoad: 'check-sso',
    });

    if (this.isAuthenticated) {
      this._profile = (await this.keycloak?.loadUserInfo()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }
  }

  login() {
    return this.keycloak?.login();
  }

  accountManagment() {
    return this.keycloak?.accountManagement();
  }

  logout() {
    return this.keycloak?.logout({
      redirectUri: 'https://localhost:4200',
    });
  }
}
