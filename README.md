<br>

## 개요

ReactJs, TypeScript, Tailwindcss를 사용해 만든 프로젝트이며<br>
영어로 구성된 퀴즈 API를 Google Cloud Translation API를 사용해<br>
한글 번역 후 문제 생성 제공하는 <br> 
[랜덤 퀴즈 토이 프로젝트] 입니다.
<br>
<br>

## 사용 방법

- 랜덤한 문제가 노출됩니다.
- 문제는 3문제로 노출됩니다.
- 최초 오답 선택 시 정답이 노출됩니다.
- 최초 정답 선택 시 점수가 오릅니다.

<br>

## 기능 요약

- 문제 제공 기능

    - 문제 데이터는 [퀴즈 오픈 API](https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple)를 사용해 다양하게 가져올 수 있습니다. 
    - 영문 데이터를 [Google Cloud Translation API](https://cloud.google.com/translate/docs/reference/rest)를 사용해 한글로 번역합니다. 


## 사용 기술

- Reactjs, Typescript, Tailwindcss
- Opentdb API(퀴즈 API)
- Google Cloud Translation API

<br>

## 배포된 Deploy URL

https://shlee0882.github.io/react-ts-quiz-app/

<br>

## 실행 하기
```
npm install
npm run start
```
<br>

## 레퍼런스

- https://opentdb.com/
- https://cloud.google.com/translate/docs/reference/rest
- https://tailwindcss.com/
