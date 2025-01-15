import React, { useEffect, useState } from "react";
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[][];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  correctAnswer:string,
  userAnswers:AnswerObject|any
  questions: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  correctAnswer,
  userAnswers,
  questions,
  totalQuestions,
}) => {
    useEffect(()=>{
        console.log(userAnswers[questions-1])
    })
    return (<div className="question-card">
        <p className="number">
          Question: {questions} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div className="ans-container">
          {answers[0].map((answer, index) => (
            <div className="options" key={index}>
              <button
                disabled={!!userAnswers[questions-1]}
                value={answer}
                onClick={callback}
                className={!userAnswers[questions-1]?"":userAnswers[questions-1] && userAnswers[questions-1].answer===answer ? userAnswers[questions-1].correct ?"correct":"wrong":""}
                dangerouslySetInnerHTML={{ __html: answer }} 
              >
              </button>
            </div>
          ))}
        </div>
      </div>
    );
    
}
  
export default QuestionCard;
