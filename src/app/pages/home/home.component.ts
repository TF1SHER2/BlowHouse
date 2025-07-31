import { setContainerTypeAction } from '../../ngrx/actions/global.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../ngrx/app.state';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  showMobileMenu: boolean = false;

  constructor(
    private store: Store<AppState>,
    public authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(setContainerTypeAction({ containerType: 'normal' }));

    // Defer non-critical auth check
    setTimeout(() => {
      this.subs.push(this.authService.getUserPermissions().subscribe((permissions) => {
        // console.log(permissions);
      }));
    }, 2000);
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

}
