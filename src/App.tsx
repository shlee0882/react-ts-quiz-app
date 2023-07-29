import React, { useLayoutEffect, useState } from 'react';
import './App.css'; 
import { Quiz } from './quiz.interface';
import { ENG_QUIZ_CATE9, KOR_QUIZ_CATE9, ENG_QUIZ_CATE10, KOR_QUIZ_CATE10, ENG_QUIZ_CATE11, KOR_QUIZ_CATE11, ENG_QUIZ_CATE12, KOR_QUIZ_CATE12
  ,ENG_QUIZ_CATE13, KOR_QUIZ_CATE13, ENG_QUIZ_CATE14, KOR_QUIZ_CATE14, ENG_QUIZ_CATE15, KOR_QUIZ_CATE15, ENG_QUIZ_CATE16, KOR_QUIZ_CATE16
  ,ENG_QUIZ_CATE17, KOR_QUIZ_CATE17, ENG_QUIZ_CATE18, KOR_QUIZ_CATE18, ENG_QUIZ_CATE19, KOR_QUIZ_CATE19, ENG_QUIZ_CATE20, KOR_QUIZ_CATE20
  ,ENG_QUIZ_CATE21, KOR_QUIZ_CATE21, ENG_QUIZ_CATE22, KOR_QUIZ_CATE22, ENG_QUIZ_CATE23, KOR_QUIZ_CATE23, ENG_QUIZ_CATE24, KOR_QUIZ_CATE24
  ,ENG_QUIZ_CATE25, KOR_QUIZ_CATE25, ENG_QUIZ_CATE26, KOR_QUIZ_CATE26, ENG_QUIZ_CATE27, KOR_QUIZ_CATE27, ENG_QUIZ_CATE28, KOR_QUIZ_CATE28
  ,ENG_QUIZ_CATE29, KOR_QUIZ_CATE29, ENG_QUIZ_CATE30, KOR_QUIZ_CATE30, ENG_QUIZ_CATE31, KOR_QUIZ_CATE31, ENG_QUIZ_CATE32, KOR_QUIZ_CATE32
} from './quizData'; 

