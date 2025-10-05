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
    const existingQuestions = new Set<string>();
    while (newQuestions.length < nrOfQuestions) {
      const newQuestion = generateQuestion(operation, maxValue);
      const questionKey = `${newQuestion.firstNumber}-${newQuestion.operation}-${newQuestion.secondNumber}`;
      if (!existingQuestions.has(questionKey)) {
        newQuestions.push(newQuestion);
        existingQuestions.add(questionKey);
      }
    }
    setQuestions(newQuestions);
    setShowResult(false);
    setQuestionId(questionId + nrOfQuestions);
  }

  function generateQuestion(operation: Operation, maxValue: number): Question {
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

  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  function generateDivision(maxValue: number): Question {
    const sqrtOfMax = Math.round(Math.sqrt(maxValue));
    let firstNumber = Math.round(Math.random() * (maxValue - 2)) + 2;
    const secondNumber = Math.floor(Math.random() * (sqrtOfMax - 2)) + 2;
    const answer = Math.floor(firstNumber / secondNumber);
    firstNumber = answer * secondNumber;
    return { firstNumber, secondNumber, answer, operation: "division" };
  }

  function generateMultiplication(maxValue: number): Question {
    const maxFactor = Math.ceil(Math.sqrt(maxValue));
    const firstNumber = getRandomInt(1, maxFactor);
    const secondNumber = getRandomInt(1, maxFactor);
    const answer = firstNumber * secondNumber;
    return { firstNumber, secondNumber, answer, operation: "multiplication" };
  }

  function generateSubtraction(maxValue: number): Question {
    const firstNumber = Math.round(Math.random() * (maxValue - 1)) + 1;
    const secondNumber = Math.round(Math.random() * (firstNumber - 2)) + 1;
    const answer = firstNumber - secondNumber;
    return { firstNumber, secondNumber, answer, operation: "subtraction" };
  }

  function generateAddition(maxValue: number): Question {
    const answer = Math.round(Math.random() * (maxValue - 2)) + 2;
    const firstNumber = Math.floor(Math.random() * (answer - 1)) + 1;
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
