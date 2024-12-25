import { useState } from "react";
import { Question } from "./Question";
import { Operation } from "./Operation";

function QuestionAndAnswer(props: { question: Question; showResult: boolean }) {
  const [answer, setAnswer] = useState<number>(0);

  function getOperationSymbol(operation: Operation): string {
    switch (operation) {
      case "addition":
        return "+";
      case "subtraction":
        return "-";
      case "multiplication":
        return "*";
      case "division":
        return "/";
    }
  }

  return (
    <div className="question-container" style={{ display: "flex" }}>
      <span>{`${props.question.firstNumber}`}</span>
      <span> {getOperationSymbol(props.question.operation)} </span>
      <span>{`${props.question.secondNumber}`}</span>
      <span> = </span>
      <input
        type="number"
        title="Skriv ditt svar här"
        placeholder="Skriv ditt svar här"
        data-answer={props.question.answer}
        value={answer}
        onChange={(e) => setAnswer(Number(e.target.value))}
        onFocus={(e) => e.target.select()}
      ></input>
      {props.showResult && (
        <span>{`${props.question.answer === answer ? "Rätt!" : "Fel"}`}</span>
      )}
    </div>
  );
}

export default QuestionAndAnswer;
