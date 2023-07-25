import React, { useLayoutEffect, useState } from 'react';
import './App.css'; 
import { Quiz } from './quiz.interface';

function App() {
  const [translateQuizzArr, setTranslateQuizzArr] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [hasAttempted, setHasAttempted] = useState<boolean>(false);

  const { REACT_APP_GOOGLE_TRANSLATE_API_KEY } = process.env;
  const apiKey: string | undefined = REACT_APP_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Google API Key');
  }
  
  useLayoutEffect(() => {
    getQuizData().then(response => {
      console.log(response.data);
      let quizzes: Quiz[] = response.results;
      const translatePromises = quizzes.map(quizObj => {
        return translate(quizObj)
          .then(response => {
            let translatedData = response?.data?.translations[0]?.translatedText;
            let arrPreTranslate = translatedData.split('\n');
            let incorrectStrArr: string[] = [];
            incorrectStrArr.push(arrPreTranslate[4], arrPreTranslate[5], arrPreTranslate[6]);
            let allAnswersStrArr: string[] = [];
            allAnswersStrArr.push(...incorrectStrArr, arrPreTranslate[3]);
            shuffleArray(allAnswersStrArr);

            let questionStr = arrPreTranslate[2].replace(/&quot;/g, '"')
                     .replace(/&#039;/g, "'")
                     .replace(/&ldquo;/g, '"')
                     .replace(/&rdquo;/g, '"');

            let translateQuizObj: Quiz = {
              category: arrPreTranslate[0],
              difficulty: arrPreTranslate[1], 
              question: questionStr,
              correct_answer: arrPreTranslate[3],
              incorrect_answers: incorrectStrArr,
              all_answers: allAnswersStrArr,
              type: ''
            };
            return translateQuizObj;
          })
          .catch(reason => {
            console.log(reason.message);
            return {
              category: '',
              difficulty: '',
              question: '',
              correct_answer: '',
              incorrect_answers: [''],
              type: ''
            } as Quiz;
          });
      });
  
      Promise.all(translatePromises)
        .then(translateQuizzes => {
          console.log(translateQuizzes);
          setTranslateQuizzArr(translateQuizzes);
        });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setHasAttempted(true);
    if (answer === translateQuizzArr[currentQuizIndex].correct_answer) {
      if (!hasAttempted) {
        setScore(score + 1);
      }
      setShowAnswer(false);
      setSelectedAnswer(null);
      setHasAttempted(false);
      if (currentQuizIndex <= translateQuizzArr.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
      }
    } else {
      setShowAnswer(true);
    }
  };

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  async function getQuizData() {
    let url = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`
    let response = await fetch(url, {
      method: 'GET',
    }); 
    let data = await response.json()
    return data;
  }

  async function translate(quizObj: Quiz) {
    let url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`

    let icaListStr = '';
    for (let ica of quizObj.incorrect_answers) {
      if(ica === quizObj.incorrect_answers[quizObj.incorrect_answers.length - 1]) {
        icaListStr += `${ica}`;
      }else{
        icaListStr += `${ica}\n`;
      }
    }

    let preTranslate = `${quizObj.category}\n${quizObj.difficulty}\n${quizObj.question}\n${quizObj.correct_answer}\n${icaListStr}`;
    console.log(preTranslate);

    let response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         target: 'ko',
         format: "text",
         q: preTranslate
       }),
    }); 
    let data = await response.json()
    return data;
  }

  return (
    <div className="App">
      <h1>퀴즈 앱</h1>
      <h2>점수: {score}</h2>
      {translateQuizzArr.length > 0 && currentQuizIndex <= translateQuizzArr.length - 1 ? (
        <>
          <h2>문제 {currentQuizIndex+1}: {translateQuizzArr[currentQuizIndex].question}</h2>
          {translateQuizzArr[currentQuizIndex].all_answers.map((answer, index) => (
            <button 
              key={index}
              onClick={() => handleAnswer(answer)}
              style={{
                backgroundColor: showAnswer 
                  ? answer === translateQuizzArr[currentQuizIndex].correct_answer
                    ? 'green'
                    : answer === selectedAnswer
                    ? 'red'
                    : ''
                  : ''
              }}
            >
              {answer}
            </button>
          ))}
          {showAnswer && (
            <p>정답은 : {translateQuizzArr[currentQuizIndex].correct_answer}</p>
          )}
        </>
      ) : (
        <h2>퀴즈가 끝났습니다. 최종 점수는 {score} 점 입니다.</h2>
      )}
    </div>
  );
}

export default App;
