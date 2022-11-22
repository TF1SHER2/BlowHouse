import { AuthModule } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROOT_REDUCER } from './ngrx/app.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MediaComponent } from './pages/media/media.component';
import { ContactComponent } from './pages/contact/contact.component';
import { StoreComponent } from './pages/store/store.component';
import { _globals } from './models/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    HeaderComponent,
    MediaComponent,
    ContactComponent,
    StoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
