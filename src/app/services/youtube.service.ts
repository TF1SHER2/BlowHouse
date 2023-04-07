
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageDirection, PlayList, Video } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private YOUTUBE_TOKEN = 'AIzaSyCK-amES1535cPZM7E9X4yzkas3zcR4Y-4';

  constructor(public http: HttpClient) { }

  private getURL(id: string, pageSize?: string, pageToken?: string): string {
    return 'https://www.googleapis.com/youtube/v3/playlistItems?pageToken=' + (pageToken != null ? pageToken : '')
      + '&part=snippet%2CcontentDetails%2Cstatus&playlistId=' + id + '&key=' + this.YOUTUBE_TOKEN + '&maxResults=' + (pageSize != null ? pageSize : '50');
  }

  private requestPlayList(id: string, pageSize?: string, pageToken?: string): Observable<PlayList> {
    return this.http.get(this.getURL(id, pageSize, pageToken))
      .pipe(
        map((res: any) => {
          return {
            id: id,
            total: res.pageInfo.totalResults,
            pages: Math.floor((res.pageInfo.totalResults - 1) / 5) + 1,
            actual: res.items != null && res.items.length > 0 ? Math.floor(res.items[0].snippet.position / 5) + 1 : 1,
            nextPageToken: res.nextPageToken,
            prevPageToken: res.prevPageToken,
            videos: res.items.map((item: any) => {
              return {
                id: item.snippet.resourceId.videoId,
                publishedAt: new Date(item.snippet.publishedAt),
                title: item.snippet.title,
                description: item.snippet.description,
                imgURL: item.snippet.thumbnails.medium.url,
              } as Video;
            })
          } as PlayList;
        })
      );
  }

  getPlayList(id: string, pageSize?: string): Observable<PlayList> {
    return this.requestPlayList(id, pageSize);
  }

  movePage(playlist: PlayList, direction: PageDirection): Observable<PlayList> {
    let pageToken = '';
    if (direction === PageDirection.NEXT) {
      pageToken = playlist.nextPageToken;
    } else if (direction === PageDirection.PREVIOUS) {
      pageToken = playlist.prevPageToken;
    }
    return this.requestPlayList(playlist.id, pageToken);
  }
}
