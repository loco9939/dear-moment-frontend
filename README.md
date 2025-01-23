## [FE] Onboarding

### 실행 방법

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## commit convention

- feat : 새로운 기능 추가
- chore : 간단한 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- fix : 버그 수정
- refactor : 코드 리펙토링

## git branch 전략

- production: 운영 브랜치
- develop: 개발 브랜치
- feature: 작업 브랜치

### branch 작명 방법

```bash
feature/bod-1 // Jira 이슈 넘버
```

### PR 요청 방법

feature 브랜치로 github에 push 한 뒤, 해당 브랜치에서 develop 브랜치로 아래 양식에 맞게 PR 요청

```
# PR 요청 양식

제목: [BOD-1] 작업 내용 요약

내용

## PR 유형

- [x] 기능 추가
- [ ] 버그 수정
- [ ] 스타일 수정
- [ ] 리팩터링

## 이슈 링크

https://~ (지라 작업 링크)

## 수정 사항

- 버튼 컴포넌트 기능 구현
- 버튼 컴포넌트 스타일 수정

## 기타

- 기타 등등..
```