function App() {
  const [translateQuizzArr, setTranslateQuizzArr] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [hasIncorrectAttempt, setHasIncorrectAttempt] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizTrigger, setQuizTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // let multiplePreTranslate = '';

  // let staticReqQuizArr = 
  // [
  //   "https://opentdb.com/api.php?amount=40&category=9&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=10&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=11&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=12&type=multiple",
  //   "https://opentdb.com/api.php?amount=20&category=13&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=14&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=15&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=16&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=17&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=18&type=multiple",
  //   "https://opentdb.com/api.php?amount=30&category=19&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=20&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=21&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=22&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=23&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=24&type=multiple",
  //   "https://opentdb.com/api.php?amount=20&category=25&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=26&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=27&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=28&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=29&type=multiple",
  //   "https://opentdb.com/api.php?amount=20&category=30&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=31&type=multiple",
  //   "https://opentdb.com/api.php?amount=40&category=32&type=multiple"
  // ]


  useLayoutEffect(() => {
    getStaticQuizData();
    // 퀴즈 API 데이터 변환 작업은 fetchAllQuizzes 사용
    // fetchAllQuizzes().then(response => {
    //   translate(response);
    // });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizTrigger]);


  const getStaticQuizData = () => {
    let quizArr: Quiz[] = [];
    let quizCategory = [
        {"eng": ENG_QUIZ_CATE9, "kor" : KOR_QUIZ_CATE9}
      , {"eng": ENG_QUIZ_CATE10, "kor": KOR_QUIZ_CATE10}
      , {"eng": ENG_QUIZ_CATE11, "kor": KOR_QUIZ_CATE11}      
      , {"eng": ENG_QUIZ_CATE12, "kor": KOR_QUIZ_CATE12}      
      , {"eng": ENG_QUIZ_CATE13, "kor": KOR_QUIZ_CATE13}      
      , {"eng": ENG_QUIZ_CATE14, "kor": KOR_QUIZ_CATE14}      
      , {"eng": ENG_QUIZ_CATE15, "kor": KOR_QUIZ_CATE15}      
      , {"eng": ENG_QUIZ_CATE16, "kor": KOR_QUIZ_CATE16}      
      , {"eng": ENG_QUIZ_CATE17, "kor": KOR_QUIZ_CATE17}      
      , {"eng": ENG_QUIZ_CATE18, "kor": KOR_QUIZ_CATE18}      
      , {"eng": ENG_QUIZ_CATE19, "kor": KOR_QUIZ_CATE19}      
      , {"eng": ENG_QUIZ_CATE20, "kor": KOR_QUIZ_CATE20}      
      , {"eng": ENG_QUIZ_CATE21, "kor": KOR_QUIZ_CATE21}      
      , {"eng": ENG_QUIZ_CATE22, "kor": KOR_QUIZ_CATE22}      
      , {"eng": ENG_QUIZ_CATE23, "kor": KOR_QUIZ_CATE23}      
      , {"eng": ENG_QUIZ_CATE24, "kor": KOR_QUIZ_CATE24}      
      , {"eng": ENG_QUIZ_CATE25, "kor": KOR_QUIZ_CATE25}      
      , {"eng": ENG_QUIZ_CATE26, "kor": KOR_QUIZ_CATE26}      
      , {"eng": ENG_QUIZ_CATE27, "kor": KOR_QUIZ_CATE27}      
      , {"eng": ENG_QUIZ_CATE28, "kor": KOR_QUIZ_CATE28}      
      , {"eng": ENG_QUIZ_CATE29, "kor": KOR_QUIZ_CATE29}      
      , {"eng": ENG_QUIZ_CATE30, "kor": KOR_QUIZ_CATE30}      
      , {"eng": ENG_QUIZ_CATE31, "kor": KOR_QUIZ_CATE31}      
      , {"eng": ENG_QUIZ_CATE32, "kor": KOR_QUIZ_CATE32}       
    ]

    shuffleArray(quizCategory);

    for(let data=0; data < quizCategory.length; data++){
      let quizCate = quizCategory[data];
      let multipleArrPreTranslate = quizCate.kor.split('\n\n');
      let multipleEngPreTranslate = quizCate.eng.split('\n\n');

      for(let i=0; i < multipleArrPreTranslate.length; i++){
        let data = multipleArrPreTranslate[i];
        let engData = multipleEngPreTranslate[i];
  
        let arrPreTranslate = data.split('\n');
        let engArrPreTranslate = engData.split('\n');
        let engRightAnswerStr = dataStrReplace(engArrPreTranslate[3]);
        let engWrongAnswerStr1 = dataStrReplace(engArrPreTranslate[4]);
        let engWrongAnswerStr2 = dataStrReplace(engArrPreTranslate[5]);
        let engWrongAnswerStr3 = dataStrReplace(engArrPreTranslate[6]);
  
        let incorrectStrArr: string[] = [];
        let questionStr = `${dataStrReplace(arrPreTranslate[2])}`;
        let rightAnswerStr = `${dataStrReplace(arrPreTranslate[3])} ( ${engRightAnswerStr} )`; 
        let wrongAnswerStr1 = `${dataStrReplace(arrPreTranslate[4])} ( ${engWrongAnswerStr1} )`;
        let wrongAnswerStr2 = `${dataStrReplace(arrPreTranslate[5])} ( ${engWrongAnswerStr2} )`;
        let wrongAnswerStr3 = `${dataStrReplace(arrPreTranslate[6])} ( ${engWrongAnswerStr3} )`;
  
        incorrectStrArr.push(wrongAnswerStr1, wrongAnswerStr2, wrongAnswerStr3);
        let allAnswersStrArr: string[] = [];
        allAnswersStrArr.push(...incorrectStrArr, rightAnswerStr);
        shuffleArray(allAnswersStrArr);
  
        let translateQuizObj: Quiz = {
          category: arrPreTranslate[0],
          difficulty: arrPreTranslate[1], 
          question: questionStr,
          correct_answer: rightAnswerStr,
          incorrect_answers: incorrectStrArr,
          all_answers: allAnswersStrArr,
          type: ''
        };
        quizArr.push(translateQuizObj);
      }
    }
    setTranslateQuizzArr(quizArr);
    setIsLoading(false);
  }

  // const getQuizWithDelay = async(i:number) => {
  //   return new Promise((resolve) => {
  //       setTimeout(async () => {
  //           const response = await getQuizData(i);
  //           resolve(response);
  //       }, i * 100);  
  //   });
  // }

  // const fetchAllQuizzes = async() => {
  //     const allQuizzes = [];
  //     for(let i = 0; i < staticReqQuizArr.length; i++){
  //         const response:any = await getQuizWithDelay(i);
  //         let quizzes: Quiz[] = response.results;
  //         allQuizzes.push(...response.results);
  //     }
  //     return allQuizzes;
  // }
  
  const handleSolveMore = () => {
    let quizArr: Quiz[] = [];
    setTranslateQuizzArr(quizArr);
    setIsLoading(true);
    setQuizTrigger(!quizTrigger); 
    setScore(0);
    setCurrentQuizIndex(0);
  };

  const handleChangeSubject = () => {
    getStaticQuizData();
  }
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === translateQuizzArr[currentQuizIndex].correct_answer;
  
    if (isAnswerCorrect) {
      setIsCorrect(true);
      if (!hasIncorrectAttempt) {
        setScore(score + 1);
      }
      setShowAnswer(true);
  
      setTimeout(() => {
        setIsCorrect(false);
        setShowAnswer(false);
        setHasIncorrectAttempt(false);
        setCurrentQuizIndex(currentQuizIndex + 1);
      }, 800);  
    } else {
      setShowAnswer(true);
      setHasIncorrectAttempt(true);
    }
  };

  const dataStrReplace = (arrPreTranslate: any) => {
    return arrPreTranslate.replace(/&quot;/g, '"')
                     .replace(/&#039;/g, "'")
                     .replace(/&ldquo;/g, '"')
                     .replace(/&rdquo;/g, '"');
  }

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // const getQuizData = async (category:number) => {
  //   let url = staticReqQuizArr[category];
  //   let response = await fetch(url, {
  //     method: 'GET',
  //   }); 
  //   let data = await response.json()
  //   return data;
  // }

  // const translate = async (quizzes: Quiz[]) => {
  //   // let url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`

  //   multiplePreTranslate = '';
  //   let preTranslate = '';

  //   for(let quizObj of quizzes){
  //     let icaListStr = '';
  //     for (let ica of quizObj.incorrect_answers) {
  //       if(ica === quizObj.incorrect_answers[quizObj.incorrect_answers.length - 1]) {
  //         icaListStr += `${ica}`;
  //       }else{
  //         icaListStr += `${ica}\n`;
  //       }
  //     }
  //     if(quizObj === quizzes[quizzes.length - 1]) {
  //       preTranslate += `${quizObj.category}\n${quizObj.difficulty}\n${quizObj.question}\n${quizObj.correct_answer}\n${icaListStr}`;      
  //     }else{
  //       preTranslate += `${quizObj.category}\n${quizObj.difficulty}\n${quizObj.question}\n${quizObj.correct_answer}\n${icaListStr}\n\n`;      
  //     }
  //   }
  //   multiplePreTranslate = dataStrReplace(preTranslate);
  //   return multiplePreTranslate;
  // }

  return (
    <div className="App bg-blue-50 min-h-screen flex flex-col items-center justify-center font-nanum-gothic font-bold">
      <h1 className="text-4xl mb-4 font-bold">랜덤퀴즈 앱</h1>
      {
        isLoading ? 
        <div>Loading...</div> : 
        (
          // <h2 className="text-2xl mb-8">점수 : {score}</h2>
          <div className="flex justify-center space-x-4 mb-4">
            <h2 className="bg-indigo-400 text-white font-bold py-2 px-4 rounded">
              점수 : {score}
            </h2>
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" onClick={handleChangeSubject}>
              퀴즈 주제 바꾸기
            </button>
          </div>
        )
      }


      {translateQuizzArr.length > 0 && currentQuizIndex <= translateQuizzArr.length - 1 ? (
        <div className="w-full bg-white p-8 rounded shadow flex flex-col">
          <h3 className="text-base mb-4 text-neutral-500">주제 : {translateQuizzArr[currentQuizIndex].category}</h3>
          <h2 className="text-xl mb-4 text-zinc-700 font-extrabold">{translateQuizzArr[currentQuizIndex].question}</h2>
          <h3 className={`text-base mb-4 ${translateQuizzArr[currentQuizIndex].difficulty === '어려움' ? 'text-red-400' : translateQuizzArr[currentQuizIndex].difficulty === '중간' ? 'text-yellow-500' : 'text-green-500'}`}>
            난의도 : {translateQuizzArr[currentQuizIndex].difficulty}
          </h3>

          {translateQuizzArr[currentQuizIndex].all_answers.map((answer, index) => (

          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={`my-2 p-4 text-white 
              ${showAnswer && answer === translateQuizzArr[currentQuizIndex].correct_answer 
                ? 'bg-green-500 text-white animate-pulse'  
                : showAnswer && answer === selectedAnswer
                ? 'bg-red-500 text-white'
                : 'bg-sky-500/100 text-white'}`}
          >
            {answer}
          </button>

          ))}

          {isCorrect && (
            <div className="bg-green-500 text-white p-4 mt-4 rounded">
              정답입니다. 다음 문제로 이동 중...
            </div>
          )}
            
          {showAnswer && !isCorrect && (
            <div className="text-red-500 p-4 mt-4 rounded">
              정답은 : {translateQuizzArr[currentQuizIndex].correct_answer} 입니다.
            </div>
          )}
        </div>
      ) : isLoading ? <div>      
        <h2 className="text-2xl">랜덤 퀴즈 로딩 중입니다.</h2>
      </div> : 
      (
        <>
        <h2 className="text-2xl">퀴즈가 끝났습니다. <br/> 최종 점수는 {score} 점 입니다.</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSolveMore}>
          퀴즈 더 풀기
        </button>
      </>
      )
    }
    </div>
  );

}

export default App;
