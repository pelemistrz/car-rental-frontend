import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { CarListComponent } from './components/car-list/car-list.component';

import { CarCategoryMenuComponent } from './components/car-category-menu/car-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { RentalStatusComponent } from './components/rental-status/rental-status.component';


@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarCategoryMenuComponent,
    SearchComponent,
    LoginStatusComponent,
    RentalStatusComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
