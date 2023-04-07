import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Video } from 'src/app/models/youtube.models';
import { setContainerTypeAction } from 'src/app/ngrx/actions/global.actions';
import { AppState } from 'src/app/ngrx/app.state';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  videos: Video[] = [];
  videoUrls: SafeResourceUrl[] = [];

  constructor(private store: Store<AppState>,
              private youtubeService: YoutubeService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.store.dispatch(setContainerTypeAction({ containerType: 'normal' }));

    this.youtubeService.getPlayList('PLjv-8DmGH7xepShhoDKfMS9fibDL0nrNQ', '5').subscribe((results) => {
      this.videos = results.videos;

      for (let video of results.videos) {
        this.videoUrls.push(this.getSafeUrl('https://www.youtube.com/embed/' + video.id));
      }
    });
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
