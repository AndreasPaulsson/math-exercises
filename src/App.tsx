import { useState } from "react";
import "./App.css";

type Question = {
  firstNumber: number;
  secondNumber: number;
  answer: number;
};

function App() {
  const [questions, setQuestions] = useState<Question[]>([
    { firstNumber: 0, secondNumber: 0, answer: 0 },
    { firstNumber: 1, secondNumber: 2, answer: 3 },
  ]);

  const [nrOfQuestions, setNrOfQuestions] = useState<number>(10);
  const [maxValue, setMaxValue] = useState<number>(20);

  function handleGenerate(): void {
    const newQuestions: Question[] = [];
    for (let i = 0; i < nrOfQuestions; i++) {
      const firstNumber = Math.floor(Math.random() * maxValue);
      const secondNumber = Math.floor(Math.random() * maxValue);
      const answer = firstNumber + secondNumber;
      newQuestions.push({ firstNumber, secondNumber, answer });
    }
    setQuestions(newQuestions);
  }

  return (
    <>
      <div>
        <label htmlFor="nrOfQuestions">Antal tal:</label>
        <input
          type="number"
          id="nrOfQuestions"
          name="nrOfQuestions"
          value={nrOfQuestions}
          onChange={(e) => setNrOfQuestions(Number(e.target.value))}
        />
        <label htmlFor="maxValue">Max värde:</label>
        <input
          type="number"
          id="maxValue"
          name="maxValue"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
        />
        <button onClick={() => handleGenerate()}>Generera</button>
      </div>
      <h1>Tal:</h1>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <span>{`${question.firstNumber} + ${question.secondNumber} = `}</span>
            <input
              type="number"
              id={`answer-${index}`}
              name={`answer-${index}`}
              data-answer={question.answer}
            ></input>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
