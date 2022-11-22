import { setContainerTypeAction } from '../../ngrx/actions/global.actions';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../ngrx/app.state';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  showMobileMenu: boolean = false;

  constructor(private store: Store<AppState>,
              public authService: AuthenticationService,
              @Inject(DOCUMENT) public document: Document) { }

  ngOnInit(): void {
    this.store.dispatch(setContainerTypeAction({ containerType: 'fluid' }));
    if (this.authService.isAuthenticated()) {
      this.subs.push(this.authService.getUserPermissions().subscribe((permissions) => {
        console.log(permissions);
      }));
    }
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

}
