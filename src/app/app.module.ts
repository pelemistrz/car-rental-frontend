import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
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


import { ReservationHistoryComponent } from './components/reservation-history/reservation-history.component';

import { KeycloakService } from './services/keycloak/keycloak.service';
import { ManagerComponent } from './components/manager/manager.component';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';


const routes: Routes = [
  {
    path: 'rent-history',
    component: ReservationHistoryComponent,   
  },
  { path: 'rent/:id', component: RentCarComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'search/:model', component: CarListComponent },
  { path: 'car-type/:id/:name', component: CarListComponent },
  { path: 'car-type', component: CarListComponent },
  { path: 'cars', component: CarListComponent },
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: '**', redirectTo: '/cars', pathMatch: 'full' },
];

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarCategoryMenuComponent,
    SearchComponent,
    LoginStatusComponent,
    CarDetailsComponent,
    RentCarComponent,      
    ReservationHistoryComponent,
    ManagerComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,

  ],
  providers: [  
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true,
    },

    provideClientHydration(withEventReplay()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
