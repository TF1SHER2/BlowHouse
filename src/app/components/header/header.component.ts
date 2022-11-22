import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, selectUrl } from 'src/app/ngrx/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  isHome: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subs.push(this.store.select(selectUrl).subscribe((url: string) => {
      if (url === '/') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
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
