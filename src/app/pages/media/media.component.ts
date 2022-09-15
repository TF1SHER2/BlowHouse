import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setContainerTypeAction } from 'src/app/actions/global.actions';
import { AppState } from 'src/app/models/app.state';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(setContainerTypeAction({ containerType: 'normal' }));
  }

}
