import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsComponent } from './main/products/products.component';
import { PeopleComponent } from './main/people/people.component';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsComponent } from './main/maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { NewPersonComponent } from './main/people/new-person/new-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductsComponent,
    PeopleComponent,
    MapsComponent,
    NewPersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MainModule,
    AuthModule.forRoot(),
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
