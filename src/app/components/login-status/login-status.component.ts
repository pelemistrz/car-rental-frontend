import { Component, Inject, OnInit } from '@angular/core';

import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-login-status',
  standalone: false,

  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string = '';
  storage: Storage = sessionStorage;

  constructor(
   private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {

      // await this.getUserDetails();
    }
  

  // async getUserDetails() {
  //   if (this.isAuthenticated) {
   
      
  //     this.keycloakService.getUserDetails().then((res) => {
  //       this.userFullName = res.firstName as string;
  //       const theEmail = res.email as string;
  //       this.storage.setItem('userEmail', JSON.stringify(theEmail));
  //     });
  //   }
  // }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    this.keycloakService.logout();
  }
}
