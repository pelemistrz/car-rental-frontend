import { Component, Inject, OnInit } from '@angular/core';

import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { UserProfile } from '../../services/keycloak/user-profile';

@Component({
  selector: 'app-login-status',
  standalone: false,

  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';


  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = this.keycloakService.isAuthenticated;
    if (this.keycloakService.isAuthenticated) {
      this.userFullName = this.keycloakService._profile?.name!;
    }
  }

   login() {
     this.keycloakService.login();
    this.isAuthenticated = true;

    this.userFullName = this.keycloakService._profile?.name!;
  }

   logout() {
    this.keycloakService.logout();
    this.isAuthenticated = false;
    this.userFullName = '';
  }
  accountManagment() {
    this.keycloakService.accountManagment();
    }
}
