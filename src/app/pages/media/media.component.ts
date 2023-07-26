import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { PageDirection, PlayList, Video } from 'src/app/models/youtube.models';
import { setContainerTypeAction } from 'src/app/ngrx/actions/global.actions';
import { AppState } from 'src/app/ngrx/app.state';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {

  subs = new Array<Subscription>();
  videos: Video[] = [];
  videoUrls: SafeResourceUrl[] = [];
  playList: PlayList | undefined = undefined;
  activeVideo: { title?: string, description?: string, url?: SafeResourceUrl } = {};
  activeVideoIndex = 0;
  pageSize: string = '4';
  showLoadMore = true;
  descriptionTextFilters = [
    'Facebook',
    'https://www.facebook.com/BlowHouseBrassBand',
    'Twitter',
    'https://www.twitter.com/BlowHouseBrass',
    'Instagram',
    'https://www.instagram.com/blow_house',
    '►',
  ];

  constructor(private store: Store<AppState>,
              private youtubeService: YoutubeService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.store.dispatch(setContainerTypeAction({ containerType: 'normal' }));

    this.subs.push(this.youtubeService.getPlayList('PLjv-8DmGH7xepShhoDKfMS9fibDL0nrNQ', this.pageSize).subscribe((playList: PlayList) => {
      this.addVideosFromPlayList(playList, 'init');
    }));
  }

  onLoadMore() {
    if (this.playList) {
      this.subs.push(this.youtubeService.movePage(this.playList, PageDirection.NEXT, this.pageSize).subscribe((playList: PlayList) => {
        this.addVideosFromPlayList(playList, 'concat');
      }));
    }
  }

  calculateVideoDescription(description: string): string {
    for (let filter of this.descriptionTextFilters) {
      do {
        description = description.replace(filter, '');
      } while (description.includes(filter));
    }
    description = description.trim();
    return description;
  }

  addVideosFromPlayList(playList: PlayList, action: 'init' | 'concat') {
    if (action === 'init') {
      this.videos = [];
      this.videos = playList.videos;
    } else {
      this.videos = this.videos.concat(playList.videos);
    }
    if (this.videos.length >= playList.total) {
      this.showLoadMore = false;
    }

    this.videoUrls = [];
    for (let video of this.videos) {
      this.videoUrls.push(this.getSafeUrl('https://www.youtube.com/embed/' + video.id));
    }
    this.activeVideo = {
      title: this.videos[this.activeVideoIndex].title,
      description: this.videos[this.activeVideoIndex].description,
      url: this.videoUrls[this.activeVideoIndex],
    }
    this.playList = playList;
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onThumbClick(i: number) {
    this.activeVideoIndex = i;
    this.activeVideo = {
      title: this.videos[i].title,
      description: this.videos[i].description,
      url: this.videoUrls[i],
    };
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo(0,0);
}

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }

}
