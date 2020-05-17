import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

const QuizComponent = () => {
  const [questionBank, setQuestionBank] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [responses, setResponses] = React.useState(0);

  const getQuestions = () => {
    quizService().then((question) => {
      setQuestionBank(question);
    });
  };

  const computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
    setResponses(responses < 5 ? responses + 1 : 5);
  };

  const playAgain = () => {
    getQuestions();
    setScore(0);
    setResponses(0);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="container">
      <div className="title">Quiz Contest</div>
      {questionBank.length > 0 && responses < 5 &&
        questionBank.map(({ question, answers, correct, questionId }) => (
          <QuestionBox question={question} options={answers} key={questionId} selected={(answer) => computeAnswer(answer, correct)} />
        ))}
      {responses === 5 ? <Result score={score} playAgain={playAgain} /> : null}
    </div>
  );
};

ReactDOM.render(<QuizComponent />, document.getElementById("root"));
