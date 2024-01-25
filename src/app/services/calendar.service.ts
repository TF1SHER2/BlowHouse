import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageDirection } from '../models/youtube.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private CALENDAR_TOKEN = 'AIzaSyCK-amES1535cPZM7E9X4yzkas3zcR4Y-4';
  private CALENDAR_ID = '2cb9493d64d273d15ecb9f2935c9afaab8da06d495fabe62d5db7297f512f5d8';
  maxPageSize = '50';

  constructor(public http: HttpClient) { }

  private getURL(pageSize?: string, pageToken?: string): string {
    return 'https://www.googleapis.com/calendar/v3/calendars/' + this.CALENDAR_ID + '/events?calendarId=' + this.CALENDAR_ID + '%40group.calendar.google.com&key=' + this.CALENDAR_TOKEN + '&maxResults=' + ((pageSize != null) ? pageSize : this.maxPageSize) + ((pageToken) ? '&pageToken=' + pageToken : '');
  }

  private requestEvents(pageSize?: string, pageToken?: string): Observable<any> {
    return this.http.get(this.getURL(pageSize, pageToken))
      .pipe(
        map((res: any) => {
          return {
            // total: res.pageInfo.totalResults,
            // pages: Math.floor((res.pageInfo.totalResults - 1) / 5) + 1,
            // actual: res.items != null && res.items.length > 0 ? Math.floor(res.items[0].snippet.position / 5) + 1 : 1,
            ...res
          } as any;
        })
      );
  }

  getEvents(pageSize?: string): Observable<any> {
    return this.requestEvents(pageSize);
  }

  movePage(eventList: any, direction: PageDirection, pageSize?: string): Observable<any> {
    let pageToken = '';
    if (direction === PageDirection.NEXT) {
      pageToken = eventList.nextPageToken;
    } else if (direction === PageDirection.PREVIOUS) {
      pageToken = eventList.prevPageToken;
    }
    return this.requestEvents((pageSize != null ? pageSize : this.maxPageSize), pageToken);
  }
}
