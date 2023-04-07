import { setScreenWidthAction } from './ngrx/actions/global.actions';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppBreakpoints, AppState, selectContainerType, selectScreenWidth } from './ngrx/app.state';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {

  title = 'BlowHouse';
  subs: Subscription[] = [];
  containerType: 'normal' | 'fluid' = 'normal';
  screenWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;

  constructor(private store: Store<AppState>,
              private cd: ChangeDetectorRef,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.subs.push(this.store.select(selectContainerType)
      .subscribe((containerType: 'normal' | 'fluid' | undefined) => {
        if (containerType) {
          this.containerType = containerType;
          this.cd.detectChanges();
        }
      })
    );

    // this updates both this.screenWidth for app.component locally,
    // and the global screenWidth attribute for other components
    this.subs.push(this.breakpointObserver.observe([
      `(min-width: ${AppBreakpoints.xl}px)`,
      `(min-width: ${AppBreakpoints.lg}px)`,
      `(min-width: ${AppBreakpoints.md}px)`,
      `(min-width: ${AppBreakpoints.sm}px)`])
      .subscribe((state: BreakpointState) => {
        if(state.breakpoints[`(min-width: ${AppBreakpoints.xl}px)`]) {
          this.screenWidth = 'xl';
        } else if (state.breakpoints[`(min-width: ${AppBreakpoints.lg}px)`]) {
          this.screenWidth = 'lg';
        } else if (state.breakpoints[`(min-width: ${AppBreakpoints.md}px)`]) {
          this.screenWidth = 'md';
        } else if (state.breakpoints[`(min-width: ${AppBreakpoints.sm}px)`]) {
          this.screenWidth = 'sm';
        } else {
          this.screenWidth = 'xs';
        }
        this.store.dispatch(setScreenWidthAction({ screenWidth: this.screenWidth }));
      })
    );

    // example of how to subscribe to global screen width in other components
    this.subs.push(this.store.select(selectScreenWidth)
      .subscribe((screenWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined) => {
        console.log(screenWidth);
      })
    );
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
