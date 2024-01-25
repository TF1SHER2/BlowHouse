import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { EventsComponent } from './pages/events/events.component';
import { HomeComponent } from './pages/home/home.component';
import { MediaComponent } from './pages/media/media.component';
import { StoreComponent } from './pages/store/store.component';
import { EPKComponent } from './pages/epk/epk.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'events',
  //   component: EventsComponent
  // },
  {
    path: 'media',
    component: MediaComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'store',
    component: StoreComponent
  },
  {
    path: 'press-kit',
    component: EPKComponent
  },
  // Angular routing modules will match routes with first-match logic
  // based off their order in this array. Keep this at the end of the
  // list so any path still not matched to the request will redirect
  // to not-found;
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
