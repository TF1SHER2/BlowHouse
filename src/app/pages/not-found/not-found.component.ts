import { Component, OnInit } from '@angular/core';
import { AppState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { setContainerTypeAction } from 'src/app/ngrx/actions/global.actions';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(setContainerTypeAction({ containerType: 'normal' }));
  }

}
