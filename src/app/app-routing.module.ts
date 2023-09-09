import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { EventsComponent } from './pages/events/events.component';
import { HomeComponent } from './pages/home/home.component';
import { MediaComponent } from './pages/media/media.component';
import { StoreComponent } from './pages/store/store.component';
import { EPKComponent } from './pages/epk/epk.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
