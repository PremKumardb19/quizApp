import { useState } from "react";
import { fetchQuestions, QuestionState } from "./api";
import { Difficulty } from "./api";
import QuestionCard from "./Components/QuestionCard";
import "./index.css";
import Results from "./Components/Results";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.easy);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  
  };

  const nextQuestion = () => {
    const next = number + 1;

    if (next === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  };

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver && userAnswers.length==0 && (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      )}
      {!gameOver && (
        <p className="score">Score: {score}</p>
      )}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questions={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswers={userAnswers}
          correctAnswer={questions[number].correct_answer}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?(
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ):!gameOver && !loading && userAnswers.length === number + 1 && number+1=== TOTAL_QUESTIONS?( 
      <button className="next" onClick={nextQuestion}>
        Finish
      </button>):null}
      {gameOver && userAnswers.length === TOTAL_QUESTIONS && (
        <>
          <h4>Your Score: {score}</h4>
          <button className="start" onClick={startTrivia}>
            Restart Quiz
          </button>
          <Results answerObject={userAnswers}/>
        </>
      )}
    </div>
  );
};

export default App;
