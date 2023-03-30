import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUrl } from 'src/app/ngrx/app.state';

@Component({
  selector: 'app-header-text',
  templateUrl: './header-text.component.html',
  styleUrls: ['./header-text.component.scss']
})
export class HeaderTextComponent implements OnInit {

  currentUrl: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectUrl).subscribe((url: string) => {
      this.currentUrl = url;
    });
  }

}
