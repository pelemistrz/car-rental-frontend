import { Injector, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CarListComponent } from './components/car-list/car-list.component';

import { CarCategoryMenuComponent } from './components/car-category-menu/car-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { Router, RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { LoginComponent } from './components/login/login.component';
// okta
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
  OktaAuthGuard,
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { ReservationHistoryComponent } from './components/reservation-history/reservation-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AddCarComponent } from './components/add-car/add-car.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: 'rent-history',
    component: ReservationHistoryComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },
  {
    path: 'members',
    component: MembersPageComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'rent/:id', component: RentCarComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'search/:model', component: CarListComponent },
  { path: 'car-type/:id/:name', component: CarListComponent },
  { path: 'car-type', component: CarListComponent },
  { path: 'cars', component: CarListComponent },
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: '**', redirectTo: '/cars', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarCategoryMenuComponent,
    SearchComponent,
    LoginStatusComponent,
    CarDetailsComponent,
    RentCarComponent,
    LoginComponent,
    MembersPageComponent,
    ReservationHistoryComponent,
    AddCarComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    OktaAuthModule,
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },

    provideClientHydration(withEventReplay()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
