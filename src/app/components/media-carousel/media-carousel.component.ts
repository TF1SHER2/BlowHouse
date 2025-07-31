import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUrl } from 'src/app/ngrx/app.state';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-media-carousel',
  templateUrl: './media-carousel.component.html',
  styleUrls: ['./media-carousel.component.scss']
})
export class MediaCarouselComponent implements OnInit, OnDestroy {

  currentUrl: string = '';

  constructor(private store: Store<AppState>,
    public config: NgbCarouselConfig
    ) {
        config.interval = 8000; // 8 seconds - faster transitions
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
        config.showNavigationIndicators = true;
        config.showNavigationArrows = true;
   }

  ngOnInit(): void {
    this.store.select(selectUrl).subscribe((url: string) => {
      this.currentUrl = url;
    });

  }

  ngOnDestroy(): void {
 
  }

}



