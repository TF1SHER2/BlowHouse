import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, selectContainerType } from './models/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {

  title = 'BlowHouse';
  subs: Subscription[] = [];
  containerType: 'normal' | 'fluid' = 'normal';

  constructor(private store: Store<AppState>,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subs.push(this.store.select(selectContainerType)
      .subscribe((containerType: 'normal' | 'fluid' | undefined) => {
        if (containerType) {
          this.containerType = containerType;
          this.cd.detectChanges();
        }
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
