import { useEffect, useState, useSyncExternalStore } from "react";

import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [correctAns, setcorrectAns] = useState("");
  const [selectedOpction, setselectedOpction] = useState(null);
  const [timerProg, setTimerProg] = useState(0);
  const [timerCountdown, setTimerCountdown] = useState(0);
  const [timerId, setTimerId] = useState(null);
  let countDown;
  const getQuestions = async () => {
    let response = await fetch("https://api.doupgrade.com/Quiz/gen.php", {
      method: "POST",
      body: new URLSearchParams({
        topic: "ask me some interview js related questions max 5 questions",
      }),
    });

    try {
      if (response.ok) {
        response = await response.json();
        console.log(response);
        if (response.length === 0) {
          getQuestions();
          console.log("Reasking for the questions..");
          return;
        }
        setQuestions(response.questions);
      } else {
        console.log("Response is not ok : ", response);
      }
    } catch (error) {
      console.log("Error :  ", error);
    }
  };

  const completeHandler = () => {
    console.log("Completed");
  };

  // const countDownTimer = () => {
  //   countDown = 10;
  //   setTimerProg(0);
  //   const timer = setInterval(() => {
  //     if (countDown > 0) {
  //       setTimerProg((prev) => prev + 10);
  //       setTimerCountdown(countDown);
  //     } else {
  //       setselectedOpction(correctAns);

  //       nextQuestion();
  //     }
  //     countDown--;
  //   }, 1000);
  // };

  const nextQuestion = () => {
    setTimeout(() => {
      setselectedOpction(null);
      setActiveQuestionIndex((prev) =>
        prev === questions.length - 1 ? completeHandler() : prev + 1
      );
    }, 2000);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  useEffect(() => {
    if (questions.length != 0)
      setcorrectAns(questions[activeQuestionIndex].correct_option);
  }, [activeQuestionIndex, questions]);

  return (
    <>
      <div className="bg-[#250b6d] w-screen h-screen">
        <div className="w-full h-[50px] flex justify-center items-center">
          <h1 className="text-white">
            Question {activeQuestionIndex + 1}/{questions.length}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[90vw] h-[90vh] bg-white rounded-2xl p-2 ">
            <div className="w-full h-[250px] bg-[#11013b] rounded-2xl flex justify-center items-center p-2">
              <h3 className="text-center text-white font-mono font-[700] text-[18px]">
                {questions.length != 0 &&
                  questions[activeQuestionIndex].question}
              </h3>
            </div>
            <div className="flex justify-center items-center h-[50px] gap-2">
              <p>Time</p>
              <div className="w-[90%] h-[14px] border border-red-800 rounded-full p-[1px]">
                <div
                  className="h-full bg-red-800 rounded-full"
                  style={{ width: timerProg + "%" }}
                ></div>
              </div>
              <p>0:{timerCountdown}</p>
            </div>

            <div className="flex flex-col gap-4">
              {questions.length != 0 &&
                questions[activeQuestionIndex].options.map((option, index) => (
                  <div
                    key={option}
                    className={`w-full h-[60px] border rounded-lg shadow-sm flex items-center px-3 cursor-pointer
                      ${
                        selectedOpction === option
                          ? option === correctAns
                            ? "bg-green-500"
                            : "bg-red-500"
                          : option === correctAns && selectedOpction != null
                          ? "bg-green-500"
                          : ""
                      }
                      `}
                    onClick={() => {
                      if (!selectedOpction) {
                        setselectedOpction(option);
                        if (option === correctAns) {
                          setCorrectAnswersCount((prev) => prev + 1);
                        }
                        nextQuestion();
                      }
                    }}
                  >
                    <p className="mr-auto font-[800]">{index + 1}</p>
                    <h3 className="font-[600]">{option}</h3>
                    <p className="ml-auto"></p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
