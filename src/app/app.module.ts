import { AuthModule } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROOT_REDUCER } from './ngrx/app.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { HeaderComponent } from './components/header/header.component';
import {FooterComponent } from './components/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MediaComponent } from './pages/media/media.component';
import { ContactComponent } from './pages/contact/contact.component';
import { StoreComponent } from './pages/store/store.component';
import { EPKComponent } from './pages/epk/epk.component';
import { _globals } from './models/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    HeaderComponent,
    FooterComponent,
    MediaComponent,
    ContactComponent,
    StoreComponent,
    EPKComponent,
    NotFoundComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCER,
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false
        }
      }
    ),
    StoreDevtoolsModule.instrument({
      name: 'Blow House',
      maxAge: 25,
      logOnly: false
    }),
    StoreRouterConnectingModule.forRoot(),
    AuthModule.forRoot({
      domain: _globals.domain,
      clientId: _globals.clientId,
      audience: _globals.audience,
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
