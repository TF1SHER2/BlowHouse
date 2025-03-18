import { setScreenWidthAction } from './ngrx/actions/global.actions';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppBreakpoints, AppState, selectContainerType, selectScreenWidth } from './ngrx/app.state';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ScreenWidth } from './models/screenWidth';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  title = 'BlowHouse';
  subs: Subscription[] = [];
  containerType: 'normal' | 'fluid' = 'normal';
  screenWidth: ScreenWidth | undefined;

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

    let breakpointsMap = new Map<AppBreakpoints, string>([
      [AppBreakpoints.xxl, "xxl"],
      [AppBreakpoints.xl, "xl"],
      [AppBreakpoints.lg, "lg"],
      [AppBreakpoints.md, "md"],
      [AppBreakpoints.sm, "sm"],
      [AppBreakpoints.xs, "xs"]
    ]);

    let breakpoints = Array.from(breakpointsMap.keys());

    // this updates both this.screenWidth for app.component locally,
    // and the global screenWidth attribute for other components
    this.subs.push(
      this.breakpointObserver.observe(
      breakpoints.map(m => this.generateBreakpointString(m)))
      .subscribe((state: BreakpointState) => {
        this.store.dispatch(
          setScreenWidthAction({
            screenWidth: breakpointsMap.get(breakpoints.find(m =>
              state.breakpoints[this.generateBreakpointString(m)]) ?? 0) as ScreenWidth
            })
        );
      })
    );

    // example of how to subscribe to global screen width in other components
    this.subs.push(this.store.select(selectScreenWidth)
      .subscribe((screenWidth: ScreenWidth | undefined) => {
        this.screenWidth = screenWidth;
      })
    );
  }

  ngAfterViewInit(): void {
    inject();
    injectSpeedInsights();
  }

  private generateBreakpointString(breakpoint: AppBreakpoints): string {
    return `(min-width: ${breakpoint}px)`;
  }

  isContainerNormal() {
    return this.containerType === 'normal';
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
