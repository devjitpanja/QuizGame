import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useGlobal } from "./Context/Global";
export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [generating, setGenerating] = useState(true);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [correctAns, setcorrectAns] = useState("");
  const [selectedOpction, setselectedOpction] = useState(null);
  const [timerProg, setTimerProg] = useState(0);
  const [timerID, setTimerID] = useState(null);
  const [countDownProgTxt, setcountDownProgTxt] = useState(0);
  const [countDownProg, setcountDownProg] = useState(0);
  const questionsRef = useRef([]);
  const correctQuestionRef = useRef([]);
  const activeQuestionIndexRef = useRef(0);

  const {
    topic,
    setToggleTopic,
    setToggleQuiz,
    setToggleCompleted,
    setScore,
    questionTime,
    setQuestionTime,
  } = useGlobal();
  const getQuestions = async () => {
    setGenerating(true);
    let response = await fetch("https://api.doupgrade.com/Quiz/gen.php", {
      method: "POST",
      body: new URLSearchParams({
        topic: topic,
      }),
    });

    try {
      if (response.ok) {
        response = await response.json();

        if (response.questions.length === 0) {
          getQuestions();
          console.log("Reasking for the questions..");
          return;
        }
        setGenerating(false);
        setQuestions(response.questions);
        countDownTimer();
      } else {
        console.log("Response is not ok : ", response);
      }
    } catch (error) {
      console.log("Error :  ", error);
      alert("Choose diffrent topic");
      window.location.reload();
    }
  };

  const completeHandler = () => {
    setScore(`${correctQuestionRef.current}/${questionsRef.current.length}`);
    setToggleTopic(false);
    setToggleQuiz(false);
    setToggleCompleted(true);
  };

  const countDownTimer = () => {
    let timeLeft = questionTime;
    let elapsedTime = 0;
    const timer = setInterval(() => {
      setcountDownProgTxt(timeLeft);
      timeLeft--;
      elapsedTime++;
      setcountDownProg((prev) =>
        prev < 100 ? (elapsedTime / questionTime) * 100 : 100
      );

      if (timeLeft < 0) {
        clearInterval(timer);
        setselectedOpction(correctAns);
        nextQuestion();
      }
    }, 1000);

    setTimerID(timer);
  };

  const nextQuestion = () => {
    setTimeout(() => {
      setselectedOpction(null);
      setcountDownProg(0);
      if (activeQuestionIndexRef.current < questionsRef.current.length - 1) {
        setActiveQuestionIndex((prev) => prev + 1);
        countDownTimer();
      } else {
        completeHandler();
      }
    }, 2000);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    correctQuestionRef.current = correctAnswersCount;
  }, [correctAnswersCount]);
  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);
  useEffect(() => {
    if (questions.length != 0) {
      setcorrectAns(questions[activeQuestionIndex].correct_option);
      activeQuestionIndexRef.current = activeQuestionIndex;
    }
  }, [activeQuestionIndex, questions]);

  return (
    <>
      {!generating ? (
        <div className="bg-[#250b6d] w-screen h-screen">
          <div className="w-full h-[50px] flex justify-center items-center">
            <h1 className="text-white">
              Question {activeQuestionIndex + 1}/{questions.length}
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-[90vw] max-w-[600px] bg-white rounded-2xl p-2 pb-4 overflow-y-auto">
              <div className="w-full h-[250px] bg-[#11013b] rounded-2xl flex justify-center items-center p-2">
                <h3 className="text-center text-white font-mono font-[700] text-[18px]">
                  {questions.length != 0 &&
                    questions[activeQuestionIndex].question}
                </h3>
              </div>
              <div className="flex justify-center items-center h-[50px] gap-2">
                <p>Time</p>
                <div className="w-[90%] h-[14px] border border-blue-900 rounded-full p-[1px]">
                  <div
                    className="h-full bg-blue-900 rounded-full"
                    style={{ width: countDownProg + "%" }}
                  ></div>
                </div>
                <p>{countDownProgTxt}s</p>
              </div>

              <div className="flex flex-col gap-4">
                {questions.length != 0 &&
                  questions[activeQuestionIndex].options.map(
                    (option, index) => (
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
                            clearInterval(timerID);
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
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#250b6d] w-screen h-screen flex flex-col justify-center items-center">
          <div className="w-29 h-29">
            <DotLottieReact
              src="https://lottie.host/3a1813cf-ce9a-4809-a2fb-8f2fc4887bb9/lgJMQfSk7t.lottie"
              loop
              autoplay
            />
          </div>
          <p className="text-white">Generating questions please wait..</p>
        </div>
      )}
    </>
  );
}
