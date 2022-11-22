import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setContainerTypeAction } from 'src/app/ngrx/actions/global.actions';
import { AppState } from 'src/app/ngrx/app.state';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(setContainerTypeAction({ containerType: 'normal' }));
  }

}
