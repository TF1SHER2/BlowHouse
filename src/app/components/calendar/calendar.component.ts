import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDirection } from 'src/app/models/youtube.models';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  subs = new Array<Subscription>();
  eventItems: any;
  eventList: any;
  showLoadMore = false;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.subs.push(this.calendarService.getEvents('10').subscribe((result) => {
      this.eventList = result;
      this.eventItems = this.eventList?.items;

      if (this.eventList.nextPageToken) {
        this.showLoadMore = true;
      } else {
        this.showLoadMore = false;
      }
    }));
  }

  loadMore() {
    this.subs.push(this.calendarService.movePage(this.eventList, PageDirection.NEXT).subscribe((result) => {
      this.eventList = result;
      this.eventItems = this.eventItems.concat(this.eventList?.items);

      if (this.eventList.nextPageToken) {
        this.showLoadMore = true;
      } else {
        this.showLoadMore = false;
      }
    }));
  }
}
