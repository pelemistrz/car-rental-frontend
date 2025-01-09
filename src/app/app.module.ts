import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { CarListComponent } from './components/car-list/car-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CarListComponent
  
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
