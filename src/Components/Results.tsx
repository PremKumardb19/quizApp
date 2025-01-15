import { AnswerObject } from "../App";

const Results = ({ answerObject }: { answerObject: AnswerObject[] }) => {
  return (
    <div>
      {answerObject.map((elt: AnswerObject, index: number) => (
        <div
          key={index}
          className={`result-container ${
            elt.correct ? "correct-answer" : "wrong-answer"
          }`}
        >
          <p className="number">
            Question: {index + 1} / {answerObject.length}
          </p>
          <p dangerouslySetInnerHTML={{ __html: elt.question }} />
          {!elt.correct ? (<><p>
            Your Answer:{" "}
            <span dangerouslySetInnerHTML={{ __html: elt.answer }} />
          </p>
          <p>
            Correct Answer:{" "}
            <span dangerouslySetInnerHTML={{ __html: elt.correctAnswer }} />
          </p></>):(<p>
            Answer:{" "}
            <span dangerouslySetInnerHTML={{ __html: elt.answer }} />
          </p>)}
          <p>
            {elt.correct ? (
              <span className="correct-answer-text">Your answer is correct!</span>
            ) : (
              <span className="wrong-answer-text">Your answer is incorrect.</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
