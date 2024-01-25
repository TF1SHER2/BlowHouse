import { setContainerTypeAction } from '../../ngrx/actions/global.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../ngrx/app.state';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
    public config: NgbCarouselConfig
  ) {
    config.interval = 5000; //5 seconds
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
    config.showNavigationArrows = false;
  }

  ngOnInit(): void {
    this.store.dispatch(setContainerTypeAction({ containerType: 'normal' }));

    this.subs.push(this.authService.getUserPermissions().subscribe((permissions) => {
      // console.log(permissions);
    }));
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

}
