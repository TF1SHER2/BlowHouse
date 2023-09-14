import { setScreenWidthAction } from './ngrx/actions/global.actions';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppBreakpoints, AppState, selectContainerType, selectScreenWidth } from './ngrx/app.state';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ScreenWidth } from './models/screenWidth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {

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

    let breakpoints = [
      AppBreakpoints.xxl,
      AppBreakpoints.xl,
      AppBreakpoints.lg,
      AppBreakpoints.md,
      AppBreakpoints.sm,
      AppBreakpoints.xs
    ];

    // this updates both this.screenWidth for app.component locally,
    // and the global screenWidth attribute for other components
    this.subs.push(this.breakpointObserver.observe(
      breakpoints.map(m => this.generateBreakpointString(m)))
      .subscribe((state: BreakpointState) => {
        this.store.dispatch(
          setScreenWidthAction({
            screenWidth: (breakpoints.find(m =>
              state.breakpoints[this.generateBreakpointString(m)])  ?? 'xs').toString() as ScreenWidth
            })
        );
      }));

    // example of how to subscribe to global screen width in other components
    this.subs.push(this.store.select(selectScreenWidth)
      .subscribe((screenWidth: ScreenWidth | undefined) => {
        this.screenWidth = screenWidth;
      })
    );
  }

  private generateBreakpointString(breakpoint: AppBreakpoints): string {
    return `(min-width: ${breakpoint}px`;
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
