import { useState } from "react";
import "./App.css";
import { Question } from "./Question";
import QuestionAndAnswer from "./QuestionAndAnswer";
import { Operation } from "./Operation";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionId, setQuestionId] = useState<number>(0);
  const [operation, setOperation] = useState<Operation>("addition");

  const [nrOfQuestions, setNrOfQuestions] = useState<number>(10);
  const [maxValue, setMaxValue] = useState<number>(20);
  const [showResult, setShowResult] = useState<boolean>(false);

  function handleGenerate(): void {
    const newQuestions: Question[] = [];
    for (let i = 0; i < nrOfQuestions; i++) {
      newQuestions.push(generateQuestiun(operation, maxValue));
    }
    setQuestions(newQuestions);
    setShowResult(false);
    setQuestionId(questionId + nrOfQuestions);
  }

  function generateQuestiun(operation: Operation, maxValue: number): Question {
    if (operation == "addition") {
      return generateAddition(maxValue);
    } else if (operation == "subtraction") {
      return generateSubtraction(maxValue);
    } else if (operation == "multiplication") {
      return generateMultiplication(maxValue);
    } else {
      return generateDivision(maxValue);
    }
  }

  function generateDivision(maxValue: number): Question {
    const answer = Math.floor(Math.random() * maxValue);
    const secondNumber = Math.floor(Math.random() * answer);
    const firstNumber = answer * secondNumber;
    return { firstNumber, secondNumber, answer, operation: "division" };
  }

  function generateMultiplication(maxValue: number): Question {
    const firstNumber = Math.floor(Math.random() * Math.sqrt(maxValue));
    const secondNumber = Math.floor((Math.random() * maxValue) / firstNumber);
    const answer = firstNumber * secondNumber;
    return { firstNumber, secondNumber, answer, operation: "multiplication" };
  }

  function generateSubtraction(maxValue: number): Question {
    const firstNumber = Math.floor(
      0.2 * maxValue + Math.random() * (0.8 * maxValue)
    );
    const secondNumber = Math.floor(Math.random() * (firstNumber - 1));
    const answer = firstNumber - secondNumber;
    return { firstNumber, secondNumber, answer, operation: "subtraction" };
  }

  function generateAddition(maxValue: number): Question {
    const answer = Math.floor(Math.random() * maxValue);
    const firstNumber = Math.floor(Math.random() * answer);
    const secondNumber = answer - firstNumber;
    return { firstNumber, secondNumber, answer, operation: "addition" };
  }

  return (
    <>
      <div>
        <div className="parameter-row operations-row">
          <button
            className={operation == "addition" ? "selected" : ""}
            onClick={() => setOperation("addition")}
          >
            +
          </button>
          <button
            className={operation == "subtraction" ? "selected" : ""}
            onClick={() => setOperation("subtraction")}
          >
            -
          </button>
          <button
            className={operation == "multiplication" ? "selected" : ""}
            onClick={() => setOperation("multiplication")}
          >
            *
          </button>
          <button
            className={operation == "division" ? "selected" : ""}
            onClick={() => setOperation("division")}
          >
            /
          </button>
        </div>
        <div className="parameter-row">
          <label htmlFor="nrOfQuestions">Antal tal:</label>
          <input
            type="number"
            id="nrOfQuestions"
            name="nrOfQuestions"
            value={nrOfQuestions}
            onChange={(e) => setNrOfQuestions(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <div className="parameter-row">
          <label htmlFor="maxValue">Max värde:</label>
          <input
            type="number"
            id="maxValue"
            name="maxValue"
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <div className="parameter-row">
          <button style={{ flex: 1 }} onClick={() => handleGenerate()}>
            Skapa tal
          </button>
        </div>
      </div>
      {questions.length > 0 && (
        <>
          <h2>Tal:</h2>
          <div className="questions-container">
            {questions.map((question, index) => (
              <QuestionAndAnswer
                key={index + questionId}
                question={question}
                showResult={showResult}
              />
            ))}
          </div>
          <div className="parameter-row">
            <button onClick={() => setShowResult(!showResult)}>Rätta</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
