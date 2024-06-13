import { useState } from "react";
import "./App.css";
import { Question } from "./Question";
import QuestionAndAnswer from "./QuestionAndAnswer";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionId, setQuestionId] = useState<number>(0);

  const [nrOfQuestions, setNrOfQuestions] = useState<number>(10);
  const [maxValue, setMaxValue] = useState<number>(20);
  const [showResult, setShowResult] = useState<boolean>(false);

  function handleGenerate(): void {
    const newQuestions: Question[] = [];
    for (let i = 0; i < nrOfQuestions; i++) {
      const answer = Math.floor(Math.random() * maxValue);
      const firstNumber = Math.floor(Math.random() * answer);
      const secondNumber = answer - firstNumber;
      newQuestions.push({ firstNumber, secondNumber, answer });
    }
    setQuestions(newQuestions);
    setShowResult(false);
    setQuestionId(questionId + nrOfQuestions);
  }

  return (
    <>
      <div>
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
