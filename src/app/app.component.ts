import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Page {
  total: number;
  pageable: Pageable;
  contentList: Notice[];
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
  noticeTitle: string;
  noticeContent: string;
  noticeNo?: number;
  chgDt?: string;
  chgId?: string;
  chgNm?: string;
  regDt?: string;
  regId?: string;
  regNm?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly URL = 'http://localhost:8080/rs-server/notices';
  page: number = 1;
  pageSize: number = 10;

  notices: Notice[] = [];
  selectedNotice: Notice = { noticeTitle: '', noticeContent: '' };

  constructor(private http: HttpClient) {
    this.get();
  }

  get() {
    this.http
      .get(this.URL, {
        params: {
          page: String(this.page - 1),
          size: '10',
        },
      })
      .subscribe((res: Page) => {
        this.notices = res.contentList.map((content) => content);
        this.page = res.pageable.pageNumber + 1;
        this.pageSize = res.total * this.notices.length;
      });
  }

  save() {
    if (
      this.selectedNotice.noticeNo === null ||
      this.selectedNotice.noticeNo === undefined
    ) {
      this.http.post(this.URL, this.selectedNotice).subscribe((res) => {
        this.get();
      });
    } else {
      this.http
        .put(`${this.URL}/${this.selectedNotice.noticeNo}`, this.selectedNotice)
        .subscribe((res) => {
          this.get();
        });
    }
  }

  update() {}

  delete() {}

  onPageChange(currentPage) {
    this.page = currentPage;
    this.get();
    console.log(currentPage);
  }

  onClickRow(notice: Notice, idx: number) {
    this.selectedNotice =
      this.selectedNotice == notice
        ? { noticeTitle: '', noticeContent: '' }
        : notice;
  }
}
