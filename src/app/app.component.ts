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
  /**
   * endpoint
   */
  readonly URL = 'http://localhost:8080/rs-server';
  /**
   * 페이지 번호
   */
  page: number = 1;
  /**
   * 페이지당 row 개수
   */
  pageSize: number = 10;

  /**
   * 공지목록
   */
  notices: Notice[] = [];

  /**
   * 선택된 공지
   */
  selectedNotice: Notice = { noticeTitle: '', noticeContent: '' };

  /**
   * 로그인여부
   */
  isLogin: boolean = false;

  /**
   * 아이디
   */
  id: string = '';

  /**
   * 비밀번호
   */
  pwd: string = '';

  constructor(private http: HttpClient) {}

  /**
   * 로그인을 요청한다.
   */
  login(): void {
    if (this.id === '' || this.pwd === '') {
      alert(`입력 된 정보가 올바르지 않습니다.`);
    }

    this.http
      .post(`${this.URL}/auth`, { userId: this.id, userPw: this.pwd })
      .subscribe((res) => {
        alert(
          `
          로그인 성공!!!
          아이디     :${res['userId']}
          사용자이름 :${res['userNm']}
          토큰    :${res['token']}`
        );
        this.isLogin = !this.isLogin;
        this.retrieve();
      });
  }

  /**
   * 공지를 조회한다.
   */
  retrieve(): void {
    this.http
      .get(`${this.URL}/notices`, {
        params: {
          page: String(this.page - 1),
          size: '5',
        },
      })
      .subscribe((res: Page) => {
        this.notices = res.contentList.map((content) => content);
        this.page = res.pageable.pageNumber + 1;
        this.pageSize = res.total;
      });
  }

  /**
   * 공지를 저장 또는 수정 요청한다.
   */
  save() {
    if (
      this.selectedNotice.noticeNo === null ||
      this.selectedNotice.noticeNo === undefined
    ) {
      this.http
        .post(`${this.URL}/notices`, this.selectedNotice)
        .subscribe(() => {
          this.selectedNotice = { noticeTitle: '', noticeContent: '' };
          this.retrieve();
        });
    } else {
      this.http
        .put(
          `${this.URL}/notices/${this.selectedNotice.noticeNo}`,
          this.selectedNotice
        )
        .subscribe(() => {
          this.selectedNotice = { noticeTitle: '', noticeContent: '' };
          this.retrieve();
        });
    }
  }

  /**
   * 공지번호의 공지를 삭제한다.
   *
   * @param noticeNo 공지번호
   */
  delete(noticeNo: number) {
    this.http.delete(`${this.URL}/notices/${noticeNo}`).subscribe(() => {
      this.selectedNotice = { noticeTitle: '', noticeContent: '' };
      this.retrieve();
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////

  /**
   * 페이지 번호에 해당하는 공지목록을 조회한다.
   *
   * @param currentPage 페이지 번호
   */
  onPageChange(currentPage): void {
    this.page = currentPage;
    this.retrieve();
    console.log(currentPage);
  }

  /**
   * 공지를 선택 한다.
   *
   * @param notice 공지
   */
  onClickRow(notice: Notice): void {
    this.selectedNotice =
      this.selectedNotice == notice
        ? { noticeTitle: '', noticeContent: '' }
        : notice;
  }
}
