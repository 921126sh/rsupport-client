import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Page {
  total: number;
  pageable: Pageable;
  content: Notice[];
}

interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  unpaged: boolean;
}

interface Notice {
  chgDt: string;
  chgId: string;
  chgNm: string;
  noticeContent: string;
  noticeNo: number;
  noticeTitle: string;
  regDt: string;
  regId: string;
  regNm: string;
  total: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notices: Notice[] = [];

  page: number = 1;
  pageSize: number = 10;
  constructor(private http: HttpClient) {
    this.get();
  }

  get() {
    this.http
      .get('http://localhost:8080/rs-server/notices')
      .subscribe((res: Page) => {
        this.notices = res.content.map((content) => content);
        this.page = res.pageable.pageNumber + 1;
        this.pageSize = res.total;
      });
  }

  save() {}

  update() {}

  delete() {}

  onPageChange(currentPage) {
    console.log(currentPage);
  }
}
