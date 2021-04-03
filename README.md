# 알서포트 클라이언트


# 작업순서

1. 알서포트 클라이언트 클론

```
git clone https://github.com/esmoney/rsupport-client.git
```

2. 노드 설치

```
brew install node or 직접설치
```

3. 의존성 설치

```
npm install -g @angular/cli
npm i
```

4. 시작

```
ng s -o
```

# 기술스택

-   node : 14.16.0
-   angular-core : 10.1.7
-   angular-cli : 10.1.7
-   typescript : 4.0.7
-   bootstrap : 4.5.0
-   외 package.json참고


# endpoint
-   http://localhost:4200

# 참고
-   [ANGULAR](https://angular.io/)

# 주의사항
- 서버에서 CORS허용 localhost:4200 으로 주었기 때문에 포트 변경시 CORS에러 발생
