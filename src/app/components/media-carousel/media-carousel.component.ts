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

    images: string[] = [
    'assets/press-photos/Trombones.JPG',
    'assets//ballroom.JPG',
    'assets/MerryWidow.jpg',
    'assets/destroyer.jpg',
    'assets/FNL.jpg'
  ];

  currentImage: string = '';
  previousIndex: number = -1;
  intervalId: any = null;
  isPaused: boolean = false;
  resumeTimeoutId: any = null;
  fadeOverlay: boolean = false;

  constructor(private store: Store<AppState>,
    public config: NgbCarouselConfig
    ) {
        config.interval = 80000; //60 seconds
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
        config.showNavigationIndicators = false;
        config.showNavigationArrows = false;
   }

  ngOnInit(): void {
    this.store.select(selectUrl).subscribe((url: string) => {
      this.currentUrl = url;
    });

    this.showRandomImage();
    this.startAutoCycle();

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    clearTimeout(this.resumeTimeoutId);
  }

  startAutoCycle(): void {
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.showRandomImageWithFade();
      }
    }, 15000);
  }

  pauseAutoCycle(): void {
    this.isPaused = true;
    clearTimeout(this.resumeTimeoutId);
  }

  resumeAutoCycle(delay: number = 5000): void {
    clearTimeout(this.resumeTimeoutId);
    this.resumeTimeoutId = setTimeout(() => {
      this.isPaused = false;
    }, delay);
  }

  private changeImage(index: number): void {
    this.currentImage = this.images[index];
    this.previousIndex = index;
  }

  showRandomImageWithFade(): void {
    this.triggerFade(() => {
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * this.images.length);
      } while (newIndex === this.previousIndex && this.images.length > 1);
      this.changeImage(newIndex);
    });
  }

  showNextImage(): void {
    this.pauseAutoCycle();
    this.triggerFade(() => {
      const currentIndex = this.images.indexOf(this.currentImage);
      const nextIndex = (currentIndex + 1) % this.images.length;
      this.changeImage(nextIndex);
    });
    this.resumeAutoCycle();
  }

  showPreviousImage(): void {
    this.pauseAutoCycle();
    this.triggerFade(() => {
      const currentIndex = this.images.indexOf(this.currentImage);
      const prevIndex = (currentIndex - 1 + this.images.length) % this.images.length;
      this.changeImage(prevIndex);
    });
    this.resumeAutoCycle();
  }

  showRandomImage(): void {
    this.pauseAutoCycle();
    this.showRandomImageWithFade();
    this.resumeAutoCycle();
  }

  triggerFade(callback: () => void): void {
    this.fadeOverlay = true;
    setTimeout(() => {
      callback();
      this.fadeOverlay = false;
    }, 400); // fade out duration matches CSS
  }

  onMouseEnter(): void {
    this.pauseAutoCycle();
  }

  onMouseLeave(): void {
    this.resumeAutoCycle();
  }

}



