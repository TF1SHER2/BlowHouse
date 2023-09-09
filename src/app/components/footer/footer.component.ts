import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUrl } from 'src/app/ngrx/app.state';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  currentUrl: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectUrl).subscribe((url: string) => {
      this.currentUrl = url;
    });

  }

  ngOnDestroy(): void {
 
  }

}



