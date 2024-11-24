import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./App.css";
import { useGlobal } from "./Context/Global";
import Quiz from "./Quiz";
import Completed from "./Completed";

function App() {
  const {
    topic,
    setTopic,
    tooggleTopic,
    setToggleTopic,
    tooggleQuiz,
    setToggleQuiz,
    tooggleCompleted,
    setToggleCompleted,
    setQuestionTime,
  } = useGlobal();
  return tooggleTopic ? (
    <div className="bg-[#250b6d] w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-[80%] max-w-[600px] rounded-lg px-3 py-6 flex flex-col gap-5">
        <div className="w-full flex  flex-col justify-center items-center gap-2">
          <h1 className="font-[600] text-[1.5rem]">AI Quiz Game</h1>
          <p className="text-[12px] text-[#3d3d3d]">Using CHAT GPT 4-o</p>
        </div>
        <div className="w-full mt-1 gap-2 flex flex-col">
          <div className="w-full h-[50px] border-[1.6px] rounded-lg py-1 px-2 flex items-center">
            <input
              placeholder="Enter topic name.."
              className="focus:outline-none w-full"
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="w-full h-[50px] border-[1.6px] rounded-lg py-1 px-2 flex items-center">
            <input
              type="number"
              placeholder="Time per question - Default 10 sec"
              className="focus:outline-none w-full"
              onChange={(e) => setQuestionTime(e.target.value.trim() || 10)}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className="h-[40px] bg-[#250b6d] w-full rounded-md text-white hover:bg-[#250b6de5]"
            onClick={() => {
              if (topic.trim() != "") {
                setToggleTopic(false);
                setToggleQuiz(true);
              } else {
                alert("Enter the topic.");
              }
            }}
          >
            Generate Questions
          </button>
        </div>
      </div>
    </div>
  ) : tooggleQuiz ? (
    <Quiz />
  ) : (
    tooggleCompleted && <Completed />
  );
}

export default App;
