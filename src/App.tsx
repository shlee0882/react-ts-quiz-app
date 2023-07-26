import React, { useLayoutEffect, useState } from 'react';
import './App.css'; 
import { Quiz } from './quiz.interface';

function App() {
  const [translateQuizzArr, setTranslateQuizzArr] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [hasIncorrectAttempt, setHasIncorrectAttempt] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizTrigger, setQuizTrigger] = useState(false);

  const { REACT_APP_GOOGLE_TRANSLATE_API_KEY } = process.env;
  const apiKey: string | undefined = REACT_APP_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Google API Key');
  }
  let multiplePreTranslate = '';

  useLayoutEffect(() => {
    getQuizData().then(response => {
      console.log(response.data);
      let quizzes: Quiz[] = response.results;
      let quizArr: Quiz[] = [];
  
      const translatePromises = translate(quizzes)
        .then(response => {
          let translatedData = response?.data?.translations[0]?.translatedText;
          let multipleArrPreTranslate = translatedData.split('\n\n');
          let multipleEngPreTranslate = multiplePreTranslate.split('\n\n');
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
  
      Promise.all([translatePromises]).then(() => {
        setTranslateQuizzArr(quizArr);
      });
  
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizTrigger]);
  
  const handleSolveMore = () => {
    setQuizTrigger(!quizTrigger); 
    setScore(0);
    setCurrentQuizIndex(0);
  };
  
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
  


  function dataStrReplace(arrPreTranslate: any) {
    return arrPreTranslate.replace(/&quot;/g, '"')
                     .replace(/&#039;/g, "'")
                     .replace(/&ldquo;/g, '"')
                     .replace(/&rdquo;/g, '"');
  }

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

  async function translate(quizzes: Quiz[]) {
    let url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`

    multiplePreTranslate = '';
    let preTranslate = '';

    for(let quizObj of quizzes){
      let icaListStr = '';
      for (let ica of quizObj.incorrect_answers) {
        if(ica === quizObj.incorrect_answers[quizObj.incorrect_answers.length - 1]) {
          icaListStr += `${ica}`;
        }else{
          icaListStr += `${ica}\n`;
        }
      }
      if(quizObj === quizzes[quizzes.length - 1]) {
        preTranslate += `${quizObj.category}\n${quizObj.difficulty}\n${quizObj.question}\n${quizObj.correct_answer}\n${icaListStr}`;      
      }else{
        preTranslate += `${quizObj.category}\n${quizObj.difficulty}\n${quizObj.question}\n${quizObj.correct_answer}\n${icaListStr}\n\n`;      
      }
    }

    multiplePreTranslate = dataStrReplace(preTranslate);

    let response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         target: 'ko',
         format: "text",
         q: multiplePreTranslate
       }),
    }); 
    let data = await response.json()
    return data;
  }

  return (
    <div className="App bg-blue-50 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4 font-bold">Quiz App</h1>
      <h2 className="text-2xl mb-8">Score: {score}</h2>
      {translateQuizzArr.length > 0 && currentQuizIndex <= translateQuizzArr.length - 1 ? (
        <div className="w-full bg-white p-8 rounded shadow flex flex-col">
          <h2 className="text-xl mb-4">{translateQuizzArr[currentQuizIndex].question}</h2>

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
              Correct answer! Moving to next question...
            </div>
          )}
            
          {showAnswer && !isCorrect && (
            <div className="text-red-500 p-4 mt-4 rounded">
              The correct answer is: {translateQuizzArr[currentQuizIndex].correct_answer}
            </div>
          )}
        </div>
      ) : (
        <>
        <h2 className="text-2xl">Quiz finished! Final score is {score}.</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSolveMore}>
          Solve More Questions
        </button>
      </>
      )}
    </div>
  );

}

export default App;
