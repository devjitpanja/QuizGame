import { useContext, createContext, useState } from "react";

const Context = createContext();

export const FunctionProvider = ({ children }) => {
  const [topic, setTopic] = useState("");
  const [tooggleTopic, setToggleTopic] = useState(true);
  const [tooggleQuiz, setToggleQuiz] = useState(false);
  const [tooggleCompleted, setToggleCompleted] = useState(false);
  const [score, setScore] = useState("");
  const [questionTime, setQuestionTime] = useState(10);
  const functionNames = {
    topic,
    setTopic,
    tooggleTopic,
    setToggleTopic,
    tooggleQuiz,
    setToggleQuiz,
    tooggleCompleted,
    setToggleCompleted,
    score,
    setScore,
    questionTime,
    setQuestionTime,
  };
  return (
    <Context.Provider value={functionNames}>
      {children}
      {/* */}
    </Context.Provider>
  );
};

export const useGlobal = () => {
  return useContext(Context);
};
